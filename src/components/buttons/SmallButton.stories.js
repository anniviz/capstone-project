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

const Template = args => <SmallButton {...args} />

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
