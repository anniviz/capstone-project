import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

SmallButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  top: PropTypes.string,
  right: PropTypes.string,
}

export default function SmallButton({ onClick, children, top, right, color }) {
  return (
    <StyledButton onClick={onClick} top={top} right={right}>
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
  border: none;
  text-align: center;
  background-color: inherit;
  img {
    width: 16px;
    height: 16px;
  }
`
