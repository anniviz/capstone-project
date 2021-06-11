import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { v4 as uuidv4 } from 'uuid'
import Button from '../components/Button'

FormPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  medicationToEdit: PropTypes.shape({
    id: PropTypes.node,
    time: PropTypes.node,
    meds: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.node, medName: PropTypes.string })
    ),
  }),
  setMedicationToEdit: PropTypes.func,
}

export default function FormPage({
  onSubmit,
  onNavigate,
  setActivePage,
  medicationToEdit,
  setMedicationToEdit,
}) {
  const [isDisabled, setIsDisabled] = useState(true)
  const [medGroupInputs, setMedGroupInputs] = useState({ time: '', meds: '' })
  const [isTimeValid, setIsTimeValid] = useState(true)

  useEffect(() => {
    if (medicationToEdit.meds) {
      const medsArray = medicationToEdit.meds.map(med => med.medName)
      setMedGroupInputs({
        time: medicationToEdit.time,
        meds: medsArray.join('\n'),
      })
    }
  }, [])

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
          value={medGroupInputs.time}
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
          value={medGroupInputs.meds}
        />
      </Label>
      <Grid>
        <Button onClick={() => onNavigate('medication')} type="button">
          zurück
        </Button>
        <Button disabled={isDisabled}>speichern</Button>
      </Grid>
    </FormWrapper>
  )

  function handleSubmit(event) {
    event.preventDefault()
    if (isDisabled) return
    const form = event.target
    const { time, meds } = form.elements
    if (!validateTime(time.value)) {
      setIsTimeValid(false)
      time.focus()
      return
    }
    const medsArrayWithId = meds.value
      .replace(/^\s*\n/gm)
      .split('\n')
      .map(medName => ({ id: uuidv4(), medName: medName }))

    if (medicationToEdit.meds) {
      onSubmit({
        id: medicationToEdit.id,
        time: time.value,
        meds: medsArrayWithId,
      })
    } else {
      onSubmit({ id: uuidv4(), time: time.value, meds: medsArrayWithId })
    }
    setMedicationToEdit([])
    setActivePage('medication')
  }

  function handleChange(event) {
    const { name, value } = event.target
    setMedGroupInputs({ ...medGroupInputs, [name]: value })
  }

  function validateTime(time) {
    const timeFormat = /^([0-9]|[0-1][0-9]|2[0-3]):([0-5][0-9])$/

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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100vh;
  padding: 12px;
  gap: 20px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  height: ${props => props.timeField && '60px'};
  gap: 4px;
`

const Input = styled.input`
  padding: 4px;
  border-color: ${props => props.isTimeValid || 'red'};
  border-radius: 4px;
`

const Textarea = styled.textarea`
  padding: 4px;
  border-radius: 4px;
  overflow: auto;
  font-size: 1.1em;
  line-height: 1.5em;
  resize: none;
`

const Grid = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const Warning = styled.p`
  display: ${props => (props.isTimeValid ? 'none' : 'block')};
  color: red;
  font-size: 0.8em;
`
