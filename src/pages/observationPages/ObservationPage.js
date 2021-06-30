import PropTypes from 'prop-types'
import { useState } from 'react'
import 'react-day-picker/lib/style.css'
import MomentLocaleUtils from 'react-day-picker/moment'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import IconButton from '../../components/buttons/IconButton'
import DayPickerStyled from '../../components/DayPickerStyled'
import ObservationGroup from '../../components/ObservationGroup'
import backIcon from '../../icons/back.svg'
import calendarIcon from '../../icons/calendar.svg'
import editRectangleIcon from '../../icons/edit_rectangle.svg'
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
  selectedDay: PropTypes.instanceOf(Date),
  onSelectedDay: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default function ObservationPage({
  observations,
  observationTypes,
  selectedDay,
  onSelectedDay,
  onEdit,
  onDelete,
}) {
  const sortedObservations = sortByTime(observations)
  const [editMode, setEditMode] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  let history = useHistory()

  return (
    <Grid>
      <ButtonWrapper>
        <IconButton
          onClick={() => setShowCalendar(!showCalendar)}
          aria-label="Kalender anzeigen"
        >
          <img src={calendarIcon} alt="" height="20px" />
        </IconButton>
        {observations.length !== 0 &&
          (editMode ? (
            <>
              <IconButton
                align="right"
                onClick={() => setEditMode(false)}
                aria-label="Bearbeiten beenden"
              >
                <img src={backIcon} alt="" height="20px" />
              </IconButton>
            </>
          ) : (
            <IconButton
              onClick={() => setEditMode(true)}
              aria-label="Medikationen bearbeiten"
            >
              <img src={editRectangleIcon} alt="" height="20px" />
            </IconButton>
          ))}
      </ButtonWrapper>
      {showCalendar && (
        <DayPickerStyled
          onDayClick={handleDayClick}
          selectedDays={selectedDay}
          localeUtils={MomentLocaleUtils}
          locale="de"
        />
      )}
      <Flexbox>
        {sortedObservations.map(({ id, time, name, observationValue }) => (
          <ObservationGroup
            key={id}
            id={id}
            observationTypes={observationTypes}
            time={time}
            name={name}
            value={observationValue}
            editMode={editMode}
            handleDeleteClick={onDelete}
            handleEditClick={handleEditClick}
          />
        ))}
      </Flexbox>
    </Grid>
  )

  function handleDayClick(day) {
    onSelectedDay(day)
  }

  function handleEditClick(id, type) {
    onEdit(id)
    history.push('/observations/form/' + type)
  }
}

const Grid = styled.main`
  display: grid;
  grid-template-rows: ${props =>
    props.showCalendar ? 'auto auto 1fr' : 'auto 1fr'};
  overflow: auto;
`

const Flexbox = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  overflow-y: auto;
  gap: 20px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 26px 10px 26px;
`
