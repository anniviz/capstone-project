import { useEffect, useState } from 'react'
import { useImmer } from 'use-immer'
import produce from 'immer'
import { loadFromLocal, saveToLocal } from '../utils/localStorage'

export default function useMedications(setActivePage, selectedDayString) {
  const [medicationsDiary, updateMedicationsDiary] = useImmer(
    loadFromLocal('medicationsDiary') ?? []
  )

  useEffect(() => {
    saveToLocal('medicationsDiary', medicationsDiary)
    medicationsDiary.length === 0 && setActivePage('form')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicationsDiary])

  const dateIndex = medicationsDiary.findIndex(
    day => day.date === selectedDayString
  )
  const activeMedications = dateIndex > -1 ? findActiveMedications() : []

  const [medicationToEdit, setMedicationToEdit] = useState({})

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
    const dayMedications = medicationsDiary[dateIndex].medications

    const medicationsIndex = dayMedications.findIndex(
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

  return {
    activeMedications,
    medicationToEdit,
    setMedicationToEdit,
    handleSubmit,
    deleteSingleMedication,
  }
}
