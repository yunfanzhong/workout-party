const mongoose = require('mongoose').set('debug', true)

const workoutPartySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  members: [mongoose.ObjectId],
  workouts: [mongoose.ObjectId]
})

module.exports = mongoose.model('WorkoutParty', workoutPartySchema)
