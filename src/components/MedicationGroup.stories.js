import MedicationGroup from './MedicationGroup'

export default {
  title: 'MedicationGroup',
  component: MedicationGroup,
}

const Template = args => <MedicationGroup {...args} />

export const Default = Template.bind({})
Default.args = {
  time: '8:00',
  meds: [
    { id: 1, medName: 'Spironolacton' },
    { id: 2, medName: 'Enalapril' },
    { id: 3, medName: 'Prednisolon' },
  ],
}

export const Edit = Template.bind({})
Edit.args = {
  time: '8:00',
  meds: [
    { id: 1, medName: 'Spironolacton' },
    { id: 2, medName: 'Enalapril' },
    { id: 3, medName: 'Prednisolon' },
  ],
  editMode: true,
}
