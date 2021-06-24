import styled from 'styled-components/macro'
import AddLink from './AddLink'

export default function Navbar() {
  return (
    <Nav>
      <AddLink to="/medications/form"></AddLink>
    </Nav>
  )
}

const Nav = styled.nav`
  width: 100vw;
  height: 85px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  background-color: var(--color-basis);
  box-shadow: 26px 26px 68px var(--color-shadow-21);
  position: relative;
`
