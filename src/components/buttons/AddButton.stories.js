import React from 'react'
import AddButton from './AddButton'

export default {
  title: 'buttons/AddButton',
  component: AddButton,
}

const Template = args => <AddButton {...args} />

export const Add = Template.bind({})
Add.args = {}
