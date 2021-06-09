import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

TextButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default function TextButton(props) {
  return <ButtonStyled {...props} />
}

const ButtonStyled = styled.button`
  line-height: 0;
  width: 20px;
  height: 20px;
  border: 1px red solid;
  border-radius: 50%;
  color: red;
  background-color: inherit;
  text-align: center;
  vertical-align: middle;
  padding: 0;
`
