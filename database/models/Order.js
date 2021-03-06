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
		email: { type: Email }
	},
	shipping: {
		address: { type: String, required: true },
		city: { type: String, required: true },
		country: { type: String, required: true },
		zip: { type: String },
		company: { type: String, required: true },
		price: { type: Number, required: true }
	},
	items: [
		{
			id: { type: String, required: true },
			name: { type: String, required: true },
			price: { type: Number, required: true },
			amount: { type: Number, required: true },
			amountForSale: String,
			weight: { type: Number, required: true }
		}
	],
	payment: {
		method: { type: String, required: true },
		cost: { type: Number, required: true },
		bank: { type: String, default: '' }
	},
	total: { type: Number, required: true },
	comments: { type: String, default: '' },
	status: { type: String, default: 'Νέα Παραγγελία' },
	creationDate: { type: Date, default: Date.now },
	lastUpdate: { type: Date, default: Date.now }
});

orderSchema.pre('update', function(next) {
	this._update.$set.lastUpdate = new Date();
	next();
});

orderSchema.plugin(autoIncrement.plugin, { model: 'order', field: 'id', startAt: 100000 });

const Order = mongoose.model('order', orderSchema);
module.exports = Order;
exports.orderSchema = orderSchema;
