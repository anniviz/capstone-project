import React from 'react'
import MedicationPage from './MedicationPage'

export default {
  title: 'pages/Medication',
  component: MedicationPage,
  argTypes: { setActivePage: { action: 'setActivePage' } },
}

export const Default = args => <MedicationPage {...args} />
Default.args = {
  medications: [
    {
      id: '01234',
      time: '8:00',
      meds: [
        { id: '01234', medName: 'ASS' },
        { id: '01235', medName: 'Metoprolol' },
        { id: '01236', medName: 'Magnesium' },
      ],
    },
    {
      id: '01235',
      time: '9:00',
      meds: [{ id: '01234', medName: 'Tacrolimus' }],
    },
  ],
}
