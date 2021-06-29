import styled from 'styled-components/macro'
import * as d3 from 'd3'

export default function ChartPage({ observationsDiary }) {
  const formatTime = d3.timeFormat('%Y-%m-%d')
  const parseTime = d3.timeParse('%Y-%m-%d')
  const sortedObbservationsDiary = observationsDiary
    .slice()
    .sort((a, b) => parseTime(a.date).getTime() - parseTime(b.date).getTime())
  console.log(observationsDiary)
  console.log(sortedObbservationsDiary)
  // const xScale = d3.scaleTime().domain([new Date(d3.min(observationsDiary.))])
  // .range([0, 200])
  // .nice()
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
