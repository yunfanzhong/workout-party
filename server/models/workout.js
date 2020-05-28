const mongoose = require('mongoose').set('debug', true)

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startTime: Date,
  music: mongoose.ObjectId,
  exercises: [
    {
      reps: Number,
      exerciseID: String
    }
  ]
})

module.exports = mongoose.model('Workout', workoutSchema)
