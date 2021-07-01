import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import styled from 'styled-components/macro'
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment'

import 'moment/locale/de'

export default function ChartPage({ observationsDiary, observationType }) {
  const parseTime = d3.timeParse('%Y-%m-%d')

  const sortedObbservationsDiary = observationsDiary
    .slice()
    .sort((a, b) => parseTime(a.date).getTime() - parseTime(b.date).getTime())

  const observationValueArray = sortedObbservationsDiary.map(day => ({
    date: parseTime(day.date),
    observationValue: +day.observations
      .find(observation => observation.type === observationType)
      ?.observationValue.replace(',', '.'),
  }))

  const [from, setfrom] = useState(d3.min(observationValueArray, d => d.date))
  const [to, setto] = useState(d3.max(observationValueArray, d => d.date))
  const [
    filteredObservationValueArray,
    setFilteredObservationValueArray,
  ] = useState(
    observationValueArray.filter(
      observationDay => observationDay.date >= from && observationDay.date <= to
    )
  )
  useEffect(() => {
    setFilteredObservationValueArray(
      observationValueArray.filter(
        observationDay =>
          observationDay.date >= from && observationDay.date <= to
      )
    )
  }, [from, to])

  const modifiers = { start: from, end: to }

  const observationsWithoutUndefined = filteredObservationValueArray.filter(
    observation => observation.observationValue
  )

  const canvasRef = useRef(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    setWidth(canvasRef.current.getBoundingClientRect().width)
  }, [canvasRef])

  // const calenderRef = useRef(null)
  // const [calenderWidth, setCalenderWidth] = useState(0)
  // useEffect(() => {
  //   setWidth(calenderRef.current.getBoundingClientRect().width)
  // }, [calenderRef])

  const [height, setHeight] = useState(0)
  useEffect(() => {
    setHeight(canvasRef.current.getBoundingClientRect().height)
  }, [canvasRef])

  const margin = { top: 20, right: 30, bottom: 100, left: 80 }

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const xAxisLabelOffset = 72
  const yAxisLabelOffset = 48

  const xAxisTickFormat = d3.timeFormat('%d.%m.%y')

  const xScale = d3
    .scaleTime()
    .domain([from, to])
    // .domain(d3.extent(observationValueArray, d => d.date))
    .range([0, innerWidth])
    .nice()

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.extent(observationValueArray, d => d.observationValue)[0] - 0.1,
      d3.extent(observationValueArray, d => d.observationValue)[1] + 0.1,
    ])
    .range([innerHeight, 0])
    .nice()

  // const yScale = d3.scaleLinear().domain([35.5, 40.0]).range([height, 0]).nice()

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
            onDayChange={handleStartDayChange}
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
            // ref={el => (this.to = el)}
            value={to}
            onDayChange={handleEndDayChange}
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
                y2={innerHeight + 4}
                stroke="lightgrey"
              />
              <XAxisTickMarks
                x={-6}
                y={innerHeight + 8}
                translate={xScale(tickValue)}
                transformOriginX={margin.left}
                transformOriginY={innerHeight}
              >
                {xAxisTickFormat(tickValue)}
              </XAxisTickMarks>
            </XAxis>
          ))}
          <AxisLabel
            className="axis-label"
            textAnchor="middle"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
          >
            Datum
          </AxisLabel>
          {yScale.ticks(8).map(tickValue => (
            <g
              key={yScale(tickValue)}
              className="tick"
              translateY={yScale(tickValue)}
              transform={`translate(0,${yScale(tickValue)})`}
            >
              <line
                x1={-4}
                y1="0"
                x2={innerWidth + 4}
                y2="0"
                stroke="lightgrey"
              />
              <YAxisTickMarks
                key={tickValue}
                style={{ textAnchor: 'end' }}
                x={-7}
                dy=".32em"
              >
                {tickValue}
              </YAxisTickMarks>
            </g>
          ))}
          <AxisLabel
            className="axis-label"
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset},${
              innerHeight / 2
            }) rotate(-90)`}
          >
            Gewicht in kg
          </AxisLabel>
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

  function handleStartDayChange(day) {
    setfrom(day)
  }

  function handleEndDayChange(day) {
    setto(day)
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
  font-size: 0.8em;
  fill: var(--color-primary);
`

const YAxisTickMarks = styled.text`
  fill: var(--color-primary);
  font-size: 0.8em;
  text-anchor: end;
`

const AxisLabel = styled.text`
  fill: var(--color-primary);
  font-weight: 500;
`
