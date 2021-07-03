import * as d3 from 'd3'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

YAxis.propTypes = {
  yScale: PropTypes.func.isRequired,
  chartInnerWidth: PropTypes.number.isRequired,
}

export default function YAxis({ yScale, chartInnerWidth }) {
  const yAxisTickFormat = d3.format('.1f')

  return (
    <>
      {yScale.ticks(6).map(tickValue => (
        <g
          key={yScale(tickValue)}
          transform={`translate(0,${yScale(tickValue)})`}
        >
          <line
            x1={-4}
            y1="0"
            x2={chartInnerWidth + 4}
            y2="0"
            stroke="lightgrey"
          />
          <YAxisTickMarks
            key={tickValue}
            style={{ textAnchor: 'end' }}
            x={-7}
            dy=".32em"
          >
            {yAxisTickFormat(tickValue)} kg
          </YAxisTickMarks>
        </g>
      ))}
    </>
  )
}

const YAxisTickMarks = styled.text`
  fill: var(--color-primary);
  font-size: 0.8em;
  text-anchor: end;
  font-family: monospace;
  letter-spacing: -1px;
`
