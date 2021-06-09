import React from 'react'
import TextButton from './TextButton'

export default {
  title: 'TextButton',
  component: TextButton,
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
