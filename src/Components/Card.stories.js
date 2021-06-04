import Card from './Card'

export default {
  title: 'Card',
  component: Card,
}

const Template = args => <Card {...args} />

export const DefaultCard = Template.bind({})
DefaultCard.args = {
  time: '8:00',
  meds: [
    { id: 1, medName: 'Spironolacton' },
    { id: 2, medName: 'Enalapril' },
    { id: 3, medName: 'Prednisolon' },
  ],
}
