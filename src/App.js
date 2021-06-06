import React from 'react'
import styled from 'styled-components'
import Header from './Components/Header'
import MedicationGroup from './Components/MedicationGroup'

export default function App() {
  const medication = [
    {
      id: 1,
      time: '8:00',
      meds: [
        { id: 1, medName: 'Spironolacton' },
        { id: 2, medName: 'Enalapril' },
        { id: 3, medName: 'Prednisolon' },
        { id: 4, medName: 'MMF' },
        { id: 5, medName: 'Magnesium' },
        { id: 6, medName: 'ASS' },
      ],
    },
    { id: 2, time: '9:00', meds: [{ id: 1, medName: 'Tacrolimus' }] },
    {
      id: 3,
      time: '13:00',
      meds: [
        { id: 1, medName: 'Magnesium' },
        { id: 2, medName: 'MMF' },
      ],
    },
    {
      id: 4,
      time: '18:00',
      meds: [
        { id: 1, medName: 'Magnesium' },
        { id: 2, medName: 'MMF' },
        { id: 3, medName: 'Enalapril' },
        { id: 4, medName: 'Calcium' },
      ],
    },
    { id: 5, time: '21:00', meds: [{ id: 1, medName: 'Tacrolimus' }] },
  ]

  return (
    <Grid>
      <Header>Header</Header>
      <Flexbox>
        {medication.map(({ id, time, meds }) => (
          <MedicationGroup key={id} time={time} meds={meds} />
        ))}
      </Flexbox>
    </Grid>
  )
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
