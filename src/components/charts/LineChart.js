import * as d3 from 'd3'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import useWidthAndHeight from '../../hooks/useWidthAndHeight'
import XAxis from './XAxis'
import YAxis from './YAxis'

LineChart.propTypes = {
  observationValues: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date),
      observationValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array,
      ]),
    })
  ).isRequired,
  observationType: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  canvasRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
}

export default function LineChart({
  observationValues,
  observationType,
  startDate,
  endDate,
  canvasRef,
}) {
  const observationsWithoutUndefined = observationValues.filter(observation =>
    observationType === 'bloodpressure'
      ? observation.observationValue[0]
      : observation.observationValue
  )

  const { width: chartWidth, height: chartHeight } = useWidthAndHeight(
    canvasRef
  )
  const chartMargin = { top: 20, right: 30, bottom: 100, left: 60 }

  const chartInnerWidth = chartWidth - chartMargin.left - chartMargin.right
  const chartInnerHeight = chartHeight - chartMargin.top - chartMargin.bottom

  const xScale = d3
    .scaleTime()
    .domain([startDate, endDate])
    .range([0, chartInnerWidth])
    .nice()

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.min(observationValues, d =>
        observationType === 'bloodpressure'
          ? d.observationValue[1]
          : d.observationValue
      ) - 0.1,
      d3.max(observationValues, d =>
        observationType === 'bloodpressure'
          ? d.observationValue[0]
          : d.observationValue
      ) + 0.1,
    ])
    .range([chartInnerHeight, 0])
    .nice()

  let line, lineSystole, lineDiastole
  if (observationType === 'bloodpressure') {
    lineSystole = d3
      .line()
      .defined(d => !isNaN(d.observationValue[0]))
      .x(d => xScale(d.date))
      .y(d => yScale(d.observationValue[0]))
    lineDiastole = d3
      .line()
      .defined(d => !isNaN(d.observationValue[1]))
      .x(d => xScale(d.date))
      .y(d => yScale(d.observationValue[1]))
  } else {
    line = d3
      .line()
      .defined(d => !isNaN(d.observationValue))
      .x(d => xScale(d.date))
      .y(d => yScale(d.observationValue))
  }

  return (
    <Chart marginLeft={chartMargin.left} marginTop={chartMargin.top}>
      <XAxis
        xScale={xScale}
        chartInnerHeight={chartInnerHeight}
        marginLeft={chartMargin.left}
      />
      <YAxis
        yScale={yScale}
        chartInnerWidth={chartInnerWidth}
        observationType={observationType}
      />

      {observationType === 'bloodpressure' ? (
        <>
          <Line d={lineSystole(observationValues)} />
          <Line d={lineDiastole(observationValues)} />
        </>
      ) : (
        <Line d={line(observationValues)} />
      )}
      {observationType === 'bloodpressure' ||
        observationsWithoutUndefined.map(day => (
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
  stroke: var(--color-quaternary);
`

const Circle = styled.circle`
  fill: var(--color-quaternary);
`
