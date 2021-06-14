import React from 'react'
import TextButton from './TextButton'

export default {
  title: 'TextButton',
  component: TextButton,
  decorators: [
    Story => (
      <div
        style={{
          display: 'grid',
          width: '300px',
          height: '30px',
          border: '2px black solid',
          borderRadius: '4px',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

const Template = args => <TextButton {...args} />

export const Left = Template.bind({})
Left.args = {
  children: 'Hinzufügen',
  aligne: 'left',
}

export const Right = Template.bind({})
Right.args = {
  children: 'Hinzufügen',
  aligne: 'right',
}
