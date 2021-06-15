import React from 'react'
import Button from './Button'

export default {
  title: 'buttons/Button',
  component: Button,
}

const Template = args => <Button {...args} />

export const Active = Template.bind({})
Active.args = {
  children: 'I am active',
  disabled: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'I am disabled',
  disabled: true,
}
