import 'react-day-picker/lib/style.css'
import styled from 'styled-components/macro'
import ObservationGroup from '../components/ObservationGroup'

export default function ObservationPage() {
  const observations = [
    { id: 1, time: '8:00', name: 'Blutdruck', value: '94/50' },
    { id: 2, time: '8:00', name: 'Temperatur', value: '36,5' },
    { id: 3, time: '8:00', name: 'Gewicht', value: '22,5' },
    { id: 3, time: '10:00', name: 'FEV1', value: '1,11' },
  ]

  return (
    <Flexbox>
      {observations.map(({ id, time, name, value }) => (
        <ObservationGroup
          key={id}
          id={id}
          time={time}
          name={name}
          value={value}
        />
      ))}
    </Flexbox>
  )
}

const Flexbox = styled.main`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  overflow-y: auto;
  gap: 20px;
`
