import * as d3 from 'd3'
import styled from 'styled-components/macro'
import useWidthAndHeight from '../../hooks/useWidthAndHeight'

export default function LineChart({
  filteredObservationValueArray,
  selectedObservationValueArray,
  startDate,
  endDate,
  canvasRef,
}) {
  const observationsWithoutUndefined = filteredObservationValueArray.filter(
    observation => observation.observationValue
  )
  const { width: chartWidth, height: chartHeight } = useWidthAndHeight(
    canvasRef
  )
  const margin = { top: 20, right: 30, bottom: 100, left: 60 }

  const chartInnerWidth = chartWidth - margin.left - margin.right
  const chartInnerHeight = chartHeight - margin.top - margin.bottom

  const xAxisTickFormat = d3.timeFormat('%d.%m.%y')
  const yAxisTickFormat = d3.format('.1f')

  const xScale = d3
    .scaleTime()
    .domain([startDate, endDate])
    .range([0, chartInnerWidth])
    .nice()

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.extent(selectedObservationValueArray, d => d.observationValue)[0] -
        0.1,
      d3.extent(selectedObservationValueArray, d => d.observationValue)[1] +
        0.1,
    ])
    .range([chartInnerHeight, 0])
    .nice()

  const line = d3
    .line()
    .defined(d => !isNaN(d.observationValue))
    .x(d => xScale(d.date))
    .y(d => yScale(d.observationValue))

  return (
    <Chart marginLeft={margin.left} marginTop={margin.top}>
      {xScale.ticks(6).map(tickValue => (
        <XAxis translateY={xScale(tickValue)} key={tickValue}>
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
            transformOriginX={margin.left}
            transformOriginY={chartInnerHeight}
          >
            {xAxisTickFormat(tickValue)}
          </XAxisTickMarks>
        </XAxis>
      ))}
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
      <Line d={line(filteredObservationValueArray)} />
      {observationsWithoutUndefined.map(day => (
        <Circle
          key={day.date}
          cx={xScale(day.date)}
          cy={yScale(day.observationValue)}
          r="2"
        />
      ))}
    </Chart>
  )
}

const Chart = styled.g`
  transform: translate(
    ${props => props.marginLeft}px,
    ${props => props.marginTop}px
  );
`

const Line = styled.path`
  fill: none;
  stroke: var(--color-tertiary);
`

const Circle = styled.circle`
  fill: var(--color-tertiary);
`

const XAxis = styled.g`
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

const YAxisTickMarks = styled.text`
  fill: var(--color-primary);
  font-size: 0.8em;
  text-anchor: end;
  font-family: monospace;
  letter-spacing: -1px;
`
