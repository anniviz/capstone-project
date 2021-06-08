import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

MedicationGroup.propTypes = {
  time: PropTypes.node,
  meds: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.node, medName: PropTypes.string })
  ),
}

export default function MedicationGroup({ time, meds }) {
  return (
    <Wrapper>
      <Time role="time" dateTime={time}>
        {time} UHR
      </Time>
      <Meds>
        {meds.map(({ id, medName }) => (
          <li key={id}>{medName}</li>
        ))}
      </Meds>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-items: space-between;
  border: 2px solid grey;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 8px 16px var(--color-shadow);
`

const Time = styled.time`
  font-size: 1.3em;
`

const Meds = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  list-style: none;
  padding: 0;
  margin: 0;
`
