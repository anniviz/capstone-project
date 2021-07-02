import { render, screen } from '@testing-library/react'
import ObservationGroup from './ObservationGroup'

describe('ObservationGroup', () => {
  it('renders the date and the observation', () => {
    render(
      <ObservationGroup
        id="1234"
        time={'8:00'}
        name={'Blutdruck'}
        value={'94/50'}
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
        handleEditClick={jest.fn()}
        handleDeleteClick={jest.fn()}
      />
    )

    const title = screen.getByRole('heading')
    const time = screen.getByText('8:00 Uhr')
    const value = screen.getByText('94/50 mmHg')
    expect(title).toBeInTheDocument()
    expect(time).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })
})
