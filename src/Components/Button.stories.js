import React from 'react'
import Button from './Button'

export default {
  title: 'Button',
  component: Button,
}

const Template = args => <Button {...args} />

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'I am active',
  disabled: false,
}

export const ActiveButton = Template.bind({})
ActiveButton.args = {
  children: 'I am disabled',
  disabled: true,
}
