import Navbar from './Navbar'

export default {
  title: 'Navbbar',
  component: Navbar,
  decorators: [
    Story => (
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          width: '600px',
          height: '400px',
          border: '2px black solid',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

const Template = args => <Navbar {...args} />

export const Default = Template.bind({})
Default.args = {}
