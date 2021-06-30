import styled from 'styled-components/macro'
import * as d3 from 'd3'

export default function ChartPage({ observationsDiary, observationType }) {
  const formatTime = d3.timeFormat('%Y-%m-%d')
  const parseTime = d3.timeParse('%Y-%m-%d')

  const observationsDiaryWithAvailableType = observationsDiary.filter(date =>
    date.observations.find(observation => observation.type === observationType)
  )

  const sortedObservationsDiaryWithAvailableType = observationsDiary
    .slice()
    .sort((a, b) => parseTime(a.date).getTime() - parseTime(b.date).getTime())

  const ObservationValueArray = sortedObservationsDiaryWithAvailableType.map(
    day => ({
      date: parseTime(day.date),
      observationValue: +day.observations
        .find(observation => observation.type === observationType)
        ?.observationValue.replace(',', '.'),
    })
  )
  console.log(ObservationValueArray)
  console.log(sortedObservationsDiaryWithAvailableType)
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(ObservationValueArray, d => d.date))
    .range([0, 300])
    .nice()

  // const yScale = d3
  //   .scaleLinear()
  //   .domain(d3.extent(ObservationValueArray, d => d.observationValue))
  //   .range([350, 0])
  //   .nice()

  const yScale = d3.scaleLinear().domain([35.5, 40.0]).range([350, 0]).nice()

  const line = d3
    .line()
    .defined(d => !isNaN(d.observationValue))
    .x(d => xScale(d.date))
    .y(d => yScale(d.observationValue))
  // .curve(d3.curveNatural)
  console.log(ObservationValueArray)
  return (
    <Grid>
      <Canvas>
        {/* <g>
          <path fill="none" stroke="black" d={line(ObservationValueArray)} />
        </g> */}
        {ObservationValueArray.map(day => (
          <circle
            cx={xScale(day.date)}
            cy={yScale(day.observationValue)}
            r="3"
          />
        ))}
        {/* <circle cx="150" cy="77" r="40" /> */}
      </Canvas>
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
