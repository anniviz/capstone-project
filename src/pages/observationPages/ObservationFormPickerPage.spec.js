import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ObservationFormPickerPage from './ObservationFormPickerPage'

describe('ObservationFormPickerPage', () => {
  it('renders the observation options', () => {
    render(
      <MemoryRouter>
        <ObservationFormPickerPage
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

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(9)
  })
})
