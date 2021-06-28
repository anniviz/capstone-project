import { render, screen } from '@testing-library/react'
import RadioButton from './RadioButton'

describe('RadioButton', () => {
  it('renders a radio bbutton', () => {
    render(
      <RadioButton
        label={'neg.'}
        id={'neg'}
        value={'neg.'}
        handleChange={jest.fn()}
        isSelected={true}
      />
    )

    const radio = screen.getByRole('radio')
    expect(radio).toBeInTheDocument()
  })
})
