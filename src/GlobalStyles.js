import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --color-basis: #fff;
    --color-primary: #205072;
    --color-secondary: #e0ecde;
    --color-tertiary: #68b2a0;
    --color-gradient-1: #7be495;
    --color-gradient-2: #329d9c;
    --color-shadow-13: rgba(50, 157, 156, 0.13);
    --color-shadow-21: rgba(50, 157, 156, 0.21);
    --color-warning: #f75010;

    --shadow-navbar: 0 -5px 13px rgba(118, 134, 115, 0.08);
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: var(--color-basis);
  }

  input,
  button,
  textarea {
    font-size: inherit;
  }

  .DayPicker {
    color: var(--color-primary);
  }

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

  .DayPickerInput > input{
    width: 6rem;
    color: var(--color-tertiary);
    font-size: 0.9rem;
    padding: 2px;
  }
`

export default GlobalStyles
