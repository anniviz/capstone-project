import PropTypes from 'prop-types'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { v4 as uuidv4 } from 'uuid'
import Button from '../../components/buttons/Button'
import RadioButton from '../../components/RadioButton'
import useFormValidation from '../../hooks/useFormValidation'
import getCurrentTime from '../../utils/getCurrentTime'

ObservationFormPageUrin.propTypes = {
  observation: PropTypes.shape({
    id: PropTypes.string,
    time: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    observationValue: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default function ObservationFormPageUrin({ observation, onSubmit }) {
  const history = useHistory()

  const [inputs, setInputs] = useState({
    time: observation?.time || getCurrentTime(),
    inputValue: observation?.observationValue || 'neg.\nneg.',
  })
  const inputValueArray = inputs.inputValue.split('\n')
  const leukos = inputValueArray[0]
  const nitrit = inputValueArray[1]

  const {
    isTimeValid,
    setIsTimeValid,
    validateTime,
    isDisabled,
  } = useFormValidation(inputs)

  const leukoArray = ['neg.', '1+', '2+', '3+']
  const nitritArray = ['neg.', 'pos.']

  return (
    <FormWrapper
      onSubmit={handleSubmit}
      aria-label="Beobachtung von Urin erstellen"
      role="form"
    >
      <div>
        <Title>Urin</Title>
        <RadioWrapper>
          <Fieldset>
            <Legend>Leukozyten:</Legend>
            {leukoArray.map(element => (
              <RadioButton
                label={element}
                id={element}
                value={element}
                name="leukos"
                handleChange={handleLeukosChange}
                isSelected={leukos === element}
              />
            ))}
          </Fieldset>
          <Fieldset>
            <Legend>Nitrit:</Legend>
            {nitritArray.map(element => (
              <RadioButton
                label={element}
                id={element + 'Nit'}
                value={element}
                name="nitrit"
                handleChange={handleNitritChange}
                isSelected={nitrit === element}
              />
            ))}
          </Fieldset>
        </RadioWrapper>
      </div>
      <Label timeField>
        Uhrzeit:
        <div>
          <InputTime
            name="time"
            onChange={handleTimeChange}
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

  function handleLeukosChange(event) {
    const { value } = event.target
    setInputs({ ...inputs, inputValue: `${value}\n${nitrit}` })
  }

  function handleNitritChange(event) {
    const { value } = event.target
    setInputs({ ...inputs, inputValue: `${leukos}\n${value}` })
  }

  function handleTimeChange(event) {
    const { value } = event.target
    setInputs({ ...inputs, time: value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const { time, inputValue } = inputs

    if (!validateTime(time)) {
      setIsTimeValid(false)
      time.focus()
      return
    }

    if (observation.id) {
      onSubmit({
        id: observation.id,
        time: time,
        type: 'urine',
        name: 'Urin',
        observationValue: inputValue,
      })
    } else {
      onSubmit({
        id: uuidv4(),
        time: time,
        type: 'urine',
        name: 'Urin',
        observationValue: inputValue,
      })
    }

    history.push('/observations')
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

const RadioWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: none;
`

const Legend = styled.div`
  color: var(--color-primary);
`

const Title = styled.h3`
  color: var(--color-primary);
  font-weight: bold;
  font-size: 1.1em;
  margin: 0;
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
