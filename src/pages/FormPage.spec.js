import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import FormPage from './FormPage'
jest.mock('uuid', () => ({
  v4: () => '01234',
}))

describe('FormPage', () => {
  it('renders a FormPage with 2 inputs/textareas, 2 labels and 2 buttons', () => {
    render(
      <MemoryRouter>
        <FormPage
          onSubmit={jest.fn()}
          medication={{
            time: '',
            meds: [],
          }}
          setSelectedMedicationId={jest.fn()}
        />
      </MemoryRouter>
    )
    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()

    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(2)

    const label1 = screen.getByText('Uhrzeit:')
    expect(label1).toBeInTheDocument()
    const label2 = screen.getByText('Medikamente:')
    expect(label2).toBeInTheDocument()

    const button = screen.getAllByRole('button')
    expect(button).toHaveLength(2)
  })

  it('submits the form', () => {
    const handleSubmit = jest.fn()
    render(
      <MemoryRouter>
        <FormPage
          onSubmit={handleSubmit}
          medication={{
            time: '',
            meds: [],
          }}
          setSelectedMedicationId={jest.fn()}
        />
      </MemoryRouter>
    )
    const time = screen.getByRole('textbox', { name: 'Uhrzeit:' })
    const meds = screen.getByRole('textbox', {
      name: 'Medikamente: ASS (50mg) Magnesium (80mg) Metoprolol (23,75mg)',
    })
    userEvent.type(time, '8:00')
    userEvent.type(
      meds,
      `ASS
Metoprolol
Magnesium`
    )

    const button = screen.getByRole('button', { name: 'speichern' })
    userEvent.click(button)
    expect(handleSubmit).toHaveBeenCalledWith({
      id: '01234',
      time: '8:00',
      meds: [
        { id: '01234', medName: 'ASS' },
        { id: '01234', medName: 'Metoprolol' },
        { id: '01234', medName: 'Magnesium' },
      ],
    })
  })

  it('does not submit when one of the input fields is empty', () => {
    const handleSubmit = jest.fn()

    render(
      <MemoryRouter>
        <FormPage
          onSubmit={handleSubmit}
          medication={{
            time: '',
            meds: [],
          }}
          setSelectedMedicationId={jest.fn()}
        />
      </MemoryRouter>
    )
    const form = screen.getByRole('form')

    const button = screen.getByRole('button', { name: 'speichern' })
    expect(button).toBeDisabled()
    fireEvent.submit(form)

    expect(handleSubmit).toHaveBeenCalledTimes(0)
  })
})
