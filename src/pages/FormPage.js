import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { v4 as uuidv4 } from 'uuid'
import Button from '../components/Button'

Form.propTypes = {
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

export default function Form({
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
      .split('\n')
      .map(medName => ({ id: uuidv4(), medName: medName }))

    if (medicationToEdit === {}) {
      onSubmit({ id: uuidv4(), time: time.value, meds: medsArrayWithId })
    } else {
      onSubmit({
        id: medicationToEdit.id,
        time: time.value,
        meds: medsArrayWithId,
      })
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
  resize: none;
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
