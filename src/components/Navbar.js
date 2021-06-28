import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import AddLink from './links/AddLink'
import { ReactComponent as MedicationsIcon } from '../icons/pill.svg'
import { ReactComponent as ObservationsIcon } from '../icons/observations.svg'

export default function Navbar() {
  const location = useLocation()

  return (
    <Nav>
      <NavLink exact to="/medications">
        <MedicationsIconStyled
          isActive={location.pathname.includes('medications')}
        />
      </NavLink>
      <NavLink exact to="/observations">
        <ObservationsIconStyled
          isActive={location.pathname.includes('observations')}
        />
      </NavLink>
      <AddLink to={`${location.pathname}/form`}></AddLink>
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 80px;
  background-color: var(--color-basis);
  box-shadow: 26px 26px 68px var(--color-shadow-21);
  gap: 60px;
`

const MedicationsIconStyled = styled(MedicationsIcon)`
  stroke: ${prop =>
    prop.isActive ? 'var(--color-primary)' : 'var(--color-secondary)'};
  width: 33px;
  height: 60px;
`

const ObservationsIconStyled = styled(ObservationsIcon)`
  stroke: ${prop =>
    prop.isActive ? 'var(--color-primary)' : 'var(--color-secondary)'};
  width: 30px;
  height: 40px;
`
