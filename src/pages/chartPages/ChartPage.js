import styled from 'styled-components/macro'

export default function ChartPage() {
  return <Grid></Grid>
}

const Grid = styled.main`
  display: grid;
  grid-template-rows: ${props =>
    props.showCalendar ? 'auto auto 1fr' : 'auto 1fr'};
  overflow: auto;
`
