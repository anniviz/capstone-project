import React from 'react'
import IconButton from './IconButton'
import deleteIcon from '../../icons/delete.svg'

import editIcon from '../../icons/edit.svg'

export default {
  title: 'buttons/IconButton',
  component: IconButton,
  decorators: [
    Story => (
      <div
        style={{
          position: 'relative',
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

const Template = args => <IconButton {...args} />

export const RightTop = Template.bind({})
RightTop.args = {
  children: <img src={editIcon} alt="" height="14px" />,
  position: 'absolute',
  top: '10px',
  right: '10px',
}

export const LeftLow = Template.bind({})
LeftLow.args = {
  children: <img src={deleteIcon} alt="" height="14px" />,
  position: 'absolute',
  top: '60px',
}
