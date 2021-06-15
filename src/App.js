import { useEffect, useState } from 'react'
import { loadFromLocal, saveToLocal } from './utils/localStorage'
import FormPage from './pages/FormPage'
import MedicationPage from './pages/MedicationPage'

export default function App() {
  const currentDate = new Date()

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

  const [medicationToEdit, setMedicationToEdit] = useState({})

  return (
    <>
      {activePage === 'medication' && (
        <MedicationPage
          medications={medications}
          today={formatDate(currentDate)}
          setActivePage={setActivePage}
          setMedications={setMedications}
          setMedicationToEdit={setMedicationToEdit}
        />
      )}
      {activePage === 'form' && (
        <FormPage
          today={formatDate(currentDate)}
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
      updateMedication(newMedication, index)
    } else {
      setMedications([newMedication, ...medications])
    }
  }

  function updateMedication(newMedication, index) {
    setMedications([
      ...medications.slice(0, index),
      { ...newMedication },
      ...medications.slice(index + 1),
    ])
  }

  function formatDate(date) {
    const options = { weekday: 'long', month: 'long', day: 'numeric' }
    const formatedDate = date.toLocaleDateString('de-DE', options).toUpperCase()

    return formatedDate
  }
}
