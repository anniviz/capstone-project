import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

SmallButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  top: PropTypes.string,
  right: PropTypes.string,
}

export default function SmallButton({ onClick, children, top, right }) {
  return (
    <StyledButton onClick={onClick} top={top} right={right}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  line-height: 0;
  width: 20px;
  height: 20px;
  border: 2px red solid;
  border-radius: 50%;
  color: red;
  background-color: inherit;
  text-align: center;
  padding-bottom: 4px;
  position: absolute;
  right: ${prop => prop.right};
  top: ${prop => prop.top};
  font-weight: 600;
`
