import { render, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Header from './Header'

describe('Header', () => {
  const history = createMemoryHistory()
  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date('2021-06-07T10:36:41.617Z'))
  })
  it('renders the Header', () => {
    render(
      <Router history={history}>
        <Header selectedDay={new Date('2021-06-07T10:36:41.617Z')} />
      </Router>
    )
    expect(screen.getByRole('heading')).toHaveTextContent('MONTAG, 7. JUNI')
  })
})
