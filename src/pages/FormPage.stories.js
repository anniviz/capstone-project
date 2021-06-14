import React from 'react'
import FormPage from './FormPage'

export default {
  title: 'pages/Form',
  component: FormPage,
  argTypes: { setActivePage: { action: 'setActivePage' } },
}

export const Default = args => <FormPage {...args} />
Default.args = {
  medicationToEdit: {},
}

export const Edit = args => <FormPage {...args} />
Edit.args = {
  medicationToEdit: {
    id: '01234',
    time: '8:00',
    meds: [
      { id: '01234', medName: 'ASS' },
      { id: '01235', medName: 'Metoprolol' },
      { id: '01236', medName: 'Magnesium' },
    ],
  },
}
