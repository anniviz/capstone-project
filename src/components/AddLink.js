import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import plusIcon from '../icons/plus.svg'

export default function AddLink({ to }) {
  return (
    <LinkStyled to={to}>
      <img src={plusIcon} alt="hinzufügen" height="24px" />
    </LinkStyled>
  )
}

const LinkStyled = styled(Link)`
  display: flex;
  position: absolute;
  right: 0;
  bottom: 40px;
  left: 0;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 68px;
  margin-right: auto;
  margin-left: auto;
  border-radius: 50%;
  background: radial-gradient(
    at top left,
    var(--color-gradient-1),
    var(--color-gradient-2)
  );
  box-shadow: 26px 26px 68px var(--color-shadow-21);
`
