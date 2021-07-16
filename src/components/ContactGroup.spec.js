import { render, screen } from '@testing-library/react'
import ContactGroup from './ContactGroup'

describe('ContactGroup', () => {
  it('renders the contact', () => {
    render(<ContactGroup name="Kinderklinik" content="Tel: 01234-56789111" />)

    const name = screen.getByRole('heading')
    const content = screen.getByText('Tel: 01234-56789111')
    expect(name).toBeInTheDocument()
    expect(content).toBeInTheDocument()
  })
})
