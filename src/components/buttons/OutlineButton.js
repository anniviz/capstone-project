import styled from 'styled-components/macro'
import Button from './Button'

const OutlineButton = styled(Button)`
  background: var(--color-basis);
  color: var(--color-tertiary);
  border: 2px solid var(--color-tertiary);
`

export default OutlineButton
