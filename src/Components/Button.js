import PropTypes from 'prop-types'
import styled, { css } from 'styled-components/macro'

Button.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default function Button(props) {
  return <ButtonStyled {...props} />
}

const ButtonStyled = styled.button`
  padding: 12px;
  border: 2px solid grey;
  border-radius: 8px;
  background-color: white;
  color: grey;

  ${props =>
    props.isActive &&
    css`
      border: 2px solid black;
      color: black;
    `}
`
