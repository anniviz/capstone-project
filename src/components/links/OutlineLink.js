import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

const OutlineLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 52px;
  border: 2px solid var(--color-tertiary);
  border-radius: 20px;
  color: var(--color-tertiary);
  font-weight: bold;
  text-decoration: none;
`

export default OutlineLink
