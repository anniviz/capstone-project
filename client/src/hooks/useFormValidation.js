import { useEffect, useState } from 'react'

export default function useFormValidation(inputs) {
  const [isDisabled, setIsDisabled] = useState(true)
  const [isTimeValid, setIsTimeValid] = useState(true)
  const [isObservationInputValid, setIsObservationInputValid] = useState(true)

  useEffect(() => {
    validateForm()
    setIsTimeValid(true)
    setIsObservationInputValid(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs])

  function validateForm() {
    setIsDisabled(
      inputs.time.trim().length === 0 || inputs.inputValue.trim().length === 0
    )
  }

  function validateTime(time) {
    const timeFormat = /^([0-9]|[0-1][0-9]|2[0-3]):([0-5][0-9])$/

    return time.match(timeFormat)
  }

  function validateTypeInput(input, type) {
    switch (type) {
      case 'size':
        return input.match(/^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$/)
      case 'weight':
        return input.match(
          /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9]),?([0-9]|[0-9][0-9])?$/
        )
      case 'temperature':
        return input.match(/^([3-4][0-9]),([0-9]|[0-9][0-9])$/)
      case 'bloodpressure':
        return input.match(
          /^([1-9][0-9]|[1-9][0-9][0-9])\/([1-9][0-9]|[1-9][0-9][0-9])$/
        )
      case 'fev1':
        return input.match(/^([0-9]),([0-9][0-9])$/)
      case 'bloodsugar':
        return input.match(/^([1-9]|[1-9][0-9]),([0-9])$/)
      default:
        return true
    }
  }

  return {
    isTimeValid,
    isDisabled,
    setIsTimeValid,
    validateTime,
    validateTypeInput,
    isObservationInputValid,
    setIsObservationInputValid,
  }
}
