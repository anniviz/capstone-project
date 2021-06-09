import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TextButton from './TextButton'

describe('TextButton', () => {
  it('contains a text', () => {
    render(<TextButton onClick={() => {}}>Click me</TextButton>)

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
  })

  it('calls onClick', () => {
    const handleClick = jest.fn()
    render(<TextButton onClick={handleClick}>Click me</TextButton>)

    const button = screen.getByRole('button', { name: 'Click me' })
    userEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
