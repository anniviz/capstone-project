import React from 'react'
import ObservationFormPageDefault from './ObservationFormPageDefault'

export default {
  title: 'pages/observation forms/default',
  component: ObservationFormPageDefault,
  argTypes: {
    isDisabled: { type: 'boolean' },
  },
  decorators: [
    Story => (
      <div
        style={{
          display: 'grid',
          width: '375px',
          height: '667px',
          border: '2px black solid',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export const Default = args => <ObservationFormPageDefault {...args} />
Default.args = {
  observation: {},
  observationType: 'fev1',
}
