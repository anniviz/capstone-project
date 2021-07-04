import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ObservationPickerPage from './ObservationPickerPage'

describe('ObservationFormPickerPage', () => {
  it('renders the observation options', () => {
    render(
      <MemoryRouter>
        <ObservationPickerPage leadingPath="/observations/form" />
      </MemoryRouter>
    )

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(8)
  })
})
