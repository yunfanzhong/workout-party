const express = require('express')

const User = require('../models/user')
const WorkoutParty = require('../models/workoutParty')

const userRouter = express.Router()

// Before all requests under /users, authenticate the Facebook token they've
// passed in! (feel free to comment out during testing)
// Not doing this for ease of use!
// userRouter.use(authenticateWithFacebook)

userRouter.get('/', async (req, res) => {})

userRouter.get('/:userID', async (req, res) => {})

userRouter.post('/', async (req, res) => {})

userRouter.post('/:userID/friends', async (req, res) => {})

userRouter.post('/:userID/history', async (req, res) => {})

userRouter.patch('/:userID', async (req, res) => {})

userRouter.delete('/:userID', async (req, res) => {})

module.exports = userRouter
