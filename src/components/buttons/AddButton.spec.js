import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddButton from './AddButton'

describe('Button', () => {
  it('calls onClick', () => {
    const handleClick = jest.fn()
    render(<AddButton onClick={handleClick}>Click me</AddButton>)

    const button = screen.getByRole('button')
    userEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
