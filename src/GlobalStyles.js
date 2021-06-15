import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

:root{
  --color-white: #fff;
  --color-light-mint: #E0ECDE;
  --color-dark-blue: #205072;
  --color-light-green: #7BE495;
  --color-petrol: #329D9C;
  --color-petrol-21: rgba(50, 157, 156, 0.21);
  --color-petrol-13: rgba(50, 157, 156, 0.13);
  --color-light-petrol: #68B2A0;
  --color-red: #F75010;
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
