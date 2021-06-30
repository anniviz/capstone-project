import styled from 'styled-components/macro'
import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'

export default function ChartPage({ observationsDiary, observationType }) {
  const xAxisTickFormat = d3.timeFormat('%d.%m.%y')
  const parseTime = d3.timeParse('%Y-%m-%d')

  const canvasRef = useRef(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    setWidth(canvasRef.current.getBoundingClientRect().width)
  }, [canvasRef])

  const [height, setHeight] = useState(0)
  useEffect(() => {
    setHeight(canvasRef.current.getBoundingClientRect().height)
  }, [canvasRef])

  const margin = { top: 20, right: 30, bottom: 80, left: 40 }

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  console.log(innerHeight)

  const xAxisLabelOffset = 50
  const yAxisLabelOffset = 45

  const ObservationValueArray = observationsDiary.map(day => ({
    date: parseTime(day.date),
    observationValue: +day.observations
      .find(observation => observation.type === observationType)
      ?.observationValue.replace(',', '.'),
  }))

  //.split(',')
  console.log(ObservationValueArray)

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(ObservationValueArray, d => d.date))
    .range([0, innerWidth])
    .nice()

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(ObservationValueArray, d => d.observationValue))
    .range([innerHeight, 0])
    .nice()

  // const yScale = d3.scaleLinear().domain([35.5, 40.0]).range([height, 0]).nice()

  const line = d3
    .line()
    .defined(d => !isNaN(d.observationValue))
    .x(d => xScale(d.date))
    .y(d => yScale(d.observationValue))
  // .curve(d3.curveNatural)

  console.log(xScale.ticks(4))

  return (
    <Grid>
      <Canvas ref={canvasRef}>
        <Chart marginLeft={margin.left} marginTop={margin.top}>
          {/* {ObservationValueArray.map(day => (
            <circle
              key={day.date}
              cx={xScale(day.date)}
              cy={yScale(day.observationValue)}
              r="3"
            />
          ))} */}
          {xScale.ticks(7).map(tickValue => (
            <g
              className="tick"
              key={tickValue}
              transform={`translate(${xScale(tickValue)},0)`}
            >
              <line x1="0" y1="0" x2="0" y2={innerHeight} stroke="lightgrey" />
              <TickMarksBottom
                dy=".71em"
                y={innerHeight + 7}
                translate={xScale(tickValue)}
                transformOriginX={margin.left}
                transformOriginY={innerHeight}
              >
                {xAxisTickFormat(tickValue)}
              </TickMarksBottom>
            </g>
          ))}
          <Line d={line(ObservationValueArray)} />
        </Chart>
      </Canvas>
    </Grid>
  )
}

const Grid = styled.main`
  display: grid;
  grid-template-rows: 1fr;
  overflow: auto;
`

const Canvas = styled.svg`
  width: 100%;
  height: 70%;
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

const TickMarksBottom = styled.text`
  transform: rotate(-65deg);
  transform-origin: 0px ${props => props.transformOriginY}px;
  text-anchor: end;
  font-size: 0.8em;
`
