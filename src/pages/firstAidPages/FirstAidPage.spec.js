import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import FirstAidPage from './FirstAidPage'

describe('FirstAidPage', () => {
  it('renders a List of ContactGroups', () => {
    render(
      <MemoryRouter>
        <FirstAidPage />
      </MemoryRouter>
    )

    const ObservationGroups = screen.getByRole('list')
    expect(ObservationGroups).toBeInTheDocument()

    const allObservatiuons = screen.getAllByRole('listitem')
    expect(allObservatiuons).toHaveLength(4)
  })
})
