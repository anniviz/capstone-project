import { useState } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import Header from './components/Header'
import Navbar from './components/Navbar'
import useMedications from './hooks/useMedications'
import useObservations from './hooks/useObservations'
import FormPage from './pages/FormPage'
import MedicationPage from './pages/MedicationPage'
import ObservationFormPageDefault from './pages/ObservationFormPageDefault'
import ObservationFormPageNote from './pages/ObservationFormPageNote'
import ObservationFormPickerPage from './pages/ObservationFormPickerPage'
import ObservationPage from './pages/ObservationPage'
import createDateString from './services/createDayString'

export default function App() {
  const location = useLocation()
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

  const {
    observationTypes,
    selectedObservations,
    saveObservation,
  } = useObservations(selectedDayString)

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
        </Route>
        <Route path="/medications/form">
          <FormPage
            medication={selectedMedication}
            onSubmit={saveMedication}
            setSelectedMedicationId={setSelectedMedicationId}
          />
        </Route>
        <Route exact path={'/observations'}>
          <ObservationPage
            observations={selectedObservations}
            observationTypes={observationTypes}
          />
        </Route>
        <Route exact path={'/observations/form'}>
          <ObservationFormPickerPage observationTypes={observationTypes} />
        </Route>
        <Route
          exact
          path={[
            '/observations/form/size',
            '/observations/form/weight',
            '/observations/form/temperature',
            '/observations/form/bloodpressure',
            '/observations/form/fev1',
            '/observations/form/bloodsugar',
          ]}
        >
          <ObservationFormPageDefault
            observationType={getLastSegmentOfUrl()}
            onSubmit={saveObservation}
            observationTypes={observationTypes}
          />
        </Route>
        <Route exact path={'/observations/form/notes'}>
          <ObservationFormPageNote onSubmit={saveObservation} />
        </Route>
      </Switch>
      {location.pathname.includes('form') || <Navbar />}
    </Grid>
  )

  function getLastSegmentOfUrl() {
    return location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
  }
}

const Grid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`
