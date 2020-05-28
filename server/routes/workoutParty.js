const express = require('express')

const WorkoutParty = require('../models/workoutParty')
const User = require('../models/user')
const Workout = require('../models/workout')

const wpRouter = express.Router()

// GET all
wpRouter.get('/', async(req, res) => {
	try {
		const wp = await WorkoutParty.find()
		res.json(wp)
	}
	catch(err) {
		res.status(400).json({error: 'Error retrieving workout parties.'})
	}
})

// GET by id
wpRouter.get('/:workout_party_id', async (req, res) => {
	const { workout_party_id } = req.params
	try {
		const wp = await WorkoutParty.findById(workout_party_id.trim())
		// if the workout party's ID doesn't exist
		if (wp == null) {
			throw new Error()
		}
		res.json(wp)
	}
	catch(err) {
		res.status(404).json({error: 'Error finding workout party.'})
	}
})

// POST create workout party
wpRouter.post('/', async (req, res) => {
	try {
		const wp = await WorkoutParty.create(req.body)
		res.status(201).json(wp)
	}
	catch(err) {
		res.status(400).json({error: 'Error creating workout party.'})
	}
})


// POST add workout
wpRouter.post('/:workout_party_id/workouts', async (req, res) => {
	const { workout_party_id } = req.params
	const { w } = req.body
	try {
		const wp = await WorkoutParty.findById(workout_party_id.trim())
		const workout = await Workout.findOne({ w })
		if (wp == null) {
			return res.status(400).json({ error: 'Invalid workout party.' })
		}
		else if (workout == null) {
			return res.status(400).json({ error: 'Invalid workout.' })
		}
		else if (wp.workouts.includes(workout._id)) {
			return res.status(400).json({ error: 'Workout already added to party. '})
		}
		wp.workouts.push(workout.id)
		await wp.save()
		res.end()
	}
	catch(err) {
		res.status(400).json({error: `Error adding workout: ${err}`})
	}
})


// POST add member
wpRouter.post('/:workout_party_id/users', async (req, res) => {
	const { workout_party_id } = req.params
	const { userID } = req.body
	try {
		// get the workout party and the user
		const wp = await WorkoutParty.findById(workout_party_id.trim())
		const user_id = await User.findById({ _id: userID })

		// workout party doesn't exist
		if (wp === null) {
			return res.status(400).json({ error: 'Invalid workout party.' })
		}
		// user doesn't exist
		else if (user_id === null) {
			return res.status(400).json({ error: 'Invalid user.' })
		}
		// user already in workout party
		else if (wp.members.includes(user_id._id)) {
			return res.status(400).json({ error: 'User already added to party. '})
		}

		// add workout party to the user's list
		user_id.workoutParties.push(wp.id)
		await user_id.save()
		wp.members.push(user_id.id)
		await wp.save()
		res.end()
	}
	catch(err) {
		res.status(400).json({error: `Error adding user: ${err}`})
	}
})


// PATCH update workout party
wpRouter.patch('/:workout_party_id', async (req, res) => {
	const { workout_party_id } = req.params
	try {
		// TEST THIS
		const wp = await WorkoutParty.findById(workout_party_id.trim())
		Object.assign(wp, req.body)
		await wp.save()
		res.end()
	}
	catch(err) {
		res.status(400).json({ error: 'Error updating workout party.' })
	}
})


// DELETE delete workout party
wpRouter.delete('/:workout_party_id', async (req, res) => {
	const { workout_party_id } = req.params
	try {
		// remove the workout party from every member's array
		const members = await User.find({ workoutParties: workout_party_id })
		for (const m of members) {
			m.workoutParties = m.workoutParties.filter((id) => {
				return !id.equals(workout_party_id)
			})
			await m.save()
		}
		await WorkoutParty.deleteOne({ _id: workout_party_id })
		res.end()
	}
	catch(err) {
		res.status(404).json({ error: 'Error deleting workout party.' })
	}
})


module.exports = wpRouter