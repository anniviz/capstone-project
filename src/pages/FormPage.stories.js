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
  selectedDay: new Date(),
  medications: [],
  medicationToEditId: null,
}

export const Edit = args => <FormPage {...args} />
Edit.args = {
  selectedDay: new Date(),
  medications: [
    {
      id: '01234',
      time: '8:00',
      meds: [
        { id: '01234', medName: 'ASS' },
        { id: '01235', medName: 'Metoprolol' },
        { id: '01236', medName: 'Magnesium' },
      ],
    },
    {
      id: '01235',
      time: '9:00',
      meds: [{ id: '01234', medName: 'Tacrolimus' }],
    },
  ],
  medicationToEditId: '01234',
}
