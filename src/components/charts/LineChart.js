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
  observationsWithoutUndefined: PropTypes.arrayOf(
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
  observationsWithoutUndefined,
  observationType,
  startDate,
  endDate,
  canvasRef,
}) {
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

  let yScale

  if (observationType === 'urine') {
    yScale = d3
      .scaleBand()
      .domain(['3+', '2+', '1+', 'neg.', 'pos.'])
      .range([chartInnerHeight, 0])
  } else {
    yScale = d3
      .scaleLinear()
      .domain([
        d3.min(observationValues, d =>
          observationType === 'bloodpressure' || observationType === 'fev1'
            ? d.observationValue[1]
            : d.observationValue
        ) - 0.1,
        d3.max(observationValues, d =>
          observationType === 'bloodpressure' || observationType === 'fev1'
            ? d.observationValue[0]
            : d.observationValue
        ) + 0.1,
      ])
      .range([chartInnerHeight, 0])
      .nice()
  }

  let line, line1, line2
  if (observationType === 'bloodpressure' || observationType === 'fev1') {
    line1 = d3
      .line()
      .defined(d => !isNaN(d.observationValue[0]))
      .x(d => xScale(d.date))
      .y(d => yScale(d.observationValue[0]))
    line2 = d3
      .line()
      .defined(d => !isNaN(d.observationValue[1]))
      .x(d => xScale(d.date))
      .y(d => yScale(d.observationValue[1]))
  }
  if (observationType === 'urine') {
    line1 = d3
      .line()
      .defined(d => typeof d.observationValue[0] === 'string')
      .x(d => xScale(d.date))
      .y(d => yScale(d.observationValue[0]))
    line2 = d3
      .line()
      .defined(d => typeof d.observationValue[0] === 'string')
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

      {observationType === 'bloodpressure' ||
      observationType === 'fev1' ||
      observationType === 'urine' ? (
        <>
          <Line d={line1(observationValues)} />
          <Line d={line2(observationValues)} />
        </>
      ) : (
        <Line d={line(observationValues)} />
      )}
      {observationType === 'bloodpressure' ||
        observationType === 'fev1' ||
        observationType === 'urine' ||
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
