import { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import Header from './components/Header'
import useMedications from './hooks/useMedications'
import FormPage from './pages/FormPage'
import MedicationPage from './pages/MedicationPage'
import createDateString from './services/createDayString'

export default function App() {
  const today = new Date()
  const [selectedDay, setSelectedDay] = useState(today)
  const selectedDayString = createDateString(selectedDay)

  const {
    selectedMedications,
    selectedMedication,
    setMedicationToEditId,
    handleSubmit,
    deleteSingleMedication,
    saveCopy,
    toggleMedicationCheck,
  } = useMedications(selectedDayString)

  return (
    <Grid>
      <Header selectedDay={selectedDay} />
      <Switch>
        <Route exact path="/">
          <Redirect to="/medications" />
        </Route>
        <Route exact path="/medications">
          <MedicationPage
            medications={selectedMedications}
            setMedicationToEditId={setMedicationToEditId}
            setSelectedDay={setSelectedDay}
            deleteSingleMedication={deleteSingleMedication}
            saveCopy={saveCopy}
            toggleMedicationCheck={toggleMedicationCheck}
          />
        </Route>
        <Route path="/medications/form">
          <FormPage
            medication={selectedMedication}
            onSubmit={handleSubmit}
            setMedicationToEditId={setMedicationToEditId}
          />
        </Route>
      </Switch>
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
`
