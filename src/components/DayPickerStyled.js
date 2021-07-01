import DayPicker from 'react-day-picker'
import styled from 'styled-components/macro'

const DayPickerStyled = styled(DayPicker)`
  color: var(--color-primary);
  margin: 16px;
  border-radius: 20px;
  box-shadow: 34px 34px 89px var(--color-shadow-13);

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
    background: radial-gradient(
      at top left,
      var(--color-gradient-1),
      var(--color-gradient-2)
    );
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
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

export default DayPickerStyled
