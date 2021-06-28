import ObservationGroup from './ObservationGroup'

export default {
  title: 'ObservationGroup',
  component: ObservationGroup,
}

const Template = args => <ObservationGroup {...args} />

export const Default = Template.bind({})
Default.args = { time: '8:00', name: 'Blutdruck', value: '94/50' }
