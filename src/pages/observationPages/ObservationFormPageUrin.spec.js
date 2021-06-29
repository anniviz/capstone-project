import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ObservationFormPageUrin from './ObservationFormPageUrin'
jest.mock('uuid', () => ({
  v4: () => '01234',
}))

describe('ObservationFormPageUrin', () => {
  it('renders a FormPage with 1 input, 2 radio groups and 2 buttons', () => {
    render(
      <MemoryRouter>
        <ObservationFormPageUrin observation={{}} onSubmit={jest.fn()} />
      </MemoryRouter>
    )
    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()

    const inputs = screen.getByRole('textbox')
    expect(inputs).toBeInTheDocument()

    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(6)

    const label1 = screen.getByText('Uhrzeit:')
    expect(label1).toBeInTheDocument()
    const label2 = screen.getByText('Urin')
    expect(label2).toBeInTheDocument()

    const button = screen.getAllByRole('button')
    expect(button).toHaveLength(2)
  })

  it('submits the form', () => {
    const handleSubmit = jest.fn()
    render(
      <MemoryRouter>
        <ObservationFormPageUrin observation={{}} onSubmit={handleSubmit} />
      </MemoryRouter>
    )
    const time = screen.getByRole('textbox', { name: 'Uhrzeit: Uhr' })
    time.value = ''
    userEvent.type(time, '8:00')
    const radios = screen.getAllByRole('radio')
    userEvent.click(radios[2])

    const button = screen.getByRole('button', { name: 'speichern' })
    userEvent.click(button)
    expect(handleSubmit).toHaveBeenCalledWith({
      id: '01234',
      time: '8:00',
      type: 'urine',
      name: 'Urin',
      observationValue: '2+\nneg.',
    })
  })
})
