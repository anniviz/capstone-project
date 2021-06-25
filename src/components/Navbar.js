import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import AddLink from './AddLink'
import medicationsDisabled from '../icons/pill-disabled.svg'
import observationsDisabled from '../icons/observations-disabled.svg'

export default function Navbar() {
  return (
    <Nav>
      <NavLink exact to="/medications">
        <img src={medicationsDisabled} alt="" height="32px" />
      </NavLink>
      <NavLink exact to="/observations">
        <img src={observationsDisabled} alt="" height="32px" />
      </NavLink>
      <AddLink to="/medications/form"></AddLink>
    </Nav>
  )
}

const Nav = styled.nav`
  width: 100vw;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--color-basis);
  box-shadow: 26px 26px 68px var(--color-shadow-21);
  position: relative;
`
