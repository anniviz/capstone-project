import { useState } from 'react'
import styled from 'styled-components/macro'
import Header from './components/Header'
import MedicationGroup from './components/MedicationGroup'
import Form from './pages/FormPage'

export default function App() {
  const currentDate = new Date()

  const [medications, setMedications] = useState([])
  const [activePage, setActivePage] = useState('form')

  return (
    <>
      {activePage === 'medication' && (
        <Grid>
          <Header>{formatDate(currentDate)}</Header>
          <Flexbox>
            {medications.map(({ id, time, meds }) => (
              <MedicationGroup key={id} time={time} meds={meds} />
            ))}
          </Flexbox>
        </Grid>
      )}
      {activePage === 'form' && (
        <Form
          onClick={handleActivePage}
          setActivePage={setActivePage}
          onSubmit={handleSubmit}
        />
      )}
    </>
  )

  function handleActivePage(page) {
    setActivePage(page)
  }

  function handleSubmit(newMedication) {
    setMedications([newMedication, ...medications])
  }

  function formatDate(date) {
    const days = [
      'Sonntag',
      'Montag',
      'Dienstag',
      'Mittwoch',
      'Donnerstag',
      'Freitag',
      'Samstag',
    ]

    const months = [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember',
    ]

    const formatedDate = `${days[
      date.getDay()
    ].toUpperCase()}, ${date.getDate()}. ${months[date.getMonth()]}`

    return formatedDate
  }
}

const Grid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr;
`

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 16px;
  overflow-y: auto;
`
