import React from 'react'
import ObservationPickerPage from './ObservationPickerPage'

export default {
  title: 'pages/observation forms/observation picker',
  component: ObservationPickerPage,
}

export const Default = args => <ObservationPickerPage {...args} />
Default.args = {}
