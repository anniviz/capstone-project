import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
        editMode={false}
        handleDeleteClick={jest.fn()}
        handleEditClick={jest.fn()}
        handleCheckClick={jest.fn()}
      />
    )

    const time = screen.getByRole('time')
    const medList = screen.getByRole('list')
    const meds = screen.getAllByRole('listitem')
    expect(time).toBeInTheDocument()
    expect(medList).toBeInTheDocument()
    expect(meds).toHaveLength(3)
  })

  it('renders edit and delete button in edit mode', () => {
    const handleDelete = jest.fn()
    const handleEdit = jest.fn()

    render(
      <MedicationGroup
        id={'1234'}
        time={'8:00'}
        meds={[
          { id: 1, medName: 'Spironolacton' },
          { id: 2, medName: 'Enalapril' },
          { id: 3, medName: 'Prednisolon' },
        ]}
        editMode={true}
        handleDeleteClick={handleDelete}
        handleEditClick={handleEdit}
        handleCheckClick={jest.fn()}
      />
    )

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)

    userEvent.click(buttons[0])
    userEvent.click(buttons[1])

    expect(handleDelete).toHaveBeenCalledWith('1234')
    expect(handleEdit).toHaveBeenCalledWith('1234')
  })
})
