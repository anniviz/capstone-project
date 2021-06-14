import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

TextButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  align: PropTypes.string,
}

export default function TextButton(props) {
  return <ButtonStyled {...props} />
}

const ButtonStyled = styled.button`
  padding: 4px;
  border: none;
  color: blue;
  background-color: inherit;
  justify-self: ${props =>
    props.align === 'left' ? 'self-start' : 'self-end'};
`
