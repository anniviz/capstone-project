import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MedicationPage from './MedicationPage'

describe('MedicationPage', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date('2021-06-07T10:36:41.617Z'))
  })
  it('renders Header with date, buttons and a List of MedicationGroups', () => {
    render(
      <MedicationPage
        setActivePage={jest.fn()}
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
        selectedDay={new Date('2021-06-07T10:36:41.617Z')}
      />
    )

    const header = screen.getByRole('heading')
    expect(header).toBeInTheDocument()

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)

    const MedGroups = screen.getAllByRole('list')
    expect(MedGroups).toHaveLength(2)

    const allMeds = screen.getAllByRole('listitem')
    expect(allMeds).toHaveLength(4)
  })
  it('sets activePage to form when AddButton is clicked', () => {
    const setActivePage = jest.fn()
    render(
      <MedicationPage
        today="MONTAG, 7. JUNI"
        setActivePage={setActivePage}
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
        selectedDay={new Date('2021-06-07T10:36:41.617Z')}
      />
    )

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)

    userEvent.click(buttons[2])
    expect(setActivePage).toHaveBeenCalledWith('form')
  })
})
