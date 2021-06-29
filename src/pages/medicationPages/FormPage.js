import PropTypes from 'prop-types'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { v4 as uuidv4 } from 'uuid'
import Button from '../../components/buttons/Button'
import useFormValidation from '../../hooks/useFormValidation'

FormPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  medication: PropTypes.shape({
    id: PropTypes.string,
    time: PropTypes.node,
    meds: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.node, medName: PropTypes.string })
    ),
  }),
  setSelectedMedicationId: PropTypes.func.isRequired,
}

export default function FormPage({
  onSubmit,
  medication,
  setSelectedMedicationId,
}) {
  const medsString = medication.meds?.map(med => med.medName).join('\n') ?? []

  const [medGroupInputs, setMedGroupInputs] = useState({
    time: medication.time,
    inputValue: medsString,
  })

  const {
    isTimeValid,
    isDisabled,
    setIsTimeValid,
    validateTime,
  } = useFormValidation(medGroupInputs)

  const history = useHistory()

  return (
    <FormWrapper
      onSubmit={handleSubmit}
      aria-label="Medikationsgruppe erstellen"
      role="form"
    >
      <Label timeField>
        Uhrzeit:
        <Input
          name="time"
          placeholder="8:00"
          onChange={handleChange}
          isTimeValid={isTimeValid}
          value={medGroupInputs.time}
          autoComplete="off"
        />
        <Warning isTimeValid={isTimeValid}>
          Bitte gib eine Uhrzeit im Format h:mm oder hh:mm an!
        </Warning>
      </Label>
      <Label>
        Medikamente:
        <TextareaWithPlaceholderWrapper>
          <Textarea
            name="inputValue"
            rows="10"
            onChange={handleChange}
            value={medGroupInputs.inputValue}
            autoComplete="off"
          />
          {medGroupInputs.inputValue === '' && (
            <Placeholder>
              ASS (50mg)
              <br /> Magnesium (80mg)
              <br /> Metoprolol (23,75mg)
            </Placeholder>
          )}
        </TextareaWithPlaceholderWrapper>
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
    const medsArrayWithId = inputValue.value
      .replace(/^\s*\n/gm, '')
      .split('\n')
      .map(medName => ({ id: uuidv4(), medName: medName }))

    if (medication.id) {
      onSubmit({
        id: medication.id,
        time: time.value,
        meds: medsArrayWithId,
      })
    } else {
      onSubmit({ id: uuidv4(), time: time.value, meds: medsArrayWithId })
    }
    history.push('/medications')
  }

  function handleBackClick() {
    setSelectedMedicationId(null)
    history.push('/medications')
  }

  function handleChange(event) {
    const { name, value } = event.target
    setMedGroupInputs({ ...medGroupInputs, [name]: value })
  }
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 12px;
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
  border: 1px solid var(--color-secondary);
  border-color: ${props => props.isTimeValid || 'var(--color-warning)'};
  border-radius: 16px;
  color: var(--color-primary);
  font-size: 0.9em;
  box-shadow: 34px 34px 89px var(--color-shadow-13);

  &::placeholder {
    color: var(--color-primary);
    opacity: 0.5;
  }
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

const TextareaWithPlaceholderWrapper = styled.div`
  position: relative;
`

const Placeholder = styled.div`
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 8px;
  font-weight: 400;
  font-size: 0.8em;
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
