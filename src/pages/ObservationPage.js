import { useState } from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import MomentLocaleUtils from 'react-day-picker/moment'
import styled from 'styled-components/macro'
import ObservationGroup from '../components/ObservationGroup'
import IconButton from '../components/buttons/IconButton'
import backIcon from '../icons/back.svg'
import calendarIcon from '../icons/calendar.svg'
import copyDayIcon from '../icons/copyDay.svg'
import editRectangleIcon from '../icons/edit_rectangle.svg'

export default function ObservationPage() {
  //   const observationsDiary = [
  //     {
  //       date: '2021-06-25',
  //       observations: [
  //         { id: 1, time: '8:00', name: 'Blutdruck', value: '94/50' },
  //         { id: 2, time: '8:00', name: 'Temperatur', value: '36,5' },
  //         { id: 3, time: '8:00', name: 'Gewicht', value: '22,5' },
  //         { id: 3, time: '10:00', name: 'FEV1', value: '1,11' },
  //       ],
  //     },
  //     {
  //       date: '2021-06-25',
  //       observations: [
  //         { id: 1, time: '8:00', name: 'Blutdruck', value: '87/45' },
  //         { id: 2, time: '8:00', name: 'Temperatur', value: '36,2' },
  //         { id: 3, time: '8:00', name: 'Gewicht', value: '22,5' },
  //         { id: 3, time: '10:00', name: 'FEV1', value: '1,13' },
  //         { id: 3, time: '11:00', name: 'Notiz', value: 'gute Laune' },
  //       ],
  //     },
  //   ]

  const observations = [
    { id: 1, time: '8:00', name: 'Blutdruck', value: '94/50' },
    { id: 2, time: '8:00', name: 'Temperatur', value: '36,5' },
    { id: 3, time: '8:00', name: 'Gewicht', value: '22,5' },
    { id: 3, time: '10:00', name: 'FEV1', value: '1,11' },
  ]

  const [showCalendar, setShowCalendar] = useState(false)
  const [editMode, setEditMode] = useState(false)

  return (
    <Grid showCalendar={showCalendar}>
      <ButtonWrapper>
        {editMode ? (
          <Spacer width="20px" />
        ) : (
          <IconButton
            onClick={() => setShowCalendar(!showCalendar)}
            aria-label="Kalender anzeigen"
          >
            <img src={calendarIcon} alt="" height="20px" />
          </IconButton>
        )}
        {observations.length !== 0 &&
          (editMode === true ? (
            <>
              <IconButton
                align="right"
                // onClick={handleOpenCopyCalenderClick}
                aria-label="Tag kopieren"
              >
                <img src={copyDayIcon} alt="" height="20px" />
              </IconButton>
              <IconButton
                align="right"
                // onClick={handleBackClick}
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
          //   onDayClick={handleDayClick}
          //   selectedDays={selectedDay}
          localeUtils={MomentLocaleUtils}
          locale="de"
        />
      )}
      <Flexbox>
        {observations.map(({ id, time, name, value }) => (
          <ObservationGroup
            key={id}
            id={id}
            time={time}
            name={name}
            value={value}
          />
        ))}
      </Flexbox>
    </Grid>
  )
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

const DayPickerStyled = styled(DayPicker)`
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
