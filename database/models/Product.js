const mongoose = require('mongoose');
const toGreeklish = require('../../custom_scripts/convertToGreeklish.js');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

let productSchema = new mongoose.Schema({
	name: { type: String, unique: true, required: [ true, `Το πεδίο 'Όνομα' είναι υποχρεωτικό` ] },
	slug: { type: String, unique: true },
	category: { type: Array, default: [] },
	shortDescription: String,
	description: String,
	price: { type: Number, required: [ true, `Το πεδίο 'Τιμή' είναι υποχρεωτικό` ] },
	salesPrice: Number,
	weight: { type: Number, required: [ true, `Το πεδίο 'Βάρος' είναι υποχρεωτικό` ] },
	amountForSale: String,
	stock: Number,
	creationDate: { type: Date, default: Date.now },
	expirationDate: Date,
	images: [ String ],
	featuredImage: { type: String, default: '' },
	premium: { type: Boolean, default: false },
	priority: { type: Number, default: null },
	viewCounter: { type: Number, default: 0 },
	isFeatured: { type: Boolean, default: false }
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

productSchema.plugin(autoIncrement.plugin, { model: 'product', field: 'id', startAt: 100000 });
const Product = mongoose.model('product', productSchema);

module.exports = Product;

String.prototype.toGreeklish = toGreeklish;
