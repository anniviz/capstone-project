import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ObservationPage from './ObservationPage'

describe('ObservationPage', () => {
  it('renders a List of ObservationGroups', () => {
    render(
      <MemoryRouter>
        <ObservationPage
          observationTypes={[
            { name: 'Größe', type: 'size', unit: 'cm' },
            { name: 'Gewicht', type: 'weight', unit: 'kg' },
            { name: 'Temperatur', type: 'temperature', unit: '°C' },
            { name: 'Blutdruck', type: 'bloodpressure', unit: 'mmHg' },
            { name: 'FEV1', type: 'fev1', unit: 'l/s' },
            { name: 'Blutzucker', type: 'bloodsugar', unit: 'mmol/l' },
            { name: 'Urin', type: 'urin', unit: '' },
            { name: 'Notizen', type: 'notes', unit: '' },
          ]}
        />
      </MemoryRouter>
    )

    const ObservationGroups = screen.getByRole('list')
    expect(ObservationGroups).toBeInTheDocument()

    const allObservatiuons = screen.getAllByRole('listitem')
    expect(allObservatiuons).toHaveLength(4)
  })
})
