import { useState } from 'react'
import useMedications from './hooks/useMedications'
import FormPage from './pages/FormPage'
import MedicationPage from './pages/MedicationPage'

export default function App() {
  const [activePage, setActivePage] = useState('medication')
  const today = new Date()
  const [selectedDay, setSelectedDay] = useState(today)
  const selectedDayString = `${selectedDay.getFullYear()}-${selectedDay.getMonth()}-${selectedDay.getDate()}`

  const {
    activeMedications,
    medicationToEditId,
    setMedicationToEditId,
    handleSubmit,
    deleteSingleMedication,
  } = useMedications(setActivePage, selectedDayString)

  return (
    <>
      {activePage === 'medication' && (
        <MedicationPage
          medications={activeMedications}
          setActivePage={setActivePage}
          setMedicationToEditId={setMedicationToEditId}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          deleteSingleMedication={deleteSingleMedication}
        />
      )}
      {activePage === 'form' && (
        <FormPage
          medications={activeMedications}
          onNavigate={handleActivePage}
          setActivePage={setActivePage}
          onSubmit={handleSubmit}
          medicationToEditId={medicationToEditId}
          setMedicationToEditId={setMedicationToEditId}
          selectedDay={selectedDay}
        />
      )}
    </>
  )

  function handleActivePage(page) {
    setActivePage(page)
  }
}
