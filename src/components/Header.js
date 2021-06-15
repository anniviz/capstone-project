import styled from 'styled-components/macro'

export default function Header() {
  const today = new Date()

  return <HeaderStyled>{formatDate(today)}</HeaderStyled>

  function formatDate(date) {
    const options = { weekday: 'long', month: 'long', day: 'numeric' }
    const formatedDate = date.toLocaleDateString('de-DE', options).toUpperCase()

    return formatedDate
  }
}

const HeaderStyled = styled.h2`
  display: grid;
  min-height: 80px;
  margin: 0;
  padding: 8px;
  border-radius: 0 0 0 32px;
  color: var(--color-primary);
  font-weight: bold;
  font-size: 1.2em;
  background-color: var(--color-secondary);
  place-items: center;
`
