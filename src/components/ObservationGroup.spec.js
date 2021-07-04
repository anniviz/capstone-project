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
