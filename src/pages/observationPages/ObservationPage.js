import PropTypes from 'prop-types'
import 'react-day-picker/lib/style.css'
import styled from 'styled-components/macro'
import ObservationGroup from '../../components/ObservationGroup'
import sortByTime from '../../utils/sortByTime'

ObservationPage.propTypes = {
  observationTypes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      unit: PropTypes.string,
    }).isRequired
  ),
  observations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      time: PropTypes.string,
      type: PropTypes.string,
      observationValue: PropTypes.string,
    })
  ),
}

export default function ObservationPage({ observations, observationTypes }) {
  const sortedObservations = sortByTime(observations)

  return (
    <Flexbox>
      {sortedObservations.map(({ id, time, name, observationValue }) => (
        <ObservationGroup
          key={id}
          observationTypes={observationTypes}
          time={time}
          name={name}
          value={observationValue}
        />
      ))}
    </Flexbox>
  )
}

const Flexbox = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  overflow-y: auto;
  gap: 20px;
`
