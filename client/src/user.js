const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	displayname: {
		type: String,
		required: true
	},
	lastLoggedIn: Date,
	workoutParties: [mongoose.ObjectId],
	workoutHistory: [mongoose.ObjectId],
	friends: [mongoose.ObjectId]
})

module.exports = mongoose.model('User', userSchema)