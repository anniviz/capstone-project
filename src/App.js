import { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import AddLink from './components/AddLink'
import useMedications from './hooks/useMedications'
import FormPage from './pages/FormPage'
import MedicationPage from './pages/MedicationPage'
import createDateString from './services/createDayString'
import navbar from './icons/navbar.svg'

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
        <Element />
        <img src={navbar} alt="" />
        <Element />

        {/* <Circle></Circle> */}
        <AddLink to="/medications/form"></AddLink>
      </Navbar>
    </Grid>
  )
}

const Grid = styled.div`
  height: 100vh;
  /* position: relative; */
  display: grid;
  grid-template-rows: 1fr auto;
`

const Circle = styled.div`
  position: absolute;
  background-color: var(--color-basis);
  height: 76px;
  width: 76px;
  border-radius: 50%;
  right: 0;
  bottom: 40px;
  left: 0;
  margin-right: auto;
  margin-left: auto;
`

const Navbar = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  background-color: var(--color-basis);
  /* box-shadow: 26px 26px 68px var(--color-shadow-21); */
  position: relative;
`

const Element = styled.div`
  height: 85px;
  background-color: var(--color-basis);
  box-shadow: var(--shadow-navbar);
`
