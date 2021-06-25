import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import AddLink from './AddLink'
import { ReactComponent as MedicationsIcon } from '../icons/pill.svg'
import { ReactComponent as ObservationsIcon } from '../icons/observations.svg'

export default function Navbar() {
  const location = useLocation()

  return (
    <Nav>
      <NavLink exact to="/medications">
        {location.pathname.includes('medications') ? (
          <MedicationsIconStyled isActive={true} />
        ) : (
          <MedicationsIconStyled isActive={false} />
        )}
      </NavLink>
      <NavLink exact to="/observations">
        {location.pathname.includes('observations') ? (
          <ObservationsIconStyled isActive={true} />
        ) : (
          <ObservationsIconStyled isActive={false} />
        )}
      </NavLink>
      <AddLink to={`${location.pathname}/form`}></AddLink>
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
