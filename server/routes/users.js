const express = require('express')

const User = require('../models/user')
const WorkoutParty = require('../models/workoutParty')

const userRouter = express.Router()

// Before all requests under /users, authenticate the Facebook token they've
// passed in! (feel free to comment out during testing)
// Not doing this for ease of use!
// userRouter.use(authenticateWithFacebook)

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(400).json({ error: 'Error getting users.' })
  }
})

userRouter.get('/:userID', async (req, res) => {
  const { userID } = req.params
  try {
    const user = await User.findById(userID.trim())
    if (user === null) {
      throw new Error()
    }
    const friends = await User.find({ _id: { $in: user.friends } }).select(
      'username _id'
    )
    res.json({ ...user.toObject(), friends })
  } catch (err) {
    res.status(404).json({ error: 'Error finding user.' })
  }
})

userRouter.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ error: 'Error creating user.' })
  }
})

userRouter.post('/:userID/friends', async (req, res) => {
  const { userID } = req.params
  const { username } = req.body
  try {
    const user = await User.findById(userID.trim())
    const friend = await User.findOne({ username })

    if (user === null || friend === null) {
      return res
        .status(400)
        .json({ error: 'Invalid user id or friend username.' })
    } else if (friend.id === user.id || user.friends.includes(friend._id)) {
      return res.status(400).json({ error: 'Already friends.' })
    }

    // When a user adds a friend, they're both forced to be friends :)
    user.friends.push(friend.id)
    await user.save()
    friend.friends.push(user.id)
    await friend.save()
    res.end()
  } catch (err) {
    res.status(400).json({ error: `Error adding friend: ${err}` })
  }
})

// TODO: test
userRouter.post('/:userID/history', async (req, res) => {
  const { userID } = req.params
  const { workoutID } = req.body
  try {
    const user = await User.findById(userID.trim())
    user.workouts.push(workoutID)
    await user.save()
    res.end()
  } catch (err) {
    res.status(400).json({ error: 'Error adding workout.' })
  }
})

userRouter.patch('/:userID', async (req, res) => {
  const { userID } = req.params
  try {
    await User.updateOne({ _id: userID }, req.body)
    res.end()
  } catch (err) {
    res.status(400).json({ error: 'Error updating user.' })
  }
})

userRouter.delete('/:userID', async (req, res) => {
  const { userID } = req.params
  try {
    // Remove user from their friends' friends list
    const friends = await User.find({ friends: userID })
    for (const friend of friends) {
      friend.friends = friend.friends.filter((id) => id !== userID)
      await friend.save()
    }

    await User.deleteOne({ _id: userID })
    res.end()
  } catch (err) {
    res.status(404).json({ error: 'Error deleting user.' })
  }
})

module.exports = userRouter
