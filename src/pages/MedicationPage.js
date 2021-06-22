import 'moment/locale/de'
import PropTypes from 'prop-types'
import { useState } from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import MomentLocaleUtils from 'react-day-picker/moment'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import AddLink from '../components/AddLink'
import Button from '../components/buttons/Button'
import IconButton from '../components/buttons/IconButton'
import Header from '../components/Header'
import MedicationGroup from '../components/MedicationGroup'
import backIcon from '../icons/back.svg'
import calendarIcon from '../icons/calendar.svg'
import editRectangleIcon from '../icons/edit_rectangle.svg'

MedicationPage.propTypes = {
  medications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      time: PropTypes.node,
      meds: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.node, medName: PropTypes.string })
      ),
      check: PropTypes.bool,
    })
  ),
  deleteSingleMedication: PropTypes.func.isRequired,
  setMedicationToEditId: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(Date),
  setSelectedDay: PropTypes.func.isRequired,
  copyToDay: PropTypes.instanceOf(Date),
  setCopyToDay: PropTypes.func.isRequired,
  saveCopy: PropTypes.func.isRequired,
  toggleMedicationCheck: PropTypes.func.isRequired,
}

export default function MedicationPage({
  medications,
  deleteSingleMedication,
  setMedicationToEditId,
  selectedDay,
  setSelectedDay,
  copyToDay,
  setCopyToDay,
  saveCopy,
  toggleMedicationCheck,
}) {
  const sortedMedications = medications.slice().sort(function (a, b) {
    if (convertToMinutes(a.time) > convertToMinutes(b.time)) return 1
    if (convertToMinutes(a.time) < convertToMinutes(b.time)) return -1
    return 0
  })

  const [editMode, setEditMode] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [copyMode, setCopyMode] = useState(false)

  const modifiers = {
    copyFromDay: selectedDay,
  }

  const { history } = useHistory()

  return (
    <Grid showCalendar={showCalendar}>
      <Header selectedDay={selectedDay} />
      <ButtonWrapper>
        {copyMode ? (
          <EmptyFlexElement />
        ) : (
          <IconButton onClick={() => setShowCalendar(!showCalendar)}>
            <img src={calendarIcon} alt="" height="20px" />
          </IconButton>
        )}
        {medications.length !== 0 &&
          (editMode === true ? (
            <>
              <IconButton
                align="right"
                onClick={handleCopyClick}
                aria-label="Tag kopieren"
              >
                <Text>Tag kopieren</Text>
              </IconButton>
              <IconButton align="right" onClick={handleBackClick}>
                <img src={backIcon} alt="" height="20px" />
              </IconButton>
            </>
          ) : (
            <IconButton onClick={() => setEditMode(true)}>
              <img src={editRectangleIcon} alt="" height="20px" />
            </IconButton>
          ))}
      </ButtonWrapper>
      {showCalendar && (
        <StyledDayPicker
          onDayClick={handleDayClick}
          selectedDays={selectedDay}
          localeUtils={MomentLocaleUtils}
          locale="de"
        />
      )}
      {copyMode && (
        <CopyWrapper>
          <StyledDayPicker
            onDayClick={handlecopyToDayClick}
            selectedDays={copyToDay}
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
        {sortedMedications.map(({ id, time, meds, check }) => (
          <MedicationGroup
            key={id}
            id={id}
            time={time}
            meds={meds}
            check={check}
            editMode={editMode}
            handleDeleteClick={deleteSingleMedication}
            handleEditClick={handleEditClick}
            handleCheckClick={toggleMedicationCheck}
          />
        ))}
      </Flexbox>
      <AddLink to="/medications/form" />
    </Grid>
  )

  function handleDayClick(day) {
    setSelectedDay(day)
  }

  function convertToMinutes(time) {
    const timeArray = time.split(':')
    const minutes = timeArray[0] * 60 + timeArray[1]
    return Number(minutes)
  }

  function handleEditClick(id) {
    setMedicationToEditId(id)
    history('/medications/form')
  }

  function handleCopyClick() {
    setCopyMode(!copyMode)
    setShowCalendar(false)
  }

  function handlecopyToDayClick(day) {
    setCopyToDay(day)
  }

  function handleSaveCopyClick() {
    saveCopy()
    setEditMode(false)
    setCopyMode(false)
    setSelectedDay(copyToDay)
    setCopyToDay(new Date())
  }

  function handleBackClick() {
    setEditMode(false)
    setCopyMode(false)
  }
}
const Grid = styled.div`
  position: relative;
  display: grid;
  height: 100vh;
  grid-template-rows: ${props =>
    props.showCalendar ? 'auto 30px auto 1fr' : 'auto 30px 1fr'};
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
  padding: 0 26px;
`

const EmptyFlexElement = styled.div`
  width: 20px;
`

const Text = styled.span`
  color: var(--color-tertiary);
`

const StyledDayPicker = styled(DayPicker)`
  margin: 16px;
  border-radius: 20px;
  box-shadow: 34px 34px 89px var(--color-shadow-13);

  .DayPicker-Day--selected {
    background: radial-gradient(
      at top left,
      var(--color-gradient-1),
      var(--color-gradient-2)
    );
  }

  .DayPicker-Day--today {
    color: var(--color-tertiary);
  }

  .DayPicker-Day--copyFromDay {
    color: var(--color-warning);
  }
`

const CopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
