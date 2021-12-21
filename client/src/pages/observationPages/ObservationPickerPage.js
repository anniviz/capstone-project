import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import OutlineLink from '../../components/links/OutlineLink'
import getObservationTypes from '../../utils/getObservationTypes'

ObservationPickerPage.propTypes = {
  leadingPath: PropTypes.string.isRequired,
}

export default function ObservationPickerPage({ leadingPath }) {
  const observationTypes = leadingPath.includes('charts')
    ? getObservationTypes().slice(0, getObservationTypes().length - 1)
    : getObservationTypes()

  const headingText = leadingPath.includes('charts')
    ? 'zeige den Verlauf von'
    : 'erstelle neu'

  return (
    <Grid>
      <Heading>{headingText}</Heading>
      <ButtonWrapper>
        {observationTypes.map(observationType => (
          <OutlineLink
            key={observationType.type}
            to={`${leadingPath}/${observationType.type}`}
          >
            {observationType.name}
          </OutlineLink>
        ))}
      </ButtonWrapper>
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
  justify-content: space-around;
  gap: 20px;
`

const Heading = styled.h3`
  color: var(--color-primary);
  justify-self: center;
`
