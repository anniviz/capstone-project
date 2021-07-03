import * as d3 from 'd3'
import 'moment/locale/de'
import { useRef } from 'react'
import styled from 'styled-components/macro'
import LineChart from '../../components/charts/LineChart'
import DayPickerInputRange from '../../components/DayPickerInputRange'
import PropTypes from 'prop-types'
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

  const sortedObservationsDiary = observationsDiary
    .slice()
    .sort((a, b) => parseTime(a.date).getTime() - parseTime(b.date).getTime())

  const selectedObservationValueArray = createObservationValueArray()

  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filteredObservationValueArray,
  } = useTimeSpan(selectedObservationValueArray)

  const canvasRef = useRef(null)

  return (
    <Grid>
      <DayPickerInputRange
        from={startDate}
        setFrom={setStartDate}
        to={endDate}
        setTo={setEndDate}
      />
      <Canvas ref={canvasRef}>
        <LineChart
          filteredObservationValueArray={filteredObservationValueArray}
          selectedObservationValueArray={selectedObservationValueArray}
          startDate={startDate}
          endDate={endDate}
          canvasRef={canvasRef}
        />
      </Canvas>
    </Grid>
  )

  function createObservationValueArray() {
    return sortedObservationsDiary.map(day => ({
      date: parseTime(day.date),
      observationValue: +parseObservationValue(day.observations),
    }))
  }

  function parseObservationValue(observationValueArray) {
    const observationValueRaw = observationValueArray.find(
      observation => observation.type === observationType
    )
    if (observationType === 'bloodpressure') {
      return observationValueRaw?.observationValue.replace('/', '.')
    } else {
      return observationValueRaw?.observationValue.replace(',', '.')
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
