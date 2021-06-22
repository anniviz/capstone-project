import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MedicationPage from './MedicationPage'

describe('MedicationPage', () => {
  it('renders Header with date, buttons and a List of MedicationGroups', () => {
    render(
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
        setActivePage={jest.fn()}
        deleteSingleMedication={jest.fn()}
        setMedicationToEditId={jest.fn()}
        selectedDay={new Date('2021-06-07T10:36:41.617Z')}
        setSelectedDay={jest.fn()}
        setCopyToDay={jest.fn()}
        saveCopy={jest.fn()}
        toggleMedicationCheck={jest.fn()}
      />
    )

    const header = screen.getByRole('heading')
    expect(header).toBeInTheDocument()

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(5)

    const MedGroups = screen.getAllByRole('list')
    expect(MedGroups).toHaveLength(2)

    const allMeds = screen.getAllByRole('listitem')
    expect(allMeds).toHaveLength(4)
  })
  it('sets activePage to form when AddButton is clicked', () => {
    const setActivePage = jest.fn()
    render(
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
        setActivePage={setActivePage}
        deleteSingleMedication={jest.fn()}
        setMedicationToEditId={jest.fn()}
        selectedDay={new Date('2021-06-07T10:36:41.617Z')}
        setSelectedDay={jest.fn()}
        setCopyToDay={jest.fn()}
        saveCopy={jest.fn()}
        toggleMedicationCheck={jest.fn()}
      />
    )

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(5)

    userEvent.click(buttons[buttons.length - 1])
    expect(setActivePage).toHaveBeenCalledWith('form')
  })

  it('reders a calendar when calendar is clicked', () => {
    render(
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
        setActivePage={jest.fn()}
        deleteSingleMedication={jest.fn()}
        setMedicationToEditId={jest.fn()}
        selectedDay={new Date('2021-06-07T10:36:41.617Z')}
        setSelectedDay={jest.fn()}
        setCopyToDay={jest.fn()}
        saveCopy={jest.fn()}
        toggleMedicationCheck={jest.fn()}
      />
    )

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(5)

    userEvent.click(buttons[0])
    const calendar = screen.getByRole('row', {
      name: 'Montag Dienstag Mittwoch Donnerstag Freitag Samstag Sonntag',
    })
    expect(calendar).toBeInTheDocument()
  })
})
