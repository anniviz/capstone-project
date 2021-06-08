import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders the Header', () => {
    render(<Header>Header</Header>)
    expect(screen.getByRole('heading')).toHaveTextContent('Header')
  })
})