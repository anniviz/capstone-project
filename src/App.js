import { useEffect, useState } from 'react'
import { loadFromLocal, saveToLocal } from './utils/localStorage'
import FormPage from './pages/FormPage'
import MedicationPage from './pages/MedicationPage'

export default function App() {
  const [activePage, setActivePage] = useState('medication')
  const [selectedDay, setSelectedDay] = useState(new Date())
  const selectedDayString = `${selectedDay.getFullYear()}-${selectedDay.getMonth()}-${selectedDay.getDate()}`

  const [medicationsDiary, setMedicationsDiary] = useState(
    loadFromLocal('medicationsDiary') ?? []
  )
  useEffect(() => {
    saveToLocal('medicationsDiary', medicationsDiary)
    medicationsDiary.length === 0 && setActivePage('form')
  }, [medicationsDiary])

  const dateIndex = medicationsDiary.findIndex(
    day => day.date === selectedDayString
  )
  const activeMedications = dateIndex > -1 ? findActiveMedications() : []

  const [medicationToEdit, setMedicationToEdit] = useState({})

  return (
    <>
      {activePage === 'medication' && (
        <MedicationPage
          medications={activeMedications}
          setActivePage={setActivePage}
          setMedicationToEdit={setMedicationToEdit}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          deleteSingleMedication={deleteSingleMedication}
        />
      )}
      {activePage === 'form' && (
        <FormPage
          onNavigate={handleActivePage}
          setActivePage={setActivePage}
          onSubmit={handleSubmit}
          medicationToEdit={medicationToEdit}
          setMedicationToEdit={setMedicationToEdit}
          selectedDay={selectedDay}
        />
      )}
    </>
  )

  function handleActivePage(page) {
    setActivePage(page)
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

  function findActiveMedications() {
    return medicationsDiary[dateIndex].medications
  }
}
