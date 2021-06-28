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
          onSubmit={jest.fn()}
          observationType={'fev1'}
          observationTypes={[
            { name: 'Größe', type: 'size', unit: 'cm', format: '134' },
            { name: 'Gewicht', type: 'weight', unit: 'kg', format: '25,95 ' },
            {
              name: 'Temperatur',
              type: 'temperature',
              unit: '°C',
              format: '36,7',
            },
            {
              name: 'Blutdruck',
              type: 'bloodpressure',
              unit: 'mmHg',
              format: '104/57',
            },
            { name: 'FEV1', type: 'fev1', unit: 'l/s', format: '1,26' },
            {
              name: 'Blutzucker',
              type: 'bloodsugar',
              unit: 'mmol/l',
              format: '6,7',
            },
            { name: 'Urin', type: 'urine', unit: '' },
            { name: 'Notizen', type: 'notes', unit: '' },
          ]}
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

  //   it('submits the form', () => {
  //     const handleSubmit = jest.fn()
  //     render(
  //       <MemoryRouter>
  //         <ObservationFormPageDefault
  //           onSubmit={handleSubmit}
  //           observationType={'fev1'}
  //           observationTypes={[
  //             { name: 'Größe', type: 'size', unit: 'cm', format: '134' },
  //             { name: 'Gewicht', type: 'weight', unit: 'kg', format: '25,95 ' },
  //             {
  //               name: 'Temperatur',
  //               type: 'temperature',
  //               unit: '°C',
  //               format: '36,7',
  //             },
  //             {
  //               name: 'Blutdruck',
  //               type: 'bloodpressure',
  //               unit: 'mmHg',
  //               format: '104/57',
  //             },
  //             { name: 'FEV1', type: 'fev1', unit: 'l/s', format: '1,26' },
  //             {
  //               name: 'Blutzucker',
  //               type: 'bloodsugar',
  //               unit: 'mmol/l',
  //               format: '6,7',
  //             },
  //             { name: 'Urin', type: 'urine', unit: '' },
  //             { name: 'Notizen', type: 'notes', unit: '' },
  //           ]}
  //         />
  //       </MemoryRouter>
  //     )
  //     const time = screen.getByRole('textbox', { name: 'Uhrzeit: Uhr' })
  //     const inputValue = screen.getByRole('textbox', { name: 'FEV1: l/s' })
  //     userEvent.type(time, '8:00')
  //     userEvent.type(inputValue, '1,12')
  //     // const form = screen.getByRole('form')
  //     // fireEvent.submit(form)
  //     const button = screen.getByRole('button', { name: 'speichern' })
  //     userEvent.click(button)
  //     expect(handleSubmit).toHaveBeenCalledWith({
  // id: '01234',
  // time: '8:00',
  // type: 'fev1',
  // name: 'FEV1',
  // observationValue: '1,12',
  //     })
  //   })

  //   it('does not submit when one of the input fields is empty', () => {
  //     const handleSubmit = jest.fn()

  //     render(
  //       <MemoryRouter>
  //         <FormPage
  //           onSubmit={handleSubmit}
  //           medication={{
  //             time: '',
  //             meds: [],
  //           }}
  //           setSelectedMedicationId={jest.fn()}
  //         />
  //       </MemoryRouter>
  //     )
  //     const form = screen.getByRole('form')

  //     const button = screen.getByRole('button', { name: 'speichern' })
  //     expect(button).toBeDisabled()
  //     fireEvent.submit(form)

  //     expect(handleSubmit).toHaveBeenCalledTimes(0)
  //   })
})
