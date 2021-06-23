import { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import useMedications from './hooks/useMedications'
import FormPage from './pages/FormPage'
import MedicationPage from './pages/MedicationPage'
import createDateString from './services/createDayString'

export default function App() {
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
    toggleMedicationCheck,
  } = useMedications(selectedDayString)

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/medications" />
      </Route>
      <Route exact path="/medications">
        <MedicationPage
          medications={activeMedications}
          setMedicationToEditId={setMedicationToEditId}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          deleteSingleMedication={deleteSingleMedication}
          copyToDay={copyToDay}
          setCopyToDay={setCopyToDay}
          saveCopy={saveCopy}
          toggleMedicationCheck={toggleMedicationCheck}
        />
      </Route>
      <Route path="/medications/form">
        <FormPage
          medications={activeMedications}
          onSubmit={handleSubmit}
          medicationToEditId={medicationToEditId}
          setMedicationToEditId={setMedicationToEditId}
          selectedDay={selectedDay}
        />
      </Route>
    </Switch>
  )
}
