import styled from 'styled-components/macro'
import * as d3 from 'd3'

export default function ChartPage(observationsDiary) {
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
