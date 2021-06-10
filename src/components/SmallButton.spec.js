import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SmallButton from './SmallButton'

describe('SmallButton', () => {
  it('calls onClick', () => {
    const handleClick = jest.fn()
    render(<SmallButton onClick={handleClick}>Click me</SmallButton>)

    const button = screen.getByRole('button', { name: 'Click me' })
    userEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
