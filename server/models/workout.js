const mongoose = require('mongoose').set('debug', true)

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  weeklyTimes: [
    {
      day: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"),
      hour: {
        type: Number,
        minimum:0,
        maximum:23
      },
      minute: {
        type: Number,
        minimum:0,
        maximum:59
      },
  }],
  music: mongoose.ObjectId,
  exercises: [
    {
      reps: Number,
      exerciseID: String
    }
  ]
})

module.exports = mongoose.model('Workout', workoutSchema)