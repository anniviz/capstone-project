import { useEffect, useState } from 'react'
import { loadFromLocal, saveToLocal } from './utils/localStorage'
import FormPage from './pages/FormPage'
import MedicationPage from './pages/MedicationPage'

export default function App() {
  const [activePage, setActivePage] = useState('medication')
  const [medications, setMedications] = useState(
    loadFromLocal('medications') ?? []
  )
  useEffect(() => {
    saveToLocal('medications', medications)
  }, [medications])

  useEffect(() => {
    medications.length === 0 && setActivePage('form')
  }, [medications])

  const [medicationToEdit, setMedicationToEdit] = useState([])

  return (
    <>
      {activePage === 'medication' && (
        <MedicationPage
          medications={medications}
          setActivePage={setActivePage}
          setMedications={setMedications}
          setMedicationToEdit={setMedicationToEdit}
        />
      )}
      {activePage === 'form' && (
        <FormPage
          onNavigate={handleActivePage}
          setActivePage={setActivePage}
          onSubmit={handleSubmit}
          medicationToEdit={medicationToEdit}
          etMedicationToEdit={setMedicationToEdit}
        />
      )}
    </>
  )

  function handleActivePage(page) {
    setActivePage(page)
  }

  function handleSubmit(newMedication) {
    setMedications([newMedication, ...medications])
  }
}
