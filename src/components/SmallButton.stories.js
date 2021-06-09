import React from 'react'
import SmallButton from './SmallButton'

export default {
  title: 'SmallButton',
  component: SmallButton,
}

const Template = args => <SmallButton {...args} />

export const Default = Template.bind({})
Default.args = {
  children: '-',
}
