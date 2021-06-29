import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import deleteIcon from '../icons/delete.svg'
import editIcon from '../icons/edit.svg'
import IconButton from './buttons/IconButton'

ObservationGroup.propTypes = {
  id: PropTypes.node.isRequired,
  time: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  observationTypes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      unit: PropTypes.string,
      format: PropTypes.string,
    }).isRequired
  ),
  editMode: PropTypes.bool,
  handleEditClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
}

export default function ObservationGroup({
  id,
  time,
  name,
  value,
  observationTypes,
  editMode,
  handleEditClick,
  handleDeleteClick,
}) {
  const { unit, type } = observationTypes.find(element => element.name === name)

  return (
    <Wrapper>
      <Title>{name}</Title>
      <Time>{time} Uhr</Time>
      <Value>
        {value} {unit}
      </Value>
      {editMode && (
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
            onClick={() => handleEditClick(id, type)}
            position="absolute"
          >
            <img src={editIcon} alt="bearbeiten" height="16px" />
          </IconButton>
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.li`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 12px;
  border-bottom: 2px solid var(--color-secondary);
  gap: 12px;
  justify-items: space-between;
`

const Title = styled.h3`
  color: var(--color-primary);
  font-size: 1.3em;
  margin: 0;
`

const Time = styled.time`
  color: var(--color-tertiary);
  font-weight: bold;
  font-size: 1em;
`

const Value = styled.div`
  color: var(--color-primary);
  white-space: pre-wrap;
`
