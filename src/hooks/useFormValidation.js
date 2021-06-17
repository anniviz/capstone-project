import { useEffect, useState } from 'react'

export default function useFormValidation(medGroupInputs) {
  const [isDisabled, setIsDisabled] = useState(true)
  const [isTimeValid, setIsTimeValid] = useState(true)

  useEffect(() => {
    validateForm()
    setIsTimeValid(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medGroupInputs])

  function validateForm() {
    setIsDisabled(
      medGroupInputs.time.trim().length === 0 ||
        medGroupInputs.meds.trim().length === 0
    )
  }

  function validateTime(time) {
    const timeFormat = /^([0-9]|[0-1][0-9]|2[0-3]):([0-5][0-9])$/

    return time.match(timeFormat) ? true : false
  }

  return { isTimeValid, isDisabled, setIsTimeValid, validateTime }
}
