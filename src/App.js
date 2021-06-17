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
    medicationToEdit,
    setMedicationToEdit,
    handleSubmit,
    deleteSingleMedication,
  } = useMedications(setActivePage, selectedDayString)

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
}
