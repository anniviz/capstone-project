import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

ContactGroup.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default function ContactGroup({ name, content }) {
  return (
    <Wrapper>
      <Title>{name}</Title>
      <Value>{content}</Value>
    </Wrapper>
  )
}

const Wrapper = styled.li`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 12px;
  border-bottom: 2px solid var(--color-secondary);
  gap: 12px;
  justify-items: space-between;
`

const Title = styled.h3`
  color: var(--color-primary);
  font-size: 1.3em;
  margin: 0;
`

const Value = styled.div`
  color: var(--color-primary);
  white-space: pre-wrap;
`
