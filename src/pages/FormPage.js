import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { v4 as uuidv4 } from 'uuid'
import Button from '../components/buttons/Button'
import Header from '../components/Header'
import useFormValidation from '../hooks/useFormValidation'
import useMedicationGroup from '../hooks/useMedicationGroup'

FormPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
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
  medicationToEditId: PropTypes.string,
  setMedicationToEditId: PropTypes.func.isRequired,
}

export default function FormPage({
  onSubmit,
  medications,
  selectedDay,
  medicationToEditId,
  setMedicationToEditId,
}) {
  const { medGroupInputs, setMedGroupInputs } = useMedicationGroup(
    medications,
    medicationToEditId
  )

  const {
    isTimeValid,
    isDisabled,
    setIsTimeValid,
    validateTime,
  } = useFormValidation(medGroupInputs)

  const { history } = useHistory()

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
          <TextareaWithPlaceholderWrapper>
            <Textarea
              name="meds"
              rows="10"
              onChange={handleChange}
              value={medGroupInputs.meds}
            />
            {medGroupInputs.meds === '' && (
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
    history('/medications')
    // setActivePage('medication')
  }

  function handleBackClick() {
    setMedicationToEditId(null)
    history('/medications')
  }

  function handleChange(event) {
    const { name, value } = event.target
    setMedGroupInputs({ ...medGroupInputs, [name]: value })
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
