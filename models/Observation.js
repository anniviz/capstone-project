const mongoose = require('mongoose')

const observationSchema = {
  id: { type: String, required: true },
  time: { type: String, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  observationValue: { type: String, required: true },
}

const observationsSchema = {
  date: { type: String, required: true },
  observations: [observationSchema],
}

module.exports = mongoose.model('Observation', observationsSchema)
