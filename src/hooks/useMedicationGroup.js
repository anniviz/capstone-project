import { useEffect, useState } from 'react'

export default function useMedicationGroup(medications, medicationToEditId) {
  const [medGroupInputs, setMedGroupInputs] = useState({ time: '', meds: '' })

  useEffect(() => {
    const index = medications.findIndex(
      medication => medication.id === medicationToEditId
    )
    if (medicationToEditId) {
      const medicationToEdit = medications[index]
      const medsArray = medicationToEdit.meds.map(med => med.medName)
      setMedGroupInputs({
        time: medicationToEdit.time,
        meds: medsArray.join('\n'),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { medGroupInputs, setMedGroupInputs }
}
