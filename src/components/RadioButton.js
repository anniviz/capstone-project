import styled from 'styled-components/macro'

export default function RadioButton({
  label,
  id,
  value,
  name,
  handleChange,
  isSelected,
}) {
  return (
    <>
      <RadioInput
        type="radio"
        id={id}
        value={value}
        name={name}
        onChange={handleChange}
        checked={isSelected}
      />
      <RadioLabel htmlFor={id}>{label}</RadioLabel>
    </>
  )
}

const RadioLabel = styled.label`
  color: var(--color-primary);
  font-weight: 400;
  position: relative;
  margin-right: 16px;
  padding-left: 24px;
  cursor: pointer;
  margin-right: 15px;
  line-height: 32px;

  /* this creates the outer circle for faux radio button */
  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    left: 0;
    top: 50%;
    margin-top: -8px;
    border: 1px solid var(--color-tertiary);
    border-radius: 50%;
  }

  /* this creates the inner circle for active faux radio button */
  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    top: 50%;
    left: 8px;
    margin-top: 0;
    background: var(--color-tertiary);
    border-radius: 50%;
    transition: 0.2s ease-in-out;
  }
`

const RadioInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  position: relative;
  top: 4px;

  :checked + label {
    &:after {
      height: 12px;
      width: 12px;
      margin-top: -5px;
      left: 3px;
    }
  }
`
