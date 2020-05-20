const mongoose = require('mongoose')

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
      exerciseID: mongoose.ObjectId
    }
  ]
})

module.exports = mongoose.model('Workout', workoutSchema)