import styled from 'styled-components/macro'
import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'

export default function ChartPage({ observationsDiary, observationType }) {
  const parseTime = d3.timeParse('%Y-%m-%d')

  const sortedObbservationsDiary = observationsDiary
    .slice()
    .sort((a, b) => parseTime(a.date).getTime() - parseTime(b.date).getTime())
  console.log(observationsDiary)
  console.log(sortedObbservationsDiary)

  const observationValueArray = sortedObbservationsDiary.map(day => ({
    date: parseTime(day.date),
    observationValue: +day.observations
      .find(observation => observation.type === observationType)
      ?.observationValue.replace(',', '.'),
  }))

  const observationsWithoutUndefined = observationValueArray.filter(
    observation => observation.observationValue
  )

  const canvasRef = useRef(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    setWidth(canvasRef.current.getBoundingClientRect().width)
  }, [canvasRef])

  const [height, setHeight] = useState(0)
  useEffect(() => {
    setHeight(canvasRef.current.getBoundingClientRect().height)
  }, [canvasRef])

  const margin = { top: 20, right: 30, bottom: 100, left: 80 }

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  // console.log(innerHeight)

  const xAxisLabelOffset = 72
  const yAxisLabelOffset = 48

  console.log(observationValueArray)

  const xAxisTickFormat = d3.timeFormat('%d.%m.%y')

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(observationValueArray, d => d.date))
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
      <Canvas ref={canvasRef}>
        <Chart marginLeft={margin.left} marginTop={margin.top}>
          {xScale.ticks(6).map(tickValue => (
            <XAxis
              translateY={xScale(tickValue)}
              key={tickValue}
              // transform={`translate(${xScale(tickValue)},0)`}
            >
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
            Tag
          </AxisLabel>
          {yScale.ticks(8).map(tickValue => (
            <g
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
          <Line d={line(observationsWithoutUndefined)} />
          {observationsWithoutUndefined.map(day => (
            <circle
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
}

const Grid = styled.main`
  display: grid;
  grid-template-rows: 1fr;
  overflow: auto;
  /* justify-content: center; */
  align-items: center;
`

const Canvas = styled.svg`
  width: 100%;
  height: 60%;
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
