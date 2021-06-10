import PropTypes from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components/macro'
import Header from '../components/Header'
import MedicationGroup from '../components/MedicationGroup'
import TextButton from '../components/TextButton'

MedicationPage.propTypes = {
  medications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      time: PropTypes.node,
      meds: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.node, medName: PropTypes.string })
      ),
    })
  ),
  setActivePage: PropTypes.func,
  setMedications: PropTypes.func,
}

export default function MedicationPage({
  medications,
  setActivePage,
  setMedications,
}) {
  const currentDate = new Date()
  const sortedMedications = medications.slice().sort(function (a, b) {
    if (convertToMinutes(a.time) > convertToMinutes(b.time)) return 1
    if (convertToMinutes(a.time) < convertToMinutes(b.time)) return -1
    return 0
  })

  const [editMode, setEditMode] = useState(false)

  return (
    <Grid>
      <Header>{formatDate(currentDate)}</Header>
      {editMode === false ? (
        <TextButtonWrapper>
          <TextButton onClick={() => setActivePage('form')}>
            Hinzufügen
          </TextButton>
          <TextButton onClick={() => setEditMode(true)}>Beareiten</TextButton>
        </TextButtonWrapper>
      ) : (
        <TextButton aligne="right" onClick={() => setEditMode(false)}>
          Abbrechen
        </TextButton>
      )}
      <Flexbox>
        {sortedMedications.map(({ id, time, meds }) => (
          <MedicationGroup
            key={id}
            id={id}
            time={time}
            meds={meds}
            handleDeleteClick={handleDeleteClick}
          />
        ))}
      </Flexbox>
    </Grid>
  )

  function convertToMinutes(time) {
    const timeArray = time.split(':')
    const minutes = timeArray[0] * 60 + timeArray[1]
    return Number(minutes)
  }

  function formatDate(date) {
    const options = { weekday: 'long', month: 'long', day: 'numeric' }
    const formatedDate = date.toLocaleDateString('de-DE', options).toUpperCase()

    return formatedDate
  }

  function handleDeleteClick(id) {
    const index = medications.findIndex(medication => medication.id === id)
    setMedications([
      ...medications.slice(0, index),
      ...medications.slice(index + 1),
    ])
  }
}
const Grid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 30px 1fr;
`

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 16px;
  overflow-y: auto;
`

const TextButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
