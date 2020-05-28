const mongoose = require('mongoose')

const workoutPartySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  members: [mongoose.ObjectId],
  workouts: [mongoose.ObjectId]
})

module.exports = mongoose.model('WorkoutParty', workoutPartySchema)
