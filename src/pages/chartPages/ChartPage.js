import styled from 'styled-components/macro'
import * as d3 from 'd3'

export default function ChartPage({ observationsDiary, observationType }) {
  const observationsDiaryWithAvailableType = observationsDiary.filter(date =>
    date.observations.find(observation => observation.type === observationType)
  )

  const formatTime = d3.timeFormat('%Y-%m-%d')
  const parseTime = d3.timeParse('%Y-%m-%d')

  const sortedObservationsDiaryWithAvailableType = observationsDiaryWithAvailableType
    .slice()
    .sort((a, b) => parseTime(a.date).getTime() - parseTime(b.date).getTime())
  console.log(observationsDiaryWithAvailableType)
  console.log(sortedObservationsDiaryWithAvailableType)
  const xScale = d3
    .scaleTime()
    .domain([
      sortedObservationsDiaryWithAvailableType[0].date,
      sortedObservationsDiaryWithAvailableType[
        sortedObservationsDiaryWithAvailableType.length - 1
      ].date,
    ])
    .range([0, 200])
    .nice()

  const ObservationValueArray = sortedObservationsDiaryWithAvailableType.map(
    day => ({
      date: day.date,
      observationValue: day.observations.find(
        observation => observation.type === observationType
      ).observationValue,
    })
  )
  console.log(ObservationValueArray)
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(ObservationValueArray, day => day.observationValue))
    .range([350, 0])
    .nice()
  return (
    <Grid>
      <Canvas></Canvas>
    </Grid>
  )
}

const Grid = styled.main`
  display: grid;
  grid-template-rows: ${props =>
    props.showCalendar ? 'auto auto 1fr' : 'auto 1fr'};
  overflow: auto;
`

const Canvas = styled.svg`
  width: 100%;
  height: 400px;
`
