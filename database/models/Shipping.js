const mongoose = require('mongoose');

let shippingSchema = new mongoose.Schema({
	defaultPrice: {
		type: Number,
		required: true
	},
	maxWeight: {
		type: Number,
		required: true
	},
	startingSubtotal: {
		type: Number,
		default: 0,
		required: true
	},
	upToSubtotal: {
		type: Number,
		required: true
	},
	priceAdded: {
		type: Number,
		required: true
	}
});

const Shipping = mongoose.model('shipping', shippingSchema);

module.exports = Shipping;
