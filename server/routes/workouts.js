const express = require('express')

const Workout = require('../models/workout')
const WorkoutParty = require('../models/workoutParty')

const workoutRouter = express.Router()

// GET all
workoutRouter.get('/', async(req, res) => {
	try {
		const w = await Workout.find()
		res.json(w)
	}
	catch(err) {
		res.status(400).json({error: 'Error retrieving workouts.'})
	}
})

// GET by id
workoutRouter.get('/:workout_id', async (req, res) => {
	const { workout_id } = req.params
	try {
		const w = await Workout.findById(workout_id.trim())
		// if the workout's ID doesn't exist
		if (w == null) {
			throw new Error()
		}
		res.json(w)
	}
	catch(err) {
		res.status(404).json({error: 'Error finding workout.'})
	}
})

// POST create workout
workoutRouter.post('/', async (req, res) => {
	try {
		const w = await Workout.create(req.body)
		res.status(201).json(w)
	}
	catch(err) {
		res.status(400).json({error: 'Error adding workout.'})
	}
})

// PATCH update workout
workoutRouter.patch('/:workout_id', async (req, res) => {
	const { workout_id } = req.params
	try {
		const w = await Workout.findById(workout_id.trim())
		if (w === null) {
			return res.status(400).json({ error: 'Invalid workout.' })
		}
		Object.assign(w, req.body)
		await w.save()
		res.end()
	}
	catch(err) {
		res.status(400).json({ error: `Error updating workout. ${err}` })
	}
})

// DEL delete workout
workoutRouter.delete('/:workout_id', async (req, res) => {
	const { workout_id } = req.params
	try {
		// remove the workout from every workout party's array
		const parties = await WorkoutParty.find({ workouts: workout_id })
		for (const p of parties) {
			p.workouts = p.workouts.filter((id) => {
				return !id.equals(workout_id)
			})
			await p.save()
		}
		await Workout.deleteOne({ _id: workout_id })
		res.end()
	}
	catch(err) {
		res.status(404).json({ error: 'Error deleting workout.' })
	}
})


module.exports = workoutRouter