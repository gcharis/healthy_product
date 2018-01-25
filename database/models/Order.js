const mongoose = require('mongoose');
const mongooseTypes = require('mongoose-types');
mongooseTypes.loadTypes(mongoose, 'email');
const Email = mongoose.SchemaTypes.Email;
const autoIncrement = require('mongoose-auto-increment');

let orderSchema = new mongoose.Schema({
	customer: {
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		phone: { type: String, required: true },
		email: { type: Email, required: true }
	},
	shipping: {
		address: { type: String, required: true },
		city: { type: String, required: true },
		country: { type: String, required: true },
		zip: { type: String, required: true },
		company: { type: String, required: true },
		price: { type: Number, required: true }
	},
	items: [
		{
			id: { type: String, required: true },
			name: { type: String, required: true },
			amount: { type: String, required: true }
		}
	],
	total: { type: Number, required: true }
});

const Shipping = mongoose.model('shipping', shippingSchema);
module.exports = Shipping;
