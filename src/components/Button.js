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
  width: 100px;
  padding: 12px;
  border: 2px solid black;
  border-radius: 8px;
  color: black;
  background-color: white;

  :disabled {
    border: 2px solid grey;
    color: grey;
  }
`
