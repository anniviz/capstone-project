import React from 'react'

export default function App() {
  const medication = [
    {
      time: '8:00',
      meds: [
        { id: 1, medName: 'Spironolacton' },
        { id: 2, medName: 'Enalapril' },
        { id: 3, medName: 'Prednisolon' },
      ],
    },
    { time: '9:00', meds: [{ id: 1, medName: 'Tacrolimus' }] },
    {
      time: '13:00',
      meds: [
        { id: 1, medName: 'Magnesium' },
        { id: 2, medName: 'MMF' },
      ],
    },
    {
      time: '18:00',
      meds: [
        { id: 1, medName: 'Magnesium' },
        { id: 2, medName: 'MMF' },
      ],
    },
    { time: '21:00', meds: [{ id: 1, medName: 'Tacrolimus' }] },
  ]

  return <div></div>
}
