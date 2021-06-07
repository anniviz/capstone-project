import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: sans-serif;
}

input,
button,
textarea {
  font-size: inherit;
}
`

export default GlobalStyles
