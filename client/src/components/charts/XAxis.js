import * as d3 from 'd3'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

XAxis.propTypes = {
  xScale: PropTypes.func.isRequired,
  chartInnerHeight: PropTypes.number.isRequired,
  marginLeft: PropTypes.number.isRequired,
}

export default function XAxis({ xScale, chartInnerHeight, marginLeft }) {
  const xAxisTickFormat = d3.timeFormat('%d.%m.%y')

  return (
    <>
      {xScale.ticks(6).map(tickValue => (
        <XAxisStyled translateY={xScale(tickValue)} key={tickValue}>
          <line
            x1="0"
            y1={-4}
            x2="0"
            y2={chartInnerHeight + 4}
            stroke="lightgrey"
          />
          <XAxisTickMarks
            x={-6}
            y={chartInnerHeight + 8}
            translate={xScale(tickValue)}
            transformOriginX={marginLeft}
            transformOriginY={chartInnerHeight}
          >
            {xAxisTickFormat(tickValue)}
          </XAxisTickMarks>
        </XAxisStyled>
      ))}
    </>
  )
}

const XAxisStyled = styled.g`
  transform: translate(${props => props.translateY}px, 0);
`

const XAxisTickMarks = styled.text`
  transform: rotate(-65deg);
  transform-origin: 0px ${props => props.transformOriginY}px;
  text-anchor: end;
  font-family: monospace;
  font-size: 0.8em;
  fill: var(--color-primary);
`
