import React from 'react'
import FormPage from './FormPage'

export default {
  title: 'pages/Form',
  component: FormPage,
  argTypes: {
    setActivePage: { action: 'setActivePage' },
    isDisabled: { type: 'boolean' },
  },
}

export const Default = args => <FormPage {...args} />
Default.args = {
  medication: {
    time: '',
    meds: [],
  },
}

export const Edit = args => <FormPage {...args} />
Edit.args = {
  medication: {
    id: '01234',
    time: '8:00',
    meds: [
      { id: '01234', medName: 'ASS' },
      { id: '01235', medName: 'Metoprolol' },
      { id: '01236', medName: 'Magnesium' },
    ],
  },
}
