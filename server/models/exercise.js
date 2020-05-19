const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Exercise', exerciseSchema)
