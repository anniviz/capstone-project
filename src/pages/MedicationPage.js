import PropTypes from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components/macro'
import IconButton from '../components/buttons/IconButton'
import AddButton from '../components/buttons/AddButton'
import Header from '../components/Header'
import MedicationGroup from '../components/MedicationGroup'
import backIcon from '../icons/back.svg'
import calendarIcon from '../icons/calendar.svg'
import editRectangleIcon from '../icons/edit_rectangle.svg'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import MomentLocaleUtils from 'react-day-picker/moment'
import 'moment/locale/de'

MedicationPage.propTypes = {
  medications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      time: PropTypes.node,
      meds: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.node, medName: PropTypes.string })
      ),
    })
  ),
  setActivePage: PropTypes.func,
  setMedications: PropTypes.func,
  setMedicationToEdit: PropTypes.func,
}

export default function MedicationPage({
  medications,
  setActivePage,
  setMedications,
  setMedicationToEdit,
}) {
  const sortedMedications = medications.slice().sort(function (a, b) {
    if (convertToMinutes(a.time) > convertToMinutes(b.time)) return 1
    if (convertToMinutes(a.time) < convertToMinutes(b.time)) return -1
    return 0
  })

  const [editMode, setEditMode] = useState(false)
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)

  return (
    <Grid showCalendar={showCalendar}>
      <Header />
      <ButtonWrapper>
        <IconButton onClick={() => setShowCalendar(!showCalendar)}>
          <img src={calendarIcon} alt="" height="20px" />
        </IconButton>
        {medications.length !== 0 &&
          (editMode === false ? (
            <IconButton onClick={() => setEditMode(true)}>
              <img src={editRectangleIcon} alt="" height="20px" />
            </IconButton>
          ) : (
            <IconButton align="right" onClick={() => setEditMode(false)}>
              <img src={backIcon} alt="" height="20px" />
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
      <Flexbox>
        {sortedMedications.map(({ id, time, meds }) => (
          <MedicationGroup
            key={id}
            id={id}
            time={time}
            meds={meds}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
            editMode={editMode}
          />
        ))}
      </Flexbox>
      <AddButton onClick={() => setActivePage('form')} />
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

  function handleDeleteClick(id) {
    const index = medications.findIndex(medication => medication.id === id)
    setMedications([
      ...medications.slice(0, index),
      ...medications.slice(index + 1),
    ])
  }

  function handleEditClick(id) {
    const index = medications.findIndex(medication => medication.id === id)
    setMedicationToEdit(medications[index])
    setActivePage('form')
  }
}
const Grid = styled.div`
  position: relative;
  display: grid;
  height: 100vh;
  grid-template-rows: ${props =>
    props.showCalendar ? '80px 30px auto 1fr' : '80px 30px 1fr'};
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
`
