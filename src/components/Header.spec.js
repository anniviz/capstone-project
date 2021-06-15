import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date('2021-06-07T10:36:41.617Z'))
  })
  it('renders the Header', () => {
    render(<Header />)
    expect(screen.getByRole('heading')).toHaveTextContent('MONTAG, 7. JUNI')
  })
})
