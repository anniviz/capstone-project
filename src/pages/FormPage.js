import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { v4 as uuidv4 } from 'uuid'
import Button from '../components/buttons/Button'
import Header from '../components/Header'
import useMedicationGroup from '../hooks/useMedicationGroup'

FormPage.propTypes = {
  onSubmit: PropTypes.func,
  onNavigate: PropTypes.func,
  medications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      time: PropTypes.node,
      meds: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.node, medName: PropTypes.string })
      ),
    })
  ),
  selectedDay: PropTypes.instanceOf(Date),
  setActivePage: PropTypes.func,
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
  medications,
  selectedDay,
  setActivePage,
  medicationToEditId,
  setMedicationToEditId,
}) {
  const [isDisabled, setIsDisabled] = useState(true)
  const { medGroupInputs, setMedGroupInputs } = useMedicationGroup(
    medications,
    medicationToEditId
  )
  const [isTimeValid, setIsTimeValid] = useState(true)

  useEffect(() => {
    validateForm()
    setIsTimeValid(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medGroupInputs])

  const placeholderText = `ASS (50mg)
Magnesium (80mg)
Metoprolol (23,75mg)
`

  return (
    <Grid>
      <Header selectedDay={selectedDay} />

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
            rows="10"
            placeholder={placeholderText}
            onChange={handleChange}
            value={medGroupInputs.meds}
          />
        </Label>
        <Flexbox>
          <Button onClick={handleBackClick} type="button">
            zurück
          </Button>
          <Button disabled={isDisabled}>speichern</Button>
        </Flexbox>
      </FormWrapper>
    </Grid>
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

    const index = medications.findIndex(
      medication => medication.id === medicationToEditId
    )
    if (medicationToEditId) {
      const medicationToEdit = medications[index]
      onSubmit({
        id: medicationToEdit.id,
        time: time.value,
        meds: medsArrayWithId,
      })
    } else {
      onSubmit({ id: uuidv4(), time: time.value, meds: medsArrayWithId })
    }
    setMedicationToEditId(null)
    setActivePage('medication')
  }

  function handleBackClick() {
    setMedicationToEditId(null)
    onNavigate('medication')
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

const Grid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr;
`

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
  font-size: 0.9em;
  box-shadow: 34px 34px 89px var(--color-shadow-13);
`

const Textarea = styled.textarea`
  padding: 4px;
  border: 1px solid var(--color-secondary);
  border-radius: 16px;
  overflow: auto;
  font-size: 1.1em;
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
