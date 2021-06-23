import { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import useMedications from './hooks/useMedications'
import FormPage from './pages/FormPage'
import MedicationPage from './pages/MedicationPage'
import createDateString from './services/createDayString'
import navbar from './icons/navigation.svg'
import AddLink from './components/AddLink'

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
    <Grid>
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
      <Navbar>
        <Circle></Circle>
        <AddLink></AddLink>
      </Navbar>
    </Grid>
  )
}

const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 1fr auto;
`

const Circle = styled.div`
  background-color: var(--color-basis);
`

const Navbar = styled.div`
  height: 80px;
  background-color: goldenrod;
`
