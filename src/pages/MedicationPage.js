import styled from 'styled-components'
import Header from '../tempname/Header'
import MedicationGroup from '../tempname/MedicationGroup'
import PropTypes from 'prop-types'
import TextButton from '../tempname/TextButton'

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
}

export default function MedicationPage({ medications, setActivePage }) {
  const currentDate = new Date()
  const sortedMedications = medications.slice().sort(function (a, b) {
    if (convertToMinutes(a.time) > convertToMinutes(b.time)) return 1
    if (convertToMinutes(a.time) < convertToMinutes(b.time)) return -1
    return 0
  })

  console.log(sortedMedications)
  console.log(Date.parse('8:00'))

  return (
    <Grid>
      <Header>{formatDate(currentDate)}</Header>
      <TextButton aligne="left" onClick={() => setActivePage('form')}>
        Hinzufügen
      </TextButton>
      <Flexbox>
        {sortedMedications.map(({ id, time, meds }) => (
          <MedicationGroup key={id} time={time} meds={meds} />
        ))}
      </Flexbox>
    </Grid>
  )

  function convertToMinutes(time) {
    const timeArray = time.split(':')
    const minutes = timeArray[0] * 60 + timeArray[1]
    return minutes
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
  grid-template-rows: 60px 30px 1fr;
`

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 16px;
  overflow-y: auto;
`
