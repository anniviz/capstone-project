import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import OutlineLink from '../components/links/OutlineLink'

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
      <LinkStyled to="/observations">zurück</LinkStyled>
      <Heading>Bitte auswählen</Heading>
      <ButtonGrid>
        {observationTypes.map(observationType => (
          <OutlineLink key={observationType}>{observationType}</OutlineLink>
        ))}
      </ButtonGrid>
    </Grid>
  )
}

const Grid = styled.main`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
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
const LinkStyled = styled(Link)`
  color: var(--color-tertiary);
  margin: 12px 24px;
`

const Heading = styled.h3`
  color: var(--color-primary);
  justify-self: center;
`
