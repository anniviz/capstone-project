const mongoose = require('mongoose')

const medsSchema = {
  id: { type: String, required: true },
  medName: { type: String, required: true },
}

const medicationSchema = {
  id: { type: String, required: true },
  meds: [medsSchema],
}

const medicationsSchema = {
  date: { type: Date, required: true },
  observations: [medicationSchema],
}

module.exports = mongoose.model('Medications', medicationsSchema)
