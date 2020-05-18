const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Music', musicSchema)