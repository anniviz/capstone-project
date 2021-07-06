import 'moment/locale/de'
import PropTypes from 'prop-types'
import { useState } from 'react'
import 'react-day-picker/lib/style.css'
import MomentLocaleUtils from 'react-day-picker/moment'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import Button from '../../components/buttons/Button'
import IconButton from '../../components/buttons/IconButton'
import DayPickerStyled from '../../components/DayPickerStyled'
import MedicationGroup from '../../components/MedicationGroup'
import backIcon from '../../icons/back.svg'
import calendarIcon from '../../icons/calendar.svg'
import copyDayIcon from '../../icons/copyDay.svg'
import editRectangleIcon from '../../icons/edit_rectangle.svg'
import sortByTime from '../../utils/sortByTime'

MedicationPage.propTypes = {
  medications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      time: PropTypes.node,
      meds: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.node, medName: PropTypes.string })
      ),
      isChecked: PropTypes.bool,
    })
  ),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(Date),
  onSelectedDay: PropTypes.func.isRequired,
  onCopyDay: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default function MedicationPage({
  medications,
  selectedDay,
  onEdit,
  onDelete,
  onSelectedDay,
  onCopyDay,
  onToggle,
}) {
  const sortedMedications = sortByTime(medications)

  const [editMode, setEditMode] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [copyMode, setCopyMode] = useState(false)
  const [targetDate, setTargetDate] = useState(new Date())

  const modifiers = {
    copyFromDay: selectedDay,
  }

  const history = useHistory()

  return (
    <Grid showCalendar={showCalendar}>
      <ButtonWrapper>
        {copyMode || editMode ? (
          <Spacer width="20px" />
        ) : (
          <IconButton
            onClick={() => setShowCalendar(!showCalendar)}
            aria-label="Kalender anzeigen"
          >
            <img src={calendarIcon} alt="" height="20px" />
          </IconButton>
        )}
        {medications.length !== 0 &&
          (editMode ? (
            <>
              <IconButton
                align="right"
                onClick={handleOpenCopyCalenderClick}
                aria-label="Tag kopieren"
              >
                <img src={copyDayIcon} alt="" height="20px" />
              </IconButton>
              <IconButton
                align="right"
                onClick={handleBackClick}
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
      {copyMode && (
        <CopyWrapper>
          <DayPickerStyled
            onDayClick={handleCopyDayClick}
            selectedDays={targetDate}
            modifiers={modifiers}
            localeUtils={MomentLocaleUtils}
            locale="de"
          />
          <Button onClick={handleSaveCopyClick} type="button">
            Kopieren
          </Button>
        </CopyWrapper>
      )}
      <Flexbox>
        {sortedMedications.map(({ id, time, meds, isChecked }) => (
          <MedicationGroup
            key={id}
            id={id}
            time={time}
            meds={meds}
            isChecked={isChecked}
            editMode={editMode}
            handleDeleteClick={onDelete}
            handleEditClick={handleEditClick}
            handleCheckClick={onToggle}
          />
        ))}
      </Flexbox>
    </Grid>
  )

  function handleDayClick(day) {
    onSelectedDay(day)
  }

  function handleEditClick(id) {
    onEdit(id)
    history.push('/medications/form')
  }

  function handleOpenCopyCalenderClick() {
    setCopyMode(!copyMode)
    setShowCalendar(false)
  }

  function handleCopyDayClick(day) {
    setTargetDate(day)
  }

  function handleSaveCopyClick() {
    onCopyDay(targetDate)
    setEditMode(false)
    setCopyMode(false)
    onSelectedDay(targetDate)
    setTargetDate(new Date())
  }

  function handleBackClick() {
    setEditMode(false)
    setCopyMode(false)
  }
}
const Grid = styled.main`
  display: grid;
  grid-template-rows: ${props =>
    props.showCalendar ? 'auto auto 1fr' : 'auto 1fr'};
  overflow: auto;
`

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  overflow-y: auto;
  gap: 20px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 20px 26px 10px 26px;
`

const Spacer = styled.div`
  width: ${props => props.width};
`

const CopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
