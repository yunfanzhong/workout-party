const express = require('express')

const authenticateWithFacebook = require('../middleware/facebook-authentication')

const userRouter = express.Router()

// Before all requests under /users, authenticate the Facebook token they've
// passed in! (feel free to comment out during testing)
userRouter.use(authenticateWithFacebook)

// Currently just for testing!
userRouter.get('/:facebookID', (req, res) => {
  const { facebookID } = req.params

  // TODO: Find user based on their facebook ID
  const user = {
    facebookID,
    id: '4',
    username: 'jk.jewik',
    displayName: 'JSON Jewik',
    lastLoggedIn: new Date()
  }

  res.json(user)
})

module.exports = userRouter
