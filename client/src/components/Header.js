import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import getObservationTypes from '../utils/getObservationTypes'
import getLastSegmentOfUrl from '../utils/getLastSegmentOfUrl'

Header.propTypes = {
  selectedDay: PropTypes.instanceOf(Date),
}

export default function Header({ selectedDay }) {
  const observationTypes = getObservationTypes()
  const location = useLocation()
  let headerText = formatDate(selectedDay)
  if (location.pathname.includes('charts')) {
    headerText =
      getLastSegmentOfUrl(location) === 'charts'
        ? 'Diagramme'
        : observationTypes.find(
            element => element.type === getLastSegmentOfUrl(location)
          ).name
  }

  if (location.pathname.includes('contacts')) {
    headerText = 'Kontakte'
  }
  return <HeaderStyled>{headerText}</HeaderStyled>

  function formatDate(date) {
    const options = { weekday: 'long', month: 'long', day: 'numeric' }
    const formatedDate = date.toLocaleDateString('de-DE', options).toUpperCase()

    return formatedDate
  }
}

const HeaderStyled = styled.h2`
  display: grid;
  min-height: 80px;
  margin: 0;
  padding: 8px;
  border-radius: 0 0 0 32px;
  color: var(--color-primary);
  font-weight: bold;
  font-size: 1.2em;
  background-color: var(--color-secondary);
  place-items: center;
`
