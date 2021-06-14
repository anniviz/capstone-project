import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

:root{
  --color-light-mint: #E0ECDE;
  --color-dark-blue: #205072;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Montserrat', sans-serif;
}

input,
button,
textarea {
  font-size: inherit;
}
`

export default GlobalStyles
