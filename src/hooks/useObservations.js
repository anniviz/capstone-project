import { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { loadFromLocal, saveToLocal } from '../utils/localStorage'

export default function useObservations(selectedDayString) {
  const observationTypes = [
    { name: 'Größe', type: 'size', unit: 'cm', format: '134' },
    { name: 'Gewicht', type: 'weight', unit: 'kg', format: '25,95 ' },
    { name: 'Temperatur', type: 'temperature', unit: '°C', format: '36,7' },
    {
      name: 'Blutdruck',
      type: 'bloodpressure',
      unit: 'mmHg',
      format: '104/57',
    },
    { name: 'FEV1', type: 'fev1', unit: 'l/s', format: '1,26' },
    { name: 'Blutzucker', type: 'bloodsugar', unit: 'mmol/l', format: '6,7' },
    { name: 'Urin', type: 'urin', unit: '' },
    { name: 'Notizen', type: 'notes', unit: '' },
  ]

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
    observationTypes,
    selectedObservations,
    observationsDiary,
    saveObservation,
  }
}