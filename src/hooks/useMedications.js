import { useEffect, useState } from 'react'
import { useImmer } from 'use-immer'
import produce from 'immer'
import { loadFromLocal, saveToLocal } from '../utils/localStorage'
import createDateString from '../services/createDayString'

export default function useMedications(selectedDayString) {
  const [medicationsDiary, updateMedicationsDiary] = useImmer(
    loadFromLocal('medicationsDiary') ?? []
  )

  useEffect(() => {
    saveToLocal('medicationsDiary', medicationsDiary)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicationsDiary])

  const dateIndex = medicationsDiary.findIndex(
    day => day.date === selectedDayString
  )
  const activeMedications = dateIndex > -1 ? findActiveMedications() : []

  const [medicationToEditId, setMedicationToEditId] = useState(null)
  const [copyToDay, setCopyToDay] = useState(new Date())

  function findActiveMedications() {
    return medicationsDiary[dateIndex].medications
  }

  function handleSubmit(newMedication) {
    if (dateIndex > -1) {
      updateSelectedDay(newMedication)
    } else {
      const addedMedicationsDiary = produce(medicationsDiary, draft => {
        draft.push({ date: selectedDayString, medications: [newMedication] })
      })
      updateMedicationsDiary(addedMedicationsDiary)
    }
  }

  function updateSelectedDay(newMedication) {
    const medicationsIndex = activeMedications.findIndex(
      medication => medication.id === newMedication.id
    )

    if (medicationsIndex > -1) {
      updateMedicationsDiary(draft => {
        draft[dateIndex].medications[medicationsIndex] = newMedication
      })
    } else {
      const addedMedicationsDiary = produce(medicationsDiary, draft => {
        draft[dateIndex].medications.push(newMedication)
      })
      updateMedicationsDiary(addedMedicationsDiary)
    }
  }

  function deleteSingleMedication(id) {
    const dayMedications = medicationsDiary[dateIndex].medications
    const medicationsIndex = dayMedications.findIndex(
      medication => medication.id === id
    )

    const deletedMedicationsDiary = produce(medicationsDiary, draft => {
      if (medicationsIndex !== -1)
        draft[dateIndex].medications.splice(medicationsIndex, 1)
    })
    updateMedicationsDiary(deletedMedicationsDiary)
  }

  function saveCopy() {
    const copyToDayString = createDateString(copyToDay)
    const index = medicationsDiary.findIndex(
      day => day.date === copyToDayString
    )
    const uncheckedMedications = activeMedications.map(
      medication => (medication = { ...medication, isChecked: false })
    )

    if (index > -1) {
      updateMedicationsDiary(draft => {
        draft[index].medications = uncheckedMedications
      })
    } else {
      const addedMedicationsDiary = produce(medicationsDiary, draft => {
        draft.push({ date: copyToDayString, medications: uncheckedMedications })
      })
      updateMedicationsDiary(addedMedicationsDiary)
    }
  }

  function toggleMedicationCheck(id) {
    const medicationsIndex = activeMedications.findIndex(
      medication => medication.id === id
    )
    updateMedicationsDiary(draft => {
      draft[dateIndex].medications[medicationsIndex].isChecked = !draft[
        dateIndex
      ].medications[medicationsIndex].isChecked
    })
  }

  return {
    activeMedications,
    medicationToEditId,
    setMedicationToEditId,
    handleSubmit,
    deleteSingleMedication,
    copyToDay,
    setCopyToDay,
    saveCopy,
    toggleMedicationCheck,
  }
}
