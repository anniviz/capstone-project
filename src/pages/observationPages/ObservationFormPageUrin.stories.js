import React from 'react'
import ObservationFormPageUrin from './ObservationFormPageUrin'

export default {
  title: 'pages/observation forms/urin',
  component: ObservationFormPageUrin,
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

export const Default = args => <ObservationFormPageUrin {...args} />
Default.args = { observation: {} }
