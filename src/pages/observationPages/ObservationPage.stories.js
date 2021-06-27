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
Default.args = {}
