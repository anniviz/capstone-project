import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import deleteIcon from '../icons/delete.svg'
import editIcon from '../icons/edit.svg'
import SmallButton from './SmallButton'

MedicationGroup.propTypes = {
  id: PropTypes.node,
  time: PropTypes.node,
  meds: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.node, medName: PropTypes.string })
  ),
  editMode: PropTypes.bool,
  handleDeleteClick: PropTypes.func,
  handleEditClick: PropTypes.func,
}

export default function MedicationGroup({
  id,
  time,
  meds,
  editMode,
  handleDeleteClick,
  handleEditClick,
}) {
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
      {editMode && (
        <>
          <SmallButton
            right="10px"
            top="10px"
            color="red"
            onClick={() => handleDeleteClick(id)}
          >
            <img src={deleteIcon} alt="" height="16px" />
          </SmallButton>
          <SmallButton
            right="10px"
            top="40px"
            color="green"
            onClick={() => handleEditClick(id)}
          >
            <img src={editIcon} alt="" height="14px" />
          </SmallButton>
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 12px;
  border: 2px solid grey;
  border-radius: 8px;
  box-shadow: 0 8px 16px var(--color-shadow);
  gap: 12px;
  justify-items: space-between;
`

const Time = styled.time`
  font-size: 1.3em;
`

const Meds = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 4px;
  li {
    overflow-wrap: break-word;
  }
`
