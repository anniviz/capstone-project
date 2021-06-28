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
  observationTypes: [
    { name: 'Größe', type: 'size', unit: 'cm' },
    { name: 'Gewicht', type: 'weight', unit: 'kg' },
    { name: 'Temperatur', type: 'temperature', unit: '°C' },
    { name: 'Blutdruck', type: 'bloodpressure', unit: 'mmHg' },
    { name: 'FEV1', type: 'fev1', unit: 'l/s' },
    { name: 'Blutzucker', type: 'bloodsugar', unit: 'mmol/l' },
    { name: 'Urin', type: 'urin', unit: '' },
    { name: 'Notizen', type: 'notes', unit: '' },
  ],
}
