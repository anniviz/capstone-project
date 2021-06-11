import { useEffect, useState } from 'react'
import FormPage from './pages/FormPage'
import MedicationPage from './pages/MedicationPage'
import { loadFromLocal, saveToLocal } from './utils/localStorage'

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

  const [medicationToEdit, ¯] = useState({})

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
          setMedicationToEdit={setMedicationToEdit}
        />
      )}
    </>
  )

  function handleActivePage(page) {
    setActivePage(page)
  }

  function handleSubmit(newMedication) {
    const index = medications.findIndex(
      medication => medication.id === newMedication.id
    )
    if (index > -1) {
      setMedications([
        ...medications.slice(0, index),
        { ...newMedication },
        ...medications.slice(index + 1),
      ])
    } else {
      setMedications([newMedication, ...medications])
    }
  }
}
