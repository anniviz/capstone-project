import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'
import { MemoryRouter } from 'react-router-dom'

describe('Navbar', () => {
  it('renders the Navbar with three links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
  })
})
