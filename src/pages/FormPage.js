import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import { v4 as uuidv4 } from 'uuid'

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
}

export default function Form({ onSubmit, onClick, setActivePage }) {
  const [isDisabled, setIsDisabled] = useState(true)
  const [medGroupInputs, setMedGroupInputs] = useState({ time: '', meds: '' })
  const [isTimeValid, setIsTimeValid] = useState(true)

  useEffect(() => {
    validateForm()
    setIsTimeValid(true)
  }, [medGroupInputs])

  const placeholderText = `ASS (50mg)
Magnesium (80mg)
Metoprolol (23,75mg)
`

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
        />
        <Warning isTimeValid={isTimeValid}>
          Bitte gib eine Uhrzeit im Format h:mm oder hh:mm an!
        </Warning>
      </Label>
      <Label>
        Medikamente:
        <Textarea
          name="meds"
          rows="15"
          placeholder={placeholderText}
          onChange={handleChange}
        />
      </Label>
      <Grid>
        <Button onClick={() => onClick('medication')} isActive type="button">
          zurück
        </Button>
        <Button disabled={isDisabled}>erstellen</Button>
      </Grid>
    </FormWrapper>
  )

  function handleSubmit(event) {
    event.preventDefault()
    if (isDisabled) return
    const form = event.target
    const time = form.elements.time.value
    if (!validateTime(time)) {
      setIsTimeValid(false)
      form.elements.time.focus()
      return
    }
    const meds = form.elements.meds.value
    const medsArrayWithId = meds
      .split('\n')
      .map(medName => ({ id: uuidv4(), medName: medName }))

    onSubmit({ id: uuidv4(), time: time, meds: medsArrayWithId })
    setActivePage('medication')
  }

  function handleChange(event) {
    const { name, value } = event.target
    setMedGroupInputs({ ...medGroupInputs, [name]: value })
  }

  function validateTime(time) {
    const timeFormat = /^\d{1,2}:\d{2}$/

    return time.match(timeFormat) ? true : false
  }

  function validateForm() {
    setIsDisabled(
      medGroupInputs.time.trim().length === 0 ||
        medGroupInputs.meds.trim().length === 0
    )
  }
}

const FormWrapper = styled.form`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 20px;
  padding: 12px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: ${props => props.timeField && '60px'};
`

const Input = styled.input`
  padding: 4px;
  border-color: ${props => props.isTimeValid || 'red'};
  border-radius: 4px;
`

const Textarea = styled.textarea`
  overflow: auto;
  padding: 4px;
  font-size: 1.1em;
  line-height: 1.5em;
  border-radius: 4px;
`

const Grid = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const Warning = styled.p`
  color: red;
  font-size: 0.8em;
  display: ${props => (props.isTimeValid ? 'none' : 'block')};
`
