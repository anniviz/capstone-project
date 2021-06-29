import React from 'react'
import ObservationPickerPage from './ObservationPickerPage'

export default {
  title: 'pages/observation forms/observation picker',
  component: ObservationPickerPage,
}

export const Default = args => <ObservationPickerPage {...args} />
Default.args = {
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
