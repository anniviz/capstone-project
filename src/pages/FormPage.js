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

  useEffect(() => {
    validateForm()
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
      <Label>
        Uhrzeit:
        <Input name="time" placeholder="8:00" onChange={handleChange} />
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
    const time = form.elements.time
    const meds = form.elements.meds
    const medsArrayWithId = meds.value
      .split('\n')
      .map(medName => ({ id: uuidv4(), medName: medName }))

    onSubmit({ id: uuidv4(), time: time.value, meds: medsArrayWithId })
    setActivePage('medication')
  }

  function handleChange(event) {
    const { name, value } = event.target
    setMedGroupInputs({ ...medGroupInputs, [name]: value })
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
  display: grid;
  gap: 4px;
`

const Input = styled.input`
  padding: 4px;
`

const Textarea = styled.textarea`
  overflow: auto;
  padding: 4px;
  font-size: 1.1em;
  line-height: 1.5em;
`

const Grid = styled.div`
  display: flex;
  justify-content: space-evenly;
`
