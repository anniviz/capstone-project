import * as d3 from 'd3'
import 'moment/locale/de'
import PropTypes from 'prop-types'
import { useRef } from 'react'
import styled from 'styled-components/macro'
import LineChart from '../../components/charts/LineChart'
import DayPickerInputRange from '../../components/DayPickerInputRange'
import useTimeSpan from '../../hooks/useTimeSpan'

ChartPage.propTypes = {
  observationsDiary: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      time: PropTypes.string,
      type: PropTypes.string,
      observationValue: PropTypes.string,
    })
  ),
  observationTypes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      unit: PropTypes.string,
    }).isRequired
  ),
}

export default function ChartPage({ observationsDiary, observationType }) {
  const parseTime = d3.timeParse('%Y-%m-%d')

  const selectedObservationValueArray = createObservationValueArray()
  const observationsWithoutUndefined = selectedObservationValueArray.filter(
    observation =>
      observationType === 'bloodpressure'
        ? observation.observationValue[0]
        : observation.observationValue
  )

  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filteredObservationValueArray,
  } = useTimeSpan(selectedObservationValueArray, observationsWithoutUndefined)

  const canvasRef = useRef(null)
  return observationsWithoutUndefined.length > 0 ? (
    <Grid>
      <DayPickerInputRange
        from={startDate}
        setFrom={setStartDate}
        to={endDate}
        setTo={setEndDate}
      />
      <Canvas ref={canvasRef}>
        <LineChart
          observationValues={filteredObservationValueArray}
          observationType={observationType}
          startDate={startDate}
          endDate={endDate}
          canvasRef={canvasRef}
        />
      </Canvas>
    </Grid>
  ) : (
    <NoObservations>Hier gibt es noch keine Aufzeichnungen</NoObservations>
  )

  function createObservationValueArray() {
    const sortedObservationsDiary = observationsDiary
      .slice()
      .sort((a, b) => parseTime(a.date).getTime() - parseTime(b.date).getTime())

    const observationValueArray = sortedObservationsDiary.map(day => ({
      date: parseTime(day.date),
      observationValue: parseObservationValue(day.observations),
    }))

    return observationValueArray
  }

  function parseObservationValue(observationValueArray) {
    const observationValueRaw = observationValueArray.find(
      observation => observation.type === observationType
    )
    if (observationType === 'bloodpressure') {
      return (
        observationValueRaw?.observationValue
          .split('/')
          .map(value => +value) || [NaN, NaN]
      )
    } else {
      return +observationValueRaw?.observationValue.replace(',', '.')
    }
  }
}

const Grid = styled.main`
  display: grid;
  margin-top: 40px;
  overflow: auto;
  grid-template-rows: auto 1fr;
  gap: 40px;
`

const Canvas = styled.svg`
  width: 100%;
  height: 60%;
  margin: 0 auto;
`

const NoObservations = styled.main`
  margin: 40px 20px;
`
