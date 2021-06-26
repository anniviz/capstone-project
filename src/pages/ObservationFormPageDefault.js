import PropTypes from 'prop-types'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { v4 as uuidv4 } from 'uuid'
import Button from '../components/buttons/Button'
import useFormValidation from '../hooks/useFormValidation'

export default function ObservationFormPageDefault({ onSubmit }) {
  let history = useHistory()
  const today = new Date()

  const [inputs, setInputs] = useState({
    time: `${today.getUTCHours()}:${today.getUTCMinutes()}`,
    inputValue: '',
  })

  const {
    isTimeValid,
    isDisabled,
    setIsTimeValid,
    validateTime,
  } = useFormValidation(inputs)

  return (
    <FormWrapper
      onSubmit={handleSubmit}
      aria-label="dynamisch erstellen"
      role="form"
    >
      <Label>
        Dynamisch:
        <InputWrapper>
          <Input
            name="inputValue"
            onChange={handleChange}
            value={inputs.inputValue}
            autoComplete="off"
          />
          <Unit>dynamisch</Unit>
        </InputWrapper>
      </Label>
      <Label timeField>
        Uhrzeit:
        <InputWrapper>
          <InputTime
            name="time"
            onChange={handleChange}
            isTimeValid={isTimeValid}
            value={inputs.time}
            autoComplete="off"
          />
          <Unit>Uhr</Unit>
        </InputWrapper>
        <Warning isTimeValid={isTimeValid}>
          Bitte gib eine Uhrzeit im Format h:mm oder hh:mm an!
        </Warning>
      </Label>
      <Flexbox>
        <Button onClick={handleBackClick} type="button">
          zurück
        </Button>
        <Button disabled={isDisabled}>speichern</Button>
      </Flexbox>
    </FormWrapper>
  )

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const { time, inputValue } = form.elements
    if (!validateTime(time.value)) {
      setIsTimeValid(false)
      time.focus()
      return
    }

    history.push('/observations')
  }

  function handleChange(event) {
    const { name, value } = event.target
    setInputs({ ...inputs, [name]: value })
  }

  function handleBackClick() {
    history.push('/observations/form')
  }
}

const FormWrapper = styled.form`
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 32px;
  margin: 40px 0;
  padding: 12px;
  align-items: end;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  height: ${props => props.timeField && '92px'};
  color: var(--color-primary);
  font-weight: bold;
  font-size: 1.1em;
  gap: 4px;
`

const InputWrapper = styled.div``

const Input = styled.input`
  height: 40px;
  padding: 4px;
  width: 100px;
  border: 1px solid var(--color-secondary);
  border-radius: 16px;
  color: var(--color-primary);
  font-size: 0.9em;
  box-shadow: 34px 34px 89px var(--color-shadow-13);
  text-align: end;

  &::placeholder {
    color: var(--color-primary);
    opacity: 0.5;
  }
`

const InputTime = styled(Input)`
  border-color: ${props => props.isTimeValid || 'var(--color-warning)'};
`

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
`

const Warning = styled.p`
  display: ${props => (props.isTimeValid ? 'none' : 'block')};
  margin: 0;
  color: var(--color-warning);
  font-weight: 300;
  font-size: 0.7em;
`

const Unit = styled.span`
  font-size: 0.8em;
  margin-left: 12px;
`
