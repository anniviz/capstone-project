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
  width: 160px;
  height: 52px;
  border: none;
  border-radius: 20px;
  color: var(--color-white);
  font-weight: bold;
  background: radial-gradient(
    at top left,
    var(--color-light-green),
    var(--color-petrol)
  );
  box-shadow: 34px 34px 89px var(--color-petrol-21);

  :disabled {
    background: var(--color-light-mint);
    box-shadow: none;
  }
`
