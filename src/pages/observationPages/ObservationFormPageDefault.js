import PropTypes from 'prop-types'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { v4 as uuidv4 } from 'uuid'
import Button from '../../components/buttons/Button'
import useFormValidation from '../../hooks/useFormValidation'
import getObservationTypes from '../../services/getObservationTypes'
import getCurrentTime from '../../utils/getCurrentTime'

ObservationFormPageDefault.propTypes = {
  observation: PropTypes.shape({
    id: PropTypes.string,
    time: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    observationValue: PropTypes.string,
  }).isRequired,
  observationType: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  setSelectedObservationId: PropTypes.func.isRequired,
}

export default function ObservationFormPageDefault({
  observation,
  observationType,
  onSubmit,
  setSelectedObservationId,
}) {
  const observationTypes = getObservationTypes()

  const history = useHistory()
  const { name, type, unit, format } = observationTypes.find(
    element => element.type === observationType
  )

  const [inputs, setInputs] = useState({
    time: observation?.time || getCurrentTime(),
    inputValue: observation?.observationValue || '',
  })

  const {
    isTimeValid,
    isDisabled,
    setIsTimeValid,
    validateTime,
    validateTypeInput,
    isObservationInputValid,
    setIsObservationInputValid,
  } = useFormValidation(inputs)

  const AriaLabelForm = `Beobachtung von ${name} erstellen`

  return (
    <FormWrapper onSubmit={handleSubmit} aria-label={AriaLabelForm} role="form">
      <Label>
        {name}:
        <div>
          <Input
            name="inputValue"
            onChange={handleChange}
            isInputValid={isObservationInputValid}
            value={inputs.inputValue}
            autoComplete="off"
          />
          <Unit>{unit}</Unit>
        </div>
        <Warning isInputValid={isObservationInputValid}>
          {name} bitte in einem Format wie "{format}" angeben!
        </Warning>
      </Label>
      <Label>
        Uhrzeit:
        <div>
          <Input
            name="time"
            onChange={handleChange}
            isInputValid={isTimeValid}
            value={inputs.time}
            autoComplete="off"
          />
          <Unit>Uhr</Unit>
        </div>
        <Warning isInputValid={isTimeValid}>
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

    if (!validateTypeInput(inputValue.value, type)) {
      setIsObservationInputValid(false)
      inputValue.focus()
      return
    }
    if (!validateTime(time.value)) {
      setIsTimeValid(false)
      time.focus()
      return
    }

    if (observation.id) {
      onSubmit({
        id: observation.id,
        time: time.value,
        type,
        name,
        observationValue: inputValue.value,
      })
    } else {
      onSubmit({
        id: uuidv4(),
        time: time.value,
        type,
        name,
        observationValue: inputValue.value,
      })
    }

    history.push('/observations')
  }

  function handleChange(event) {
    const { name, value } = event.target
    setInputs({ ...inputs, [name]: value })
  }

  function handleBackClick() {
    setSelectedObservationId(null)
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
  height: 92px;
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
  border-color: ${props => props.isInputValid || 'var(--color-warning)'};
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

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
`

const Warning = styled.p`
  display: ${props => (props.isInputValid ? 'none' : 'block')};
  margin: 0;
  color: var(--color-warning);
  font-weight: 300;
  font-size: 0.7em;
`

const Unit = styled.span`
  font-size: 0.8em;
  margin-left: 12px;
`
