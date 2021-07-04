import produce from 'immer'
import { useEffect, useState } from 'react'
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
  const selectedObservations = dateIndex > -1 ? findActiveObservations() : []

  const [selectedObservationId, setSelectedObservationId] = useState(null)
  const selectedObservationIndex = selectedObservations.findIndex(
    observation => observation.id === selectedObservationId
  )
  const selectedObservation =
    selectedObservations[selectedObservationIndex] ?? {}

  function findActiveObservations() {
    return observationsDiary[dateIndex].observations
  }

  function saveObservation(newObservation) {
    const doesDayExist = dateIndex > -1
    if (doesDayExist) {
      updateSelectedDay(newObservation)
    } else {
      addObbservationToNewDay(newObservation)
    }
    setSelectedObservationId(null)
  }

  function updateSelectedDay(newObservation) {
    const observationsIndex = selectedObservations.findIndex(
      observation => observation.id === newObservation.id
    )

    const doesObservationExist = observationsIndex > -1

    if (doesObservationExist) {
      updateExistingObservation(observationsIndex, newObservation)
    } else {
      addObservationToExistingDay(newObservation)
    }
  }

  function updateExistingObservation(observationsIndex, newObservation) {
    updateObservationsDiary(draft => {
      draft[dateIndex].observations[observationsIndex] = newObservation
    })
  }

  function addObservationToExistingDay(newObservation) {
    updateObservationsDiary(draft => {
      draft[dateIndex].observations.push(newObservation)
    })
  }

  function addObbservationToNewDay(newObservation) {
    updateObservationsDiary(draft => {
      draft.push({ date: selectedDayString, observations: [newObservation] })
    })
  }

  function deleteSingleObservation(id) {
    const dayObservations = observationsDiary[dateIndex].observations
    const observationsIndex = dayObservations.findIndex(
      observation => observation.id === id
    )
    updateObservationsDiary(
      produce(observationsDiary, draft => {
        if (observationsIndex !== -1)
          draft[dateIndex].observations.splice(observationsIndex, 1)
      })
    )
  }

  return {
    observationsDiary,
    selectedObservations,
    selectedObservation,
    selectedObservationId,
    setSelectedObservationId,
    saveObservation,
    deleteSingleObservation,
  }
}
