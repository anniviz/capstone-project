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
  height: 80px;
  margin: 0;
  padding: 8px;
  border-radius: 0 0 0 32px;
  color: var(--color-dark-blue);
  font-weight: bold;
  font-size: 1.2em;
  background-color: var(--color-light-mint);
  place-items: center;
`
