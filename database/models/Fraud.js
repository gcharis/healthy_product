const mongoose = require('mongoose');

const fraudSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	description: String,
	orderId: [ String ]
});

const Fraud = mongoose.model('fraud', fraudSchema);

module.exports = Fraud;
