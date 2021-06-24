import { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import AddLink from './components/AddLink'
import useMedications from './hooks/useMedications'
import FormPage from './pages/FormPage'
import MedicationPage from './pages/MedicationPage'
import createDateString from './services/createDayString'
import navbar from './icons/navbar.svg'
import clip from './icons/clip.svg'

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
        <div></div>
        {/* <Element /> */}
        {/* <img src={navbar} alt="" />
        <Element /> */}

        {/* <Circle></Circle> */}
        {/* <AddLink to="/medications/form"></AddLink> */}
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
  height: 80px;
  /* display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end; */
  background-color: var(--color-basis);
  /* box-shadow: 26px 26px 68px var(--color-shadow-21); */
  position: relative;
`

const Element = styled.div`
  height: 100%;
  width: 100%;
  background-color: var(--color-secondary);
  ::before {
    content: ' ';
    background-color: red;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    -webkit-mask-image: -webkit-linear-gradient(black, black), url(clip);
    -webkit-mask-size: 100% 100%, 22px 18px;
    -webkit-mask-position: top left, -6px 1rem;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-composite: exclude;
    -webkit-mask-composite: xor;
    transition: all 0.2s;
    border-radius: 3px;
  }
`
