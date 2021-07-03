import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import AddLink from './links/AddLink'
import { ReactComponent as MedicationsIcon } from '../icons/pill.svg'
import { ReactComponent as ObservationsIcon } from '../icons/observations.svg'
import { ReactComponent as ChartsIcon } from '../icons/heart.svg'

export default function Navbar({ isCharts }) {
  const location = useLocation()

  return (
    <Nav>
      <NavLink exact to="/medications">
        <MedicationsIconStyled
          $isActive={location.pathname.includes('medications')}
        />
      </NavLink>
      <ObservationIconWrapper>
        <NavLink exact to="/observations">
          <ObservationsIconStyled
            $isActive={location.pathname.includes('observations')}
          />
        </NavLink>
        <NavLink exact to="/charts">
          <ChartsIconStyled $isActive={location.pathname.includes('charts')} />
        </NavLink>
      </ObservationIconWrapper>
      <AddLink
        to={isCharts ? `/observations/form` : `${location.pathname}/form`}
      ></AddLink>
    </Nav>
  )
}

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  justify-items: center;
  align-items: center;
  width: 100vw;
  height: 80px;
  background-color: var(--color-basis);
  box-shadow: 26px 26px 68px var(--color-shadow-21);
  gap: 60px;
`

const ObservationIconWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: space-between;
  padding-left: 30px;
`

const MedicationsIconStyled = styled(MedicationsIcon)`
  stroke: ${prop =>
    prop.$isActive ? 'var(--color-primary)' : 'var(--color-secondary-dark)'};
  width: 33px;
  height: 60px;
`

const ObservationsIconStyled = styled(ObservationsIcon)`
  stroke: ${prop =>
    prop.$isActive ? 'var(--color-primary)' : 'var(--color-secondary-dark)'};
  width: 30px;
  height: 40px;
`

const ChartsIconStyled = styled(ChartsIcon)`
  stroke: ${prop =>
    prop.$isActive ? 'var(--color-primary)' : 'var(--color-secondary-dark)'};
  width: 30px;
  height: 40px;
`
