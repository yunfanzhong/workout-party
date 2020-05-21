const express = require('express')

const User = require('../models/user')

// Used for getting the user data with the facebook ID.
const facebookRouter = express.Router()

facebookRouter.get('/:facebookID', async (req, res) => {
  const { facebookID } = req.params

  try {
    const user = await User.findOne({ facebookID }).exec()
    res.json(user)
  } catch (err) {
    res.status(404).json({ error: 'User not found.' })
  }

  res.json(user)
})

module.exports = facebookRouter
