import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default function Button(props) {
  return <ButtonStyled {...props} />
}

const ButtonStyled = styled.button`
  width: 160px;
  height: 52px;
  border: none;
  border-radius: 20px;
  color: var(--color-white);
  font-weight: 600;
  background: radial-gradient(
    at top left,
    var(--color-light-green),
    var(--color-petrol)
  );

  :disabled {
    background: var(--color-light-mint);
  }
`
