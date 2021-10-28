import React from 'react'
import RadioButton from './RadioButton'

export default {
  title: 'RadioButton',
  component: RadioButton,
}

const Template = args => <RadioButton {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Leukos',
  id: '1',
  value: 'neg',
  name: 'leukos',
  checked: false,
}
