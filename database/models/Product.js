const mongoose = require('mongoose');
const toGreeklish = require('../../custom_scripts/convertToGreeklish.js');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

let productSchema = new mongoose.Schema({
	name: { type: String, unique: true, required: true },
	slug: { type: String, unique: true, required: true },
	sku: { type: String, unique: true, required: true },
	category: { type: Array, default: [] },
	description: String,
	price: { type: Number, required: true },
	salesPrice: Number,
	weight: { type: Number, required: true, default: 0 },
	amountForSale: String,
	stock: Number,
	creationDate: { type: Date, default: Date.now },
	expirationDate: Date,
	images: [ String ],
	featuredImage: String
});

productSchema.pre('validate', function(next) {
	if (!this.name) throw new ReferenceError(`Field 'name' for new product is not filled`);
	this.slug = this.name.toGreeklish();
	next();
});

productSchema.plugin(autoIncrement.plugin, { model: 'product', field: 'id', startAt: 1000 });
const Product = mongoose.model('product', productSchema);

module.exports = Product;

String.prototype.toGreeklish = toGreeklish;
