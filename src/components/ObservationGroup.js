import styled from 'styled-components/macro'

export default function ObservationGroup({
  time,
  name,
  value,
  observationTypes,
}) {
  const { unit } = observationTypes.find(element => element.name === name)

  return (
    <Wrapper>
      <Title>{name}</Title>
      <Time>{time} Uhr</Time>
      <Value>
        {value} {unit}
      </Value>
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

const Time = styled.time`
  color: var(--color-tertiary);
  font-weight: bold;
  font-size: 1em;
`

const Value = styled.div`
  color: var(--color-primary);
  white-space: pre-wrap;
`
