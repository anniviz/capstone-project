import ContactGroup from './ContactGroup'

export default {
  title: 'ContactGroup',
  component: ContactGroup,
}

const Template = args => <ContactGroup {...args} />

export const Default = Template.bind({})
Default.args = { name: 'Kinderklinik', content: 'Tel: 01234-56789111' }
