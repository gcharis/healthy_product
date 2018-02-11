const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
	name: { type: String, required: true },
	iban: { type: String, required: true },
	swift: String,
	accountNumber: { type: String, required: true }
});

const Bank = mongoose.model('bank', bankSchema);

module.exports = Bank;
