import PropTypes from 'prop-types'
import { useState } from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import MomentLocaleUtils from 'react-day-picker/moment'
import styled from 'styled-components/macro'
import IconButton from '../../components/buttons/IconButton'
import ObservationGroup from '../../components/ObservationGroup'
import calendarIcon from '../../icons/calendar.svg'
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
}

export default function ObservationPage({
  observations,
  observationTypes,
  selectedDay,
  onSelectedDay,
}) {
  const sortedObservations = sortByTime(observations)
  const [showCalendar, setShowCalendar] = useState(false)

  return (
    <Grid>
      <ButtonWrapper>
        <IconButton
          onClick={() => setShowCalendar(!showCalendar)}
          aria-label="Kalender anzeigen"
        >
          <img src={calendarIcon} alt="" height="20px" />
        </IconButton>
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
            observationTypes={observationTypes}
            time={time}
            name={name}
            value={observationValue}
          />
        ))}
      </Flexbox>
    </Grid>
  )

  function handleDayClick(day) {
    onSelectedDay(day)
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
  padding: 20px 26px 10px 26px;
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
