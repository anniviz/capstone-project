import * as d3 from 'd3'
import 'moment/locale/de'
import { useRef } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment'
import styled from 'styled-components/macro'
import useTimeSpan from '../../hooks/useTimeSpan'
import useWidthAndHeight from '../../hooks/useWidthAndHeight'

export default function ChartPage({ observationsDiary, observationType }) {
  const parseTime = d3.timeParse('%Y-%m-%d')

  const sortedObservationsDiary = observationsDiary
    .slice()
    .sort((a, b) => parseTime(a.date).getTime() - parseTime(b.date).getTime())

  const activeObservationValueArray = createObservationValueArray()

  const {
    from,
    setFrom,
    to,
    setTo,
    filteredObservationValueArray,
  } = useTimeSpan(activeObservationValueArray)

  const modifiers = { start: from, end: to }

  const observationsWithoutUndefined = filteredObservationValueArray.filter(
    observation => observation.observationValue
  )

  const canvasRef = useRef(null)
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
    .domain([from, to])
    .range([0, chartInnerWidth])
    .nice()

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.extent(activeObservationValueArray, d => d.observationValue)[0] - 0.1,
      d3.extent(activeObservationValueArray, d => d.observationValue)[1] + 0.1,
    ])
    .range([chartInnerHeight, 0])
    .nice()

  const line = d3
    .line()
    .defined(d => !isNaN(d.observationValue))
    .x(d => xScale(d.date))
    .y(d => yScale(d.observationValue))

  return (
    <Grid>
      <DayPickerWrapper>
        <div>
          <Legend>Start Datum</Legend>
          <DayPickerInput
            value={from}
            onDayChange={day => handleDayChange(day, 'start')}
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { after: to },
              modifiers,
              locale: 'de',
              localeUtils: MomentLocaleUtils,
            }}
          />
        </div>
        <div>
          <Legend>End Datum</Legend>
          <DayPickerInput
            value={to}
            onDayChange={day => handleDayChange(day, 'end')}
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              locale: 'de',
              localeUtils: MomentLocaleUtils,
            }}
          />
        </div>
      </DayPickerWrapper>
      <Canvas ref={canvasRef}>
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
      </Canvas>
    </Grid>
  )

  function createObservationValueArray() {
    return sortedObservationsDiary.map(day => ({
      date: parseTime(day.date),
      observationValue: +parseObservationValue(day.observations),
    }))
  }

  function parseObservationValue(observationValueArray) {
    const observationValueRaw = observationValueArray.find(
      observation => observation.type === observationType
    )
    if (observationType === 'bloodpressure') {
      return observationValueRaw?.observationValue.replace('/', '.')
    } else {
      return observationValueRaw?.observationValue.replace(',', '.')
    }
  }

  function handleDayChange(day, position) {
    position === 'start' ? setFrom(day) : setTo(day)
  }
}

const Grid = styled.main`
  display: grid;
  margin-top: 40px;
  overflow: auto;
  grid-template-rows: auto 1fr;
  gap: 40px;
`

const DayPickerWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-around;
  padding: 12px;

  .DayPicker {
    color: var(--color-primary);
  }

  .DayPickerInput-Overlay {
    position: absolute;
    left: 0;
    z-index: 1;

    background: white;
    border-radius: 20px;
    box-shadow: 34px 34px 89px var(--color-shadow-13);
  }

  .DayPickerInput-OverlayWrapper {
    width: 240px;
    position: absolute;
    margin: 0;
    padding: 0;
    left: calc(50vw - 138.5px);
    top: 80px;
  }

  .DayPickerInput > input {
    width: 6rem;
    color: var(--color-tertiary);
    font-size: 0.9rem;
    padding: 2px;
  }
  .DayPicker-Day {
    border-radius: 0%;
  }

  .DayPicker-Day--today {
    color: var(--color-tertiary);
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
    background-color: var(--color-tertiary);
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: var(--color-tertiary);
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: var(--color-secondary) !important;
    color: var(--color-primary);
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: var(--color-secondary) !important;
    color: var(--color-primary);
  }

  .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }

  .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
`

const Legend = styled.legend`
  margin-bottom: 8px;
  color: var(--color-primary);
  font-weight: 500;
  font-size: 0.9rem;
`

const Canvas = styled.svg`
  width: 100%;
  height: 60%;
  margin: 0 auto;
`

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

// const AxisLabel = styled.text`
//   fill: var(--color-primary);
//   font-weight: 500;
// `
