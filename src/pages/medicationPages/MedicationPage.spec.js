import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import MedicationPage from './MedicationPage'

describe('MedicationPage', () => {
  it('renders a List of MedicationGroups and buttons', () => {
    render(
      <MemoryRouter>
        <MedicationPage
          medications={[
            {
              id: '01234',
              time: '8:00',
              meds: [
                { id: '01234', medName: 'ASS' },
                { id: '01235', medName: 'Metoprolol' },
                { id: '01236', medName: 'Magnesium' },
              ],
            },
            {
              id: '01235',
              time: '9:00',
              meds: [{ id: '01234', medName: 'Tacrolimus' }],
            },
          ]}
          onDelete={jest.fn()}
          onEdit={jest.fn()}
          selectedDay={new Date('2021-06-07T10:36:41.617Z')}
          onSelectedDay={jest.fn()}
          onCopyDay={jest.fn()}
          onToggle={jest.fn()}
        />
      </MemoryRouter>
    )

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(4)

    const MedGroups = screen.getAllByRole('list')
    expect(MedGroups).toHaveLength(2)

    const allMeds = screen.getAllByRole('listitem')
    expect(allMeds).toHaveLength(4)
  })

  it('reders a calendar when calendar is clicked', () => {
    render(
      <MemoryRouter>
        <MedicationPage
          medications={[
            {
              id: '01234',
              time: '8:00',
              meds: [
                { id: '01234', medName: 'ASS' },
                { id: '01235', medName: 'Metoprolol' },
                { id: '01236', medName: 'Magnesium' },
              ],
            },
            {
              id: '01235',
              time: '9:00',
              meds: [{ id: '01234', medName: 'Tacrolimus' }],
            },
          ]}
          onDelete={jest.fn()}
          onEdit={jest.fn()}
          selectedDay={new Date('2021-06-07T10:36:41.617Z')}
          onSelectedDay={jest.fn()}
          onCopyDay={jest.fn()}
          onToggle={jest.fn()}
        />
      </MemoryRouter>
    )

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(4)

    userEvent.click(buttons[0])
    const calendar = screen.getByRole('row', {
      name: 'Montag Dienstag Mittwoch Donnerstag Freitag Samstag Sonntag',
    })
    expect(calendar).toBeInTheDocument()
  })
})
