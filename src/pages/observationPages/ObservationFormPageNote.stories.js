import React from 'react'
import ObservationFormPageNote from './ObservationFormPageNote'

export default {
  title: 'pages/observation forms/notes',
  component: ObservationFormPageNote,
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

export const Default = args => <ObservationFormPageNote {...args} />
Default.args = {}
