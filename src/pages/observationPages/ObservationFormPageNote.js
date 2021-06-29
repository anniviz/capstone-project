import PropTypes from 'prop-types'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { v4 as uuidv4 } from 'uuid'
import Button from '../../components/buttons/Button'
import useFormValidation from '../../hooks/useFormValidation'
import getCurrentTime from '../../utils/getCurrentTime'

ObservationFormPageNote.propTypes = {
  observation: PropTypes.shape({
    id: PropTypes.string,
    time: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    observationValue: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default function ObservationFormPageNote({ observation, onSubmit }) {
  const history = useHistory()

  const [inputs, setInputs] = useState({
    time: observation?.time || getCurrentTime(),
    inputValue: observation?.observationValue || '',
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
      aria-label="Notiz erstellen"
      role="form"
    >
      <Label>
        Notizen:
        <Textarea
          name="inputValue"
          rows="10"
          onChange={handleChange}
          value={inputs.inputValue}
          autoComplete="off"
        />
      </Label>
      <Label timeField>
        Uhrzeit:
        <div>
          <InputTime
            name="time"
            onChange={handleChange}
            isTimeValid={isTimeValid}
            value={inputs.time}
            autoComplete="off"
          />
          <Unit>Uhr</Unit>
        </div>
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
    if (isDisabled) return

    const form = event.target
    const { time, inputValue } = form.elements

    if (!validateTime(time.value)) {
      setIsTimeValid(false)
      time.focus()
      return
    }

    if (observation.id) {
      onSubmit({
        id: observation.id,
        time: time.value,
        type: 'notes',
        name: 'Notizen',
        observationValue: inputValue.value.replace(/^\s*\n/gm, ''),
      })
    } else {
      onSubmit({
        id: uuidv4(),
        time: time.value,
        type: 'notes',
        name: 'Notizen',
        observationValue: inputValue.value.replace(/^\s*\n/gm, ''),
      })
    }

    history.push('/observations')
  }

  function handleChange(event) {
    const { name, value } = event.target
    setInputs({ ...inputs, [name]: value })
  }

  function handleBackClick() {
    history.goBack()
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 4px;
  border: 1px solid var(--color-secondary);
  border-radius: 16px;
  overflow: auto;
  color: var(--color-primary);
  font-size: 1em;
  line-height: 1.5em;
  resize: none;
  box-shadow: 34px 34px 89px var(--color-shadow-13);
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
