import React from 'react'
import Button from './Button'

export default {
  title: 'Button',
  component: Button,
}

const Template = args => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Default',
  isActive: false,
}

export const ActiveButton = Template.bind({})
ActiveButton.args = {
  children: 'I am active',
  isActive: true,
}
