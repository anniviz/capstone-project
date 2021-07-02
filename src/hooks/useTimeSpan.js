import * as d3 from 'd3'
import { useEffect, useState } from 'react'

export default function useTimeSpan(observationValueArray) {
  const [from, setFrom] = useState(d3.min(observationValueArray, d => d.date))
  const [to, setTo] = useState(d3.max(observationValueArray, d => d.date))
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to])
  return { from, setFrom, to, setTo, filteredObservationValueArray }
}
