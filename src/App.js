import { useState } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import Header from './components/Header'
import Navbar from './components/Navbar'
import useMedications from './hooks/useMedications'
import useObservations from './hooks/useObservations'
import ChartPage from './pages/chartPages/ChartPage'
import FormPage from './pages/medicationPages/FormPage'
import MedicationPage from './pages/medicationPages/MedicationPage'
import ObservationFormPageDefault from './pages/observationPages/ObservationFormPageDefault'
import ObservationFormPageNote from './pages/observationPages/ObservationFormPageNote'
import ObservationFormPageUrin from './pages/observationPages/ObservationFormPageUrin'
import ObservationPage from './pages/observationPages/ObservationPage'
import ObservationPickerPage from './pages/observationPages/ObservationPickerPage'
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
    observationsDiary,
    observationTypes,
    selectedObservations,
    selectedObservation,
    setSelectedObservationId,
    saveObservation,
    deleteSingleObservation,
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
            selectedDay={selectedDay}
            onSelectedDay={setSelectedDay}
            onEdit={setSelectedObservationId}
            onDelete={deleteSingleObservation}
          />
        </Route>
        <Route exact path={'/observations/form'}>
          <ObservationPickerPage
            observationTypes={observationTypes}
            leadingPath={'/observations/form'}
          />
        </Route>
        <Route
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
            observation={selectedObservation}
            observationType={getLastSegmentOfUrl()}
            onSubmit={saveObservation}
            observationTypes={observationTypes}
            setSelectedObservationId={setSelectedObservationId}
          />
        </Route>
        <Route path={'/observations/form/notes'}>
          <ObservationFormPageNote
            observation={selectedObservation}
            onSubmit={saveObservation}
          />
        </Route>
        <Route path={'/observations/form/urine'}>
          <ObservationFormPageUrin
            observation={selectedObservation}
            onSubmit={saveObservation}
          />
        </Route>
        <Route exact path={'/charts'}>
          <ObservationPickerPage
            observationTypes={observationTypes.slice(
              0,
              observationTypes.length - 1
            )}
            leadingPath={'/charts'}
          />
        </Route>
        <Route
          exact
          path={[
            '/charts/size',
            '/charts/weight',
            '/charts/temperature',
            '/charts/bloodpressure',
            '/charts/fev1',
            '/charts/bloodsugar',
            '/charts/urine',
          ]}
        >
          <ChartPage
            observationsDiary={observationsDiary}
            observationType={getLastSegmentOfUrl()}
          />
        </Route>
      </Switch>
      {location.pathname.includes('form') || (
        <Navbar isAddActive={!location.pathname.includes('charts')} />
      )}
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
