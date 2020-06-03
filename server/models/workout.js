const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  days: {
    type: [String],
    required: true
  },
  hour: {
    type: Number,
    required: true
  },
  minute: {
    type: Number,
    required: true
  },
  music: mongoose.ObjectId,
  exercises: [
    {
      reps: Number,
      exerciseID: String
    }
  ]
})

module.exports = mongoose.model('Workout', workoutSchema)
