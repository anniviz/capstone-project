import React from 'react'
import OutlineLink from './OutlineLink'

export default {
  title: 'links/OutlineLink',
  component: OutlineLink,
}

const Template = args => <OutlineLink {...args} />

export const Active = Template.bind({})
Active.args = {
  children: 'Blutdruck',
}
