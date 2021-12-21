import produce from 'immer'
import { useEffect, useState } from 'react'
import { useImmer } from 'use-immer'
import createDateString from '../utils/createDayString'
import { loadFromLocal, saveToLocal } from '../utils/localStorage'

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
  const selectedMedications = dateIndex > -1 ? findActiveMedications() : []

  const [selectedMedicationId, setSelectedMedicationId] = useState(null)
  const selectedMedicationIndex = selectedMedications.findIndex(
    medication => medication.id === selectedMedicationId
  )
  const selectedMedication = selectedMedications[selectedMedicationIndex] ?? {
    time: '',
    meds: [],
  }

  function findActiveMedications() {
    return medicationsDiary[dateIndex].medications
  }

  function saveMedication(newMedication) {
    const doesDayExist = dateIndex > -1

    if (doesDayExist) {
      updateSelectedDay(newMedication)
    } else {
      addMedicationToNewDay(newMedication)
    }
    setSelectedMedicationId(null)
  }

  function updateSelectedDay(newMedication) {
    const medicationsIndex = selectedMedications.findIndex(
      medication => medication.id === newMedication.id
    )

    const doesMedicationExist = medicationsIndex > -1

    if (doesMedicationExist) {
      updateExistingMedication(medicationsIndex, newMedication)
    } else {
      addMedicationToExistingDay(newMedication)
    }
  }

  function updateExistingMedication(medicationsIndex, newMedication) {
    updateMedicationsDiary(draft => {
      draft[dateIndex].medications[medicationsIndex] = newMedication
    })
  }

  function addMedicationToExistingDay(newMedication) {
    updateMedicationsDiary(draft => {
      draft[dateIndex].medications.push(newMedication)
    })
  }

  function addMedicationToNewDay(newMedication) {
    updateMedicationsDiary(draft => {
      draft.push({ date: selectedDayString, medications: [newMedication] })
    })
  }

  function deleteSingleMedication(id) {
    const dayMedications = medicationsDiary[dateIndex].medications
    const medicationsIndex = dayMedications.findIndex(
      medication => medication.id === id
    )
    updateMedicationsDiary(
      produce(medicationsDiary, draft => {
        if (medicationsIndex !== -1)
          draft[dateIndex].medications.splice(medicationsIndex, 1)
      })
    )
  }

  function saveCopy(targetDate) {
    const targetDateString = createDateString(targetDate)
    const index = medicationsDiary.findIndex(
      day => day.date === targetDateString
    )
    const uncheckedMedications = selectedMedications.map(
      medication => (medication = { ...medication, isChecked: false })
    )

    const doesDayExist = index > -1

    if (doesDayExist) {
      addNewDayWithCopy(index, uncheckedMedications)
    } else {
      replaceExistingDayWithCopy(targetDateString, uncheckedMedications)
    }
  }

  function addNewDayWithCopy(index, uncheckedMedications) {
    updateMedicationsDiary(draft => {
      draft[index].medications = uncheckedMedications
    })
  }

  function replaceExistingDayWithCopy(targetDateString, uncheckedMedications) {
    updateMedicationsDiary(
      produce(medicationsDiary, draft => {
        draft.push({
          date: targetDateString,
          medications: uncheckedMedications,
        })
      })
    )
  }

  function toggleMedicationCheck(id) {
    const medicationsIndex = selectedMedications.findIndex(
      medication => medication.id === id
    )
    updateMedicationsDiary(draft => {
      draft[dateIndex].medications[medicationsIndex].isChecked = !draft[
        dateIndex
      ].medications[medicationsIndex].isChecked
    })
  }

  return {
    selectedMedications,
    selectedMedication,
    setSelectedMedicationId,
    saveMedication,
    deleteSingleMedication,
    saveCopy,
    toggleMedicationCheck,
  }
}
