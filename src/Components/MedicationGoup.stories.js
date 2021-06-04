import MedicationGroup from './MedicationGroup'

export default {
  title: 'MedicationGroup',
  component: MedicationGroup,
}

const Template = args => <MedicationGroup {...args} />

export const DefaultMedicationGroup = Template.bind({})
DefaultMedicationGroup.args = {
  time: '8:00',
  meds: [
    { id: 1, medName: 'Spironolacton' },
    { id: 2, medName: 'Enalapril' },
    { id: 3, medName: 'Prednisolon' },
  ],
}