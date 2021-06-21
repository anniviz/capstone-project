import { useState } from 'react'
import useMedications from './hooks/useMedications'
import FormPage from './pages/FormPage'
import MedicationPage from './pages/MedicationPage'
import createDateString from './services/createDayString'

export default function App() {
  const [activePage, setActivePage] = useState('medication')
  const today = new Date()
  const [selectedDay, setSelectedDay] = useState(today)
  const selectedDayString = createDateString(selectedDay)

  const {
    activeMedications,
    medicationToEditId,
    setMedicationToEditId,
    handleSubmit,
    deleteSingleMedication,
    copyToDay,
    setCopyToDay,
    saveCopy,
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
          copyToDay={copyToDay}
          setCopyToDay={setCopyToDay}
          saveCopy={saveCopy}
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
