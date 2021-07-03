import * as d3 from 'd3'
import 'moment/locale/de'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import styled from 'styled-components/macro'
import LineChart from '../../components/charts/LineChart'
import DayPickerInputRange from '../../components/DayPickerInputRange'

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

  const [startDate, setStartDate] = useState(
    d3.min(selectedObservationValueArray, d => d.date)
  )
  const [endDate, setEndDate] = useState(
    d3.max(selectedObservationValueArray, d => d.date)
  )

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
