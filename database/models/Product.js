const mongoose = require('mongoose');
const toGreeklish = require('../../custom_scripts/convertToGreeklish.js');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

let productSchema = new mongoose.Schema({
	name: { type: String, unique: true, required: [ true, `Το πεδίο 'Όνομα' είναι υποχρεωτικό` ] },
	slug: { type: String, unique: true },
	sku: { type: String, unique: true, required: [ true, `Το πεδίο 'Κωδικός' είναι υποχρεωτικό` ] },
	category: { type: Array, default: [] },
	description: String,
	price: { type: Number, required: [ true, `Το πεδίο 'Τιμή' είναι υποχρεωτικό` ] },
	salesPrice: Number,
	weight: { type: Number, required: [ true, `Το πεδίο 'Βάρος' είναι υποχρεωτικό` ] },
	amountForSale: String,
	stock: Number,
	creationDate: { type: Date, default: Date.now },
	expirationDate: Date,
	images: [ String ],
	featuredImage: String,
	premium: { type: Boolean, default: false },
	priority: { type: Number, default: null }
});

productSchema.pre('validate', function(next) {
	if (!this.name) throw new ReferenceError(`Το πεδίο 'Όνομα' είναι υποχρεωτικό`);
	this.slug = this.name.toGreeklish();

	if (!!this.priority) this.premium = true;
	next();
});

productSchema.pre('update', function(next) {
	this._update.$set.premium = !!this._update.$set.priority;
	next();
});

productSchema.plugin(autoIncrement.plugin, { model: 'product', field: 'id', startAt: 1000 });
const Product = mongoose.model('product', productSchema);

module.exports = Product;

String.prototype.toGreeklish = toGreeklish;
