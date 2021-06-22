import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

SmallButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  top: PropTypes.string,
  right: PropTypes.string,
  position: PropTypes.string,
}

export default function SmallButton({
  onClick,
  children,
  top,
  right,
  position,
}) {
  return (
    <StyledButton onClick={onClick} top={top} right={right} position={position}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  position: ${prop => prop.position};
  top: ${prop => prop.top};
  right: ${prop => prop.right};
  padding: 0;
  border: none;
  text-align: center;
  background-color: inherit;
`
