import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders the Header', async () => {
    const { container } = render(<Header>Header</Header>)
    expect(container.firstChild).toHaveTextContent('Header')
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })
})
