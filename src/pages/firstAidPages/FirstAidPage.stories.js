import React from 'react'
import FirstAidPage from './FirstAidPage'

export default {
  title: 'pages/first aid',
  component: FirstAidPage,
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

export const Default = args => <FirstAidPage {...args} />
Default.args = {}
