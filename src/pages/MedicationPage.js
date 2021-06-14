import PropTypes from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components/macro'
import SmallButton from '../components/buttons/SmallButton'
import AddButton from '../components/buttons/AddButton'
import Header from '../components/Header'
import MedicationGroup from '../components/MedicationGroup'
import backIcon from '../icons/back.svg'
import editRectangleIcon from '../icons/edit_rectangle.svg'

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
  setMedicationToEdit: PropTypes.func,
}

export default function MedicationPage({
  medications,
  setActivePage,
  setMedications,
  setMedicationToEdit,
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
      <ButtonWrapper>
        {editMode === false ? (
          <SmallButton onClick={() => setEditMode(true)}>
            <img src={editRectangleIcon} alt="" height="20px" />
          </SmallButton>
        ) : (
          <SmallButton align="right" onClick={() => setEditMode(false)}>
            <img src={backIcon} alt="" height="20px" />
          </SmallButton>
        )}
      </ButtonWrapper>
      <Flexbox>
        {sortedMedications.map(({ id, time, meds }) => (
          <MedicationGroup
            key={id}
            id={id}
            time={time}
            meds={meds}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
            editMode={editMode}
          />
        ))}
      </Flexbox>
      <AddButton onClick={() => setActivePage('form')} />
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

  function handleEditClick(id) {
    const index = medications.findIndex(medication => medication.id === id)
    setMedicationToEdit(medications[index])
    setActivePage('form')
  }
}
const Grid = styled.div`
  position: relative;
  display: grid;
  height: 100vh;
  grid-template-rows: 80px 30px 1fr;
`

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  overflow-y: auto;
  gap: 20px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  padding: 0 26px 0 16px;
`

const AddButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 1);
  /* align-items: end; */
  /* padding: 0 26px 0 16px; */
`
