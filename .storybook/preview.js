import GlobalStyles from '../src/GlobalStyles'
import {MemoryRouter} from 'react-router-dom'


export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  Story => (
  <>
  <MemoryRouter>
  <GlobalStyles/>
  <Story/>
  </MemoryRouter>
  </>
  ),
]