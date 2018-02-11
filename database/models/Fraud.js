const mongoose = require('mongoose');
const { orderSchema } = require('./order.js');

const fraudSchema = new mongoose.Schema({
	name: String,
	lastname: String,
	description: String,
	order: orderSchema
});

const Fraud = mongoose.model('fraud', fraudSchema);

module.exports = Fraud;
