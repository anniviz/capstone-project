import { useEffect, useState } from 'react'
import { loadFromLocal, saveToLocal } from '../utils/localStorage'

export default function useMedications(setActivePage, selectedDayString) {
  const [medicationsDiary, setMedicationsDiary] = useState(
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

  return {
    medicationsDiary,
    setMedicationsDiary,
    dateIndex,
    activeMedications,
    medicationToEdit,
    setMedicationToEdit,
  }
}
