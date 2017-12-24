const mongoose = require('mongoose');

let logSchema = new mongoose.Schema({
	dateCreated: {
		type: Date,
		default: new Date(),
		required: true
	},
	content: {
		type: String,
		required: true
	}
});

const Log = mongoose.model('log', logSchema);

module.exports = Log;
