import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import plusIcon from '../../icons/plus.svg'

Button.propTypes = {
  onClick: PropTypes.func,
}

export default function Button({ onClick }) {
  return (
    <StyledButton onClick={onClick}>
      <img src={plusIcon} alt="hinzufügen" height="24px" />
    </StyledButton>
  )
}

const StyledButton = styled.button`
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 68px;
  height: 68px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: radial-gradient(
    at top left,
    var(--color-light-green),
    var(--color-petrol)
  );
  box-shadow: 26px 26px 68px var(--color-petrol-21);
`
