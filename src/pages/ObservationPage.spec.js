import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ObservationPage from './ObservationPage'

describe('ObservationPage', () => {
  it('renders a List of ObservationGroups', () => {
    render(
      <MemoryRouter>
        <ObservationPage />
      </MemoryRouter>
    )

    const ObservationGroups = screen.getByRole('list')
    expect(ObservationGroups).toBeInTheDocument()

    const allObservatiuons = screen.getAllByRole('listitem')
    expect(allObservatiuons).toHaveLength(4)
  })
})
