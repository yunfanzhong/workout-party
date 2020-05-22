const express = require('express')

const User = require('../models/user')

// Used for getting the user data with the facebook ID.
const facebookRouter = express.Router()

facebookRouter.get('/:facebookID', async (req, res) => {
  const { facebookID } = req.params

  try {
    const user = await User.findOne({ facebookID })
    if (user === null) {
      res.status(404).json({ error: 'User not found.' })
    } else {
      res.json(user)
    }
  } catch (err) {
    res.status(400).json({ error: 'Error finding user.' })
  }
})

module.exports = facebookRouter
