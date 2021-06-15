import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default function Button(props) {
  return <StyledButton {...props} />
}

const StyledButton = styled.button`
  width: 140px;
  height: 52px;
  border: none;
  border-radius: 20px;
  color: var(--color-basis);
  font-weight: bold;
  background: radial-gradient(
    at top left,
    var(--color-gradient-1),
    var(--color-gradient-2)
  );
  box-shadow: 34px 34px 89px var(--color-shadow-21);

  :disabled {
    background: var(--color-secondary);
    box-shadow: none;
  }
`
