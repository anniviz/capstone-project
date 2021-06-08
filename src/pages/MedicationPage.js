import styled from 'styled-components'
import Header from '../components/Header'
import MedicationGroup from '../components/MedicationGroup'
import TextButton from '../components/TextButton'

export default function MedicationPage({ medications, setActivePage }) {
  const currentDate = new Date()

  return (
    <Grid>
      <Header>{formatDate(currentDate)}</Header>
      <TextButton aligne="left" onClick={() => setActivePage('form')}>
        Hinzufügen
      </TextButton>
      <Flexbox>
        {medications.map(({ id, time, meds }) => (
          <MedicationGroup key={id} time={time} meds={meds} />
        ))}
      </Flexbox>
    </Grid>
  )

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
  grid-template-rows: 60px 30px 1fr;
`

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 16px;
  overflow-y: auto;
`
