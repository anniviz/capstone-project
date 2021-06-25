import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import AddLink from './AddLink'
import medicationsDisabled from '../icons/pill-disabled.svg'
import medicationsEnabled from '../icons/pill-enabled.svg'
import observationsDisabled from '../icons/observations-disabled.svg'
import observationsEnabled from '../icons/observations-enabled.svg'

export default function Navbar() {
  const location = useLocation()

  return (
    <Nav>
      <NavLinkStyled exact to="/medications">
        {location.pathname.includes('medications') ? (
          <img src={medicationsEnabled} alt="" height="32px" />
        ) : (
          <img src={medicationsDisabled} alt="" height="32px" />
        )}
      </NavLinkStyled>
      <NavLinkStyled exact to="/observations">
        {location.pathname.includes('observations') ? (
          <img src={observationsEnabled} alt="" height="32px" />
        ) : (
          <img src={observationsDisabled} alt="" height="32px" />
        )}
      </NavLinkStyled>
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

const NavLinkStyled = styled(NavLink)`
  cursor: default;
`
