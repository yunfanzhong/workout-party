const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  facebookID: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  lastLoggedIn: {
    type: Date,
    default: Date.now
  },
  workoutParties: [mongoose.ObjectId],
  workoutHistory: [mongoose.ObjectId],
  friends: [mongoose.ObjectId]
})

module.exports = mongoose.model('User', userSchema)
