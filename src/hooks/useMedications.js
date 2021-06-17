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

  function handleSubmit(newMedication) {
    if (dateIndex > -1) {
      updateSelectedDay(newMedication, dateIndex)
    } else {
      setMedicationsDiary([
        {
          date: selectedDayString,
          medications: [newMedication],
        },
        ...medicationsDiary,
      ])
    }
  }

  function updateSelectedDay(newMedication, dateIndex) {
    const dayMedications = medicationsDiary[dateIndex].medications

    const medicationsIndex = dayMedications.findIndex(
      medication => medication.id === newMedication.id
    )
    if (medicationsIndex > -1) {
      setMedicationsDiary([
        ...medicationsDiary.slice(0, dateIndex),
        {
          ...medicationsDiary[dateIndex],
          medications: updateMedication(
            newMedication,
            dayMedications,
            medicationsIndex
          ),
        },
        ...medicationsDiary.slice(dateIndex + 1),
      ])
    } else {
      setMedicationsDiary([
        ...medicationsDiary.slice(0, dateIndex),
        {
          ...medicationsDiary[dateIndex],
          medications: [...dayMedications, newMedication],
        },
        ...medicationsDiary.slice(dateIndex + 1),
      ])
    }
  }

  function updateMedication(newMedication, medications, index) {
    return [
      ...medications.slice(0, index),
      { ...newMedication },
      ...medications.slice(index + 1),
    ]
  }

  function deleteSingleMedication(id) {
    const dayMedications = medicationsDiary[dateIndex].medications
    const medicationsIndex = dayMedications.findIndex(
      medication => medication.id === id
    )

    setMedicationsDiary([
      ...medicationsDiary.slice(0, dateIndex),
      {
        ...medicationsDiary[dateIndex],
        medications: [
          ...dayMedications.slice(0, medicationsIndex),
          ...dayMedications.slice(medicationsIndex + 1),
        ],
      },
      ...medicationsDiary.slice(dateIndex + 1),
    ])
  }

  return {
    activeMedications,
    medicationToEdit,
    setMedicationToEdit,
    handleSubmit,
    deleteSingleMedication,
  }
}
