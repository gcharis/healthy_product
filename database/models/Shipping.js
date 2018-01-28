const mongoose = require('mongoose');

let shippingSchema = new mongoose.Schema({
	company: { type: String, required: true, unique: true },
	defaultPrice: { type: Number, required: true },
	maxWeight: { type: Number, default: 999999999 },
	startingSubtotal: { type: Number, default: 0 },
	upToSubtotal: { type: Number, default: null },
	priceAdded: { type: Number, default: 0 },
	description: String
});

const Shipping = mongoose.model('shipping', shippingSchema);
module.exports = Shipping;
