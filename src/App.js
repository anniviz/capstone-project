import { useEffect, useState } from 'react'
import { loadFromLocal, saveToLocal } from './utils/localStorage'
import FormPage from './pages/FormPage'
import MedicationPage from './pages/MedicationPage'

export default function App() {
  const [activePage, setActivePage] = useState('medication')
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [medications, setMedications] = useState(
    loadFromLocal('medications') ?? []
  )
  useEffect(() => {
    saveToLocal('medications', medications)
    medications.length === 0 && setActivePage('form')
  }, [medications])

  const [medicationsDiary, setMedicationsDiary] = useState(
    loadFromLocal('medicationsDiary') ?? []
  )
  const activeMedications =
    medicationsDiary.length === 0 ? [] : findActiveMedications()
  console.log(medicationsDiary)
  console.log(medicationsDiary.length === 0 ? {} : medicationsDiary[0])
  console.log(
    medicationsDiary.length === 0 ? [] : medicationsDiary[0].medications
  )
  console.log(activeMedications)

  const [medicationToEdit, setMedicationToEdit] = useState({})

  return (
    <>
      {activePage === 'medication' && (
        <MedicationPage
          medications={medications}
          setActivePage={setActivePage}
          setMedications={setMedications}
          setMedicationToEdit={setMedicationToEdit}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
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
    const selectedDayString = `${selectedDay.getFullYear()}-${selectedDay.getMonth()}-${selectedDay.getDate()}`
    const dateIndex = medicationsDiary.findIndex(
      day => day.date === selectedDayString
    )
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

  function findActiveMedications() {
    const selectedDayString = `${selectedDay.getFullYear()}-${selectedDay.getMonth()}-${selectedDay.getDate()}`
    const dateIndex = medicationsDiary.findIndex(
      day => day.date === selectedDayString
    )
    return medicationsDiary[dateIndex].medications
  }
}
