import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Header.propTypes = {
  children: PropTypes.node,
}

export default function Header({ children }) {
  return <HeaderStyled>{children}</HeaderStyled>
}

const HeaderStyled = styled.h2`
  display: grid;
  margin: 0;
  padding: 8px;
  border-bottom: 2px solid black;
  font-weight: 500;
  font-size: 1.2em;
  place-items: center;
`
