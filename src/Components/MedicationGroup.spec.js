import { render, screen } from '@testing-library/react'
import MedicationGroup from './MedicationGroup'

describe('MedicationGroup', () => {
  it('renders the date and the medication list', () => {
    render(
      <MedicationGroup
        time={'8:00'}
        meds={[
          { id: 1, medName: 'Spironolacton' },
          { id: 2, medName: 'Enalapril' },
          { id: 3, medName: 'Prednisolon' },
        ]}
      />
    )

    const time = screen.getByRole('time')
    const medList = screen.getByRole('list')
    const meds = screen.getAllByRole('listitem')
    expect(time).toBeInTheDocument()
    expect(medList).toBeInTheDocument()
    expect(meds).toHaveLength(3)
  })
})