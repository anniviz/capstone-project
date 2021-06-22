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
  bottom: 12px;
  left: 0;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 68px;
  margin-right: auto;
  margin-left: auto;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: default;
  background: radial-gradient(
    at top left,
    var(--color-gradient-1),
    var(--color-gradient-2)
  );
  box-shadow: 26px 26px 68px var(--color-shadow-21);
`
