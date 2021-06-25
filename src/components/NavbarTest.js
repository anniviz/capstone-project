import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import AddLink from './AddLink'
import { ReactComponent as MedicationsIcon } from '../icons/pill.svg'
import { ReactComponent as ObservationsIcon } from '../icons/observations.svg'

export default function NavbarTest() {
  const location = useLocation()

  return (
    <Tabbar>
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
      <AddLink to="/medications/form"></AddLink>
      <TabIndicator>
        <TabIndicatorLeft></TabIndicatorLeft>
        <TabIndicatorRight></TabIndicatorRight>
      </TabIndicator>
    </Tabbar>
  )
}

const Tabbar = styled.div`
  background-color: var(--color-tertiary);
  padding: 0 20px 25px 20px;
  display: flex;
  position: absolute;
  bottom: 0;
  height: 10px;
  left: 0;
  right: 0;
  height: 90px;
  justify-content: space-between;
  box-shadow: 26px 26px 68px var(--color-shadow-21);
`

const TabIndicator = styled.div`
  position: absolute;
  background-color: var(--color-basis);
  width: 100px;
  height: 60px;
  border-radius: 0 0 50px 50px;
  /* z-index: 1; */
  transform: translateX(calc(50vw - 75px));
`

const TabIndicatorLeft = styled.div`
  background-color: var(--color-basis);
  height: 25px;
  width: 25px;
  position: absolute;
  right: -23px;

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    background-color: var(--color-tertiary);
    display: block;
    border-radius: 25px 0 0 0;
  }
`

const TabIndicatorRight = styled.div`
  background-color: var(--color-basis);
  height: 25px;
  width: 25px;
  position: absolute;
  left: -23px;

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    background-color: var(--color-tertiary);
    display: block;
    border-radius: 0 25px 0 0;
  }
`

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
