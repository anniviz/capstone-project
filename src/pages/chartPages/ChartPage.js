import styled from 'styled-components/macro'
import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'

export default function ChartPage({ observationsDiary, observationType }) {
  const formatTime = d3.timeFormat('%Y-%m-%d')
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

  const margin = { top: 20, right: 30, bottom: 10, left: 10 }

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const xAxisLabelOffset = 50
  const yAxisLabelOffset = 45

  const ObservationValueArray = observationsDiary.map(day => ({
    date: parseTime(day.date),
    observationValue: +day.observations
      .find(observation => observation.type === observationType)
      ?.observationValue.replace(',', '.'),
  }))

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

  return (
    <Grid>
      <Canvas ref={canvasRef}>
        <Chart marginLeft={margin.left} marginTop={margin.top}>
          <path fill="none" stroke="black" d={line(ObservationValueArray)} />
          {ObservationValueArray.map(day => (
            <circle
              key={day.date}
              cx={xScale(day.date)}
              cy={yScale(day.observationValue)}
              r="3"
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
