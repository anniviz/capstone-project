import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ObservationFormPageNote from './ObservationFormPageNote'
jest.mock('uuid', () => ({
  v4: () => '01234',
}))

describe('ObservationFormPageNote', () => {
  it('renders a FormPage with 2 inputs/textareas, 2 labels and 2 buttons', () => {
    render(
      <MemoryRouter>
        <ObservationFormPageNote observation={{}} onSubmit={jest.fn()} />
      </MemoryRouter>
    )
    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()

    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(2)

    const label1 = screen.getByText('Uhrzeit:')
    expect(label1).toBeInTheDocument()
    const label2 = screen.getByText('Notizen:')
    expect(label2).toBeInTheDocument()

    const button = screen.getAllByRole('button')
    expect(button).toHaveLength(2)
  })

  it('submits the form', () => {
    const handleSubmit = jest.fn()
    render(
      <MemoryRouter>
        <ObservationFormPageNote observation={{}} onSubmit={handleSubmit} />
      </MemoryRouter>
    )
    const time = screen.getByRole('textbox', { name: 'Uhrzeit: Uhr' })
    const notes = screen.getByRole('textbox', { name: 'Notizen:' })
    time.value = ''
    userEvent.type(time, '8:00')
    userEvent.type(notes, 'Übelkeit am Morgen')

    const button = screen.getByRole('button', { name: 'speichern' })
    userEvent.click(button)
    expect(handleSubmit).toHaveBeenCalledWith({
      id: '01234',
      time: '8:00',
      type: 'notes',
      name: 'Notizen',
      observationValue: 'Übelkeit am Morgen',
    })
  })

  it('does not submit when one of the input fields is empty', () => {
    const handleSubmit = jest.fn()

    render(
      <MemoryRouter>
        <ObservationFormPageNote observation={{}} onSubmit={handleSubmit} />
      </MemoryRouter>
    )
    const form = screen.getByRole('form')

    const button = screen.getByRole('button', { name: 'speichern' })
    expect(button).toBeDisabled()
    fireEvent.submit(form)

    expect(handleSubmit).toHaveBeenCalledTimes(0)
  })
})
