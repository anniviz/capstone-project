import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Card.propTypes = {
  time: PropTypes.node,
  meds: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.node, name: PropTypes.string })
  ),
}

export default function Card({ time, meds }) {
  return (
    <Wrapper>
      <time dateTime={time}>{time} UHR</time>
      <Meds>
        {meds.map(({ id, medName }) => (
          <li key={id}>{medName}</li>
        ))}
      </Meds>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-items: space-between;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 8px 16px var(--color-shadow);
`

const Meds = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
`
