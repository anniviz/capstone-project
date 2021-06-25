import styled from 'styled-components/macro'
import OutlineButton from '../components/buttons/OutlineButton'

export default function ObservationFormPickerPage() {
  const observationTypes = [
    'Größe',
    'Gewicht',
    'Temperatur',
    'Blutdruck',
    'Blutzucker',
    'Urin',
    'FEV1',
    'Notizen',
  ]
  return (
    <Grid>
      <Heading>Bitte auswählen</Heading>
      <ButtonGrid>
        {observationTypes.map(observationType => (
          <OutlineButton key={observationType}>{observationType}</OutlineButton>
        ))}
      </ButtonGrid>
    </Grid>
  )
}

const Grid = styled.main`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: end;
  gap: 40px;
`

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, auto);
  row-gap: 20px;
  justify-items: center;
  margin-bottom: 40px;
`

const Heading = styled.h3`
  color: var(--color-primary);
  justify-self: center;
`
