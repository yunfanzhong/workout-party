const express = require('express')

const WorkoutParty = require('../models/workoutParty')
const User = require('../models/user')

const wpRouter = express.Router()

// GET all
wpRouter.get('/', async (req, res) => {
	try {
		const wp = await WorkoutParty.find()
		res.json(wp)
	}
	catch(err) {
		res.status(400).json({error: 'Error retrieving workout party.'})
	}
})

// GET by id
wpRouter.get('/:partyID', async (req, res) => {
	const { partyID } = req.params
	try {
		const wp = await WorkoutParty.findById(partyID.trim())
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
		res.json(wp)
	}
	catch(err) {
		res.status(400).json({error: 'Error retrieving workout party.'})
	}
})


// POST add workout


// POST add member


// PATCH update workout party


// DELETE delete workout party


module.exports = wpRouter