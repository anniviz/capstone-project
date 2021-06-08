import { render, screen } from '@testing-library/react'
import MedicationPage from './MedicationPage'

describe('MedicationPage', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date('2021-06-07T10:36:41.617Z'))
  })
  it('renders Header with date, TextButton and a List of MedicationGroups', () => {
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
      />
    )

    const header = screen.getByRole('heading')
    expect(header).toHaveTextContent('MONTAG, 7. Juni')

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Hinzufügen')

    const MedGoups = screen.getAllByRole('list')
    expect(MedGoups).toHaveLength(2)

    const allMeds = screen.getAllByRole('listitem')
    expect(allMeds).toHaveLength(4)
  })
})
