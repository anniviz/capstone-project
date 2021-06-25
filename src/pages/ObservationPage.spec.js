import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ObservationPage from './ObservationPage'

describe('ObservationPage', () => {
  it('renders a List of ObservationGroups', () => {
    render(
      <MemoryRouter>
        <ObservationPage
          observations={[
            { id: 1, time: '8:00', name: 'Blutdruck', value: '94/50' },
            { id: 2, time: '8:00', name: 'Temperatur', value: '36,5' },
            { id: 3, time: '8:00', name: 'Gewicht', value: '22,5' },
            { id: 4, time: '10:00', name: 'FEV1', value: '1,11' },
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
