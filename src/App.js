import { useState } from 'react'
import FormPage from './pages/FormPage'
import MedicationPage from './pages/MedicationPage'

export default function App() {
  const [medications, setMedications] = useState([])
  const [activePage, setActivePage] = useState('medication')

  return (
    <>
      {activePage === 'medication' && (
        <MedicationPage
          medications={medications}
          setActivePage={setActivePage}
        />
      )}
      {activePage === 'form' && (
        <FormPage
          onClick={handleActivePage}
          setActivePage={setActivePage}
          onSubmit={handleSubmit}
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
