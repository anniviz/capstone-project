import React from 'react'
import SmallButton from './SmallButton'
import deleteIcon from '../../icons/delete.svg'

import editIcon from '../../icons/edit.svg'

export default {
  title: 'SmallButton',
  component: SmallButton,
  decorators: [
    Story => (
      <div
        style={{
          position: 'absolute',
          width: '200px',
          height: '100px',
          border: '2px black solid',
          borderRadius: '4px',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

const Template = args => <SmallButton {...args} />

export const Right = Template.bind({})
Right.args = {
  children: <img src={editIcon} alt="" height="14px" />,
  top: '10px',
  right: '10px',
}

export const BitLower = Template.bind({})
BitLower.args = {
  children: <img src={deleteIcon} alt="" height="14px" />,
  top: '30px',
  right: '10px',
}
