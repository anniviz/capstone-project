import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import deleteIcon from '../icons/delete.svg'
import editIcon from '../icons/edit.svg'
import checkIcon from '../icons/check-done.svg'
import checkIconDisabled from '../icons/check-disabled.svg'
import IconButton from './buttons/IconButton'

MedicationGroup.propTypes = {
  id: PropTypes.node,
  time: PropTypes.node,
  meds: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.node, medName: PropTypes.string })
  ).isRequired,
  editMode: PropTypes.bool,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleCheckClick: PropTypes.func.isRequired,
  check: PropTypes.bool,
}

export default function MedicationGroup({
  id,
  time,
  meds,
  editMode,
  handleDeleteClick,
  handleEditClick,
  handleCheckClick,
  check,
}) {
  return (
    <Wrapper>
      <Time role="time" dateTime={time}>
        {time} Uhr
      </Time>
      <Meds>
        {meds.map(({ id, medName }) => (
          <li key={id}>{medName}</li>
        ))}
      </Meds>
      {editMode ? (
        <>
          <IconButton
            right="10px"
            top="20px"
            onClick={() => handleDeleteClick(id)}
            position="absolute"
          >
            <img src={deleteIcon} alt="löschen" height="16px" />
          </IconButton>
          <IconButton
            right="10px"
            top="52px"
            onClick={() => handleEditClick(id)}
            position="absolute"
          >
            <img src={editIcon} alt="bearbeiten" height="16px" />
          </IconButton>
        </>
      ) : (
        <IconButton
          right="10px"
          bottom="10px"
          onClick={() => handleCheckClick(id)}
          position="absolute"
        >
          {check ? (
            <img src={checkIcon} alt="löschen" height="20px" />
          ) : (
            <img src={checkIconDisabled} alt="löschen" height="20px" />
          )}
        </IconButton>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 12px;
  border-bottom: 2px solid var(--color-secondary);
  gap: 12px;
  justify-items: space-between;
`

const Time = styled.time`
  color: var(--color-primary);
  font-weight: bold;
  font-size: 1.3em;
`

const Meds = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 6px;

  li {
    color: var(--color-primary);
    overflow-wrap: break-word;
    :nth-child(odd) {
      color: var(--color-tertiary);
    }
  }
`
