import React from 'react'
import TextButton from './TextButton'

export default {
  title: 'buttons/TextButton',
  component: TextButton,
}

const Template = args => <TextButton {...args}>zurück</TextButton>
export const Default = Template.bind({})
Default.args = {}
