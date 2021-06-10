import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import SmallButton from './SmallButton'

MedicationGroup.propTypes = {
  id: PropTypes.node,
  time: PropTypes.node,
  meds: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.node, medName: PropTypes.string })
  ),
  handleDeleteClick: PropTypes.func,
}

export default function MedicationGroup({ id, time, meds, handleDeleteClick }) {
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
      <SmallButton
        right="10px"
        top="10px"
        onClick={() => handleDeleteClick(id)}
      >
        -
      </SmallButton>
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
  position: relative;
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
  li {
    overflow-wrap: break-word;
  }
`
