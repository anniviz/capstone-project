import { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { loadFromLocal, saveToLocal } from '../utils/localStorage'

export default function useObservations(selectedDayString) {
  const [observationsDiary, updateObservationsDiary] = useImmer(
    loadFromLocal('observationsDiary') ?? []
  )

  useEffect(() => {
    saveToLocal('observationsDiary', observationsDiary)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observationsDiary])

  const dateIndex = observationsDiary.findIndex(
    day => day.date === selectedDayString
  )

  function saveObservation(newObservation) {
    const doesDayExist = dateIndex > -1
    if (doesDayExist) {
      updateSelectedDay(newObservation)
    } else {
      addObbservationToNewDay(newObservation)
    }
  }

  function updateSelectedDay(newObservation) {
    updateObservationsDiary(draft => {
      draft[dateIndex].observations.push(newObservation)
    })
  }

  function addObbservationToNewDay(newObservation) {
    updateObservationsDiary(draft => {
      draft.push({ date: selectedDayString, observations: [newObservation] })
    })
  }

  return {
    observationsDiary,
    saveObservation,
  }
}
