import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

const OutlineLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 52px;
  border: 2px solid var(--color-quaternary);
  border-radius: 20px;
  color: var(--color-quaternary);
  font-weight: bold;
  text-decoration: none;
`

export default OutlineLink
