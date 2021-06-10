import PropTypes, { string } from 'prop-types'
import styled from 'styled-components/macro'

SmallButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  top: PropTypes.string,
  right: PropTypes.string,
  color: string,
}

export default function SmallButton({ onClick, children, top, right, color }) {
  return (
    <StyledButton onClick={onClick} top={top} right={right} color={color}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  line-height: 0;
  width: 20px;
  height: 20px;
  border: 2px ${prop => prop.color} solid;
  border-radius: 50%;
  color: ${prop => prop.color};
  background-color: inherit;
  text-align: center;
  padding: 0;
  position: absolute;
  right: ${prop => prop.right};
  top: ${prop => prop.top};
  font-weight: 600;
`
