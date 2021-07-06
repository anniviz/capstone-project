import React from 'react'
import ObservationPage from './ObservationPage'

export default {
  title: 'pages/Observation',
  component: ObservationPage,
  argTypes: {
    editMode: { type: 'boolean' },
    showCalendar: { type: 'boolean' },
    copyMode: { type: 'boolean' },
  },
}

export const Default = args => <ObservationPage {...args} />
Default.args = {
  observations: [
    { id: '1', time: '8:00', name: 'Blutdruck', value: '94/50' },
    { id: '2', time: '8:00', name: 'Temperatur', value: '36,5' },
    { id: '3', time: '8:00', name: 'Gewicht', value: '22,5' },
    { id: '4', time: '10:00', name: 'FEV1', value: '1,11' },
  ],
}
