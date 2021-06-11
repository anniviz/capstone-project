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
  position: absolute;
  top: ${prop => prop.top};
  right: ${prop => prop.right};
  width: 20px;
  height: 20px;
  padding: 0;
  border: 2px ${prop => prop.color} solid;
  border-radius: 50%;
  color: ${prop => prop.color};
  font-weight: 600;
  line-height: 0;
  text-align: center;
  background-color: inherit;
`
