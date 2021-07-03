import * as d3 from 'd3'
import { useEffect, useState } from 'react'

export default function useTimeSpan(observationValueArray) {
  const [startDate, setStartDate] = useState(
    d3.min(observationValueArray, d => d.date)
  )
  const [endDate, setEndDate] = useState(
    d3.max(observationValueArray, d => d.date)
  )
  const [
    filteredObservationValueArray,
    setFilteredObservationValueArray,
  ] = useState(
    observationValueArray.filter(
      observationDay =>
        observationDay.date >= startDate && observationDay.date <= endDate
    )
  )
  useEffect(() => {
    setFilteredObservationValueArray(
      observationValueArray.filter(
        observationDay =>
          observationDay.date >= startDate && observationDay.date <= endDate
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate])
  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filteredObservationValueArray,
  }
}
