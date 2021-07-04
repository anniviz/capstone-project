import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ObservationFormPageDefault from './ObservationFormPageDefault'
jest.mock('uuid', () => ({
  v4: () => '01234',
}))

describe('ObservationFormPageDefault', () => {
  it('renders a ObservationFormPageDefault with 2 inputs, 2 labels and 2 buttons', () => {
    render(
      <MemoryRouter>
        <ObservationFormPageDefault
          observation={{}}
          onSubmit={jest.fn()}
          observationType={'fev1'}
          setSelectedObservationId={jest.fn()}
        />
      </MemoryRouter>
    )
    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()

    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(2)

    const label2 = screen.getByText('FEV1:')
    expect(label2).toBeInTheDocument()
    const label1 = screen.getByText('Uhrzeit:')
    expect(label1).toBeInTheDocument()

    const button = screen.getAllByRole('button')
    expect(button).toHaveLength(2)
  })

  it('submits the form', () => {
    const handleSubmit = jest.fn()
    render(
      <MemoryRouter>
        <ObservationFormPageDefault
          observation={{}}
          setSelectedObservationId={jest.fn()}
          onSubmit={handleSubmit}
          observationType={'fev1'}
        />
      </MemoryRouter>
    )
    const time = screen.getByRole('textbox', { name: 'Uhrzeit: Uhr' })
    const inputValue = screen.getByRole('textbox', { name: 'FEV1: l/s' })
    time.value = ''

    userEvent.type(time, '8:00')
    userEvent.type(inputValue, '1,12')
    const button = screen.getByRole('button', { name: 'speichern' })

    userEvent.click(button)
    expect(handleSubmit).toHaveBeenCalledWith({
      id: '01234',
      time: '8:00',
      type: 'fev1',
      name: 'FEV1',
      observationValue: '1,12',
    })
  })

  it('does not submit when one of the input fields is empty', () => {
    const handleSubmit = jest.fn()

    render(
      <MemoryRouter>
        <ObservationFormPageDefault
          observation={{}}
          onSubmit={handleSubmit}
          observationType={'fev1'}
          setSelectedObservationId={jest.fn()}
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
