import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

:root{
  --color-white: #fff;
  --color-light-mint: #E0ECDE;
  --color-dark-blue: #205072;
  --color-light-green: #7BE495;
  --color-petrol: #329D9C;
  --color-light-petrol: #68B2A0;
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
