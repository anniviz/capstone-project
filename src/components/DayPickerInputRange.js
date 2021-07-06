import PropTypes from 'prop-types'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment'
import styled from 'styled-components/macro'

DayPickerInputRange.propTypes = {
  from: PropTypes.instanceOf(Date).isRequired,
  setFrom: PropTypes.func.isRequired,
  to: PropTypes.instanceOf(Date).isRequired,
  setTo: PropTypes.func.isRequired,
}

export default function DayPickerInputRange({ from, setFrom, to, setTo }) {
  const modifiers = { start: from, end: to }

  return (
    <DayPickerWrapper>
      <div>
        <Legend>Start Datum</Legend>
        <DayPickerInput
          value={from}
          onDayChange={day => handleDayChange(day, 'start')}
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            modifiers,
            locale: 'de',
            localeUtils: MomentLocaleUtils,
          }}
        />
      </div>
      <div>
        <Legend>End Datum</Legend>
        <DayPickerInput
          value={to}
          onDayChange={day => handleDayChange(day, 'end')}
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { before: from },
            modifiers,
            locale: 'de',
            localeUtils: MomentLocaleUtils,
          }}
        />
      </div>
    </DayPickerWrapper>
  )

  function handleDayChange(day, position) {
    position === 'start' ? setFrom(day) : setTo(day)
  }
}

const DayPickerWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-around;
  padding: 12px;

  .DayPicker {
    color: var(--color-primary);
  }

  .DayPickerInput-Overlay {
    position: absolute;
    left: 0;
    z-index: 1;

    background: white;
    border-radius: 20px;
    box-shadow: 34px 34px 89px var(--color-shadow-13);
  }

  .DayPickerInput-OverlayWrapper {
    width: 240px;
    position: absolute;
    margin: 0;
    padding: 0;
    left: calc(50vw - 138.5px);
    top: 80px;
  }

  .DayPickerInput > input {
    width: 6rem;
    color: var(--color-tertiary);
    font-size: 0.9rem;
    padding: 2px;
  }
  .DayPicker-Day {
    border-radius: 0%;
  }

  .DayPicker-Day--today {
    color: var(--color-tertiary);
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
    background-color: var(--color-tertiary);
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: var(--color-tertiary);
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: var(--color-secondary) !important;
    color: var(--color-primary);
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: var(--color-secondary) !important;
    color: var(--color-primary);
  }

  .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }

  .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
`

const Legend = styled.legend`
  margin-bottom: 8px;
  color: var(--color-primary);
  font-weight: 500;
  font-size: 0.9rem;
`
