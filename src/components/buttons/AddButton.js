import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import plusIcon from '../../icons/plus.svg'

AddButton.propTypes = {
  onClick: PropTypes.func,
}

export default function AddButton({ onClick }) {
  return (
    <Button onClick={onClick}>
      <img src={plusIcon} alt="hinzufügen" height="24px" />
    </Button>
  )
}

const Button = styled.button`
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
    var(--color-gradient-1),
    var(--color-gradient-2)
  );
  box-shadow: 26px 26px 68px var(--color-shadow-21);
`
