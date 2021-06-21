import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

SmallButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  top: PropTypes.string,
  bottom: PropTypes.string,
  right: PropTypes.string,
  position: PropTypes.string,
}

export default function SmallButton({
  onClick,
  children,
  top,
  bottom,
  right,
  position,
}) {
  return (
    <StyledButton
      onClick={onClick}
      top={top}
      bottom={bottom}
      right={right}
      position={position}
    >
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  position: ${prop => prop.position};
  top: ${prop => prop.top};
  bottom: ${prop => prop.bottom};
  right: ${prop => prop.right};
  padding: 0;
  border: none;
  text-align: center;
  background-color: inherit;
`
