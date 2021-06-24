import { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import Header from './components/Header'
import Navbar from './components/Navbar'
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
    setSelectedMedicationId,
    saveMedication,
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
            selectedDay={selectedDay}
            onEdit={setSelectedMedicationId}
            onDelete={deleteSingleMedication}
            onSelectedDay={setSelectedDay}
            onCopyDay={saveCopy}
            onToggle={toggleMedicationCheck}
          />
          <Navbar />
        </Route>
        <Route path="/medications/form">
          <FormPage
            medication={selectedMedication}
            onSubmit={saveMedication}
            setSelectedMedicationId={setSelectedMedicationId}
          />
        </Route>
      </Switch>
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`
