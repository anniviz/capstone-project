import React from 'react'
import FormPage from './FormPage'

export default {
  title: 'pages/Form',
  component: FormPage,
  argTypes: { setActivePage: { action: 'setActivePage' } },
}

export const Default = args => <FormPage {...args} />
Default.args = {}
