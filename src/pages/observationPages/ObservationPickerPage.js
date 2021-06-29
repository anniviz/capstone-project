import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import TextButton from '../../components/buttons/TextButton'
import OutlineLink from '../../components/links/OutlineLink'

ObservationPickerPage.propTypes = {
  observationTypes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      unit: PropTypes.string,
    }).isRequired
  ),
  leadingPath: PropTypes.string.isRequired,
}

export default function ObservationPickerPage({
  observationTypes,
  leadingPath,
}) {
  const history = useHistory()

  return (
    <Grid>
      <TextButton onClick={() => history.goBack()}>zurück</TextButton>
      <Heading>Bitte auswählen</Heading>
      <ButtonGrid>
        {observationTypes.map(observationType => (
          <OutlineLink
            key={observationType.type}
            to={`${leadingPath}/${observationType.type}`}
          >
            {observationType.name}
          </OutlineLink>
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

const Heading = styled.h3`
  color: var(--color-primary);
  justify-self: center;
`
