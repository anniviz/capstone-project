import React from 'react'
import ContactsPage from './ContactsPage'

export default {
  title: 'pages/first aid',
  component: ContactsPage,
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

export const Default = args => <ContactsPage {...args} />
Default.args = {}
