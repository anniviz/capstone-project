import React from 'react'
import OutlineButton from './OutlineButton'

export default {
  title: 'buttons/OutlineButton',
  component: OutlineButton,
}

const Template = args => <OutlineButton {...args} />

export const Active = Template.bind({})
Active.args = {
  children: 'Blutdruck',
}
