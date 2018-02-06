const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
	label: { type: String, required: true, unique: true },
	content: { type: String, default: '' }
});

const Data = mongoose.model('data', dataSchema);

module.exports = Data;
