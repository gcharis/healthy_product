const mongoose = require('mongoose');
const toGreeklish = require('../../custom_scripts/convertToGreeklish.js');

let categorySchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	slug: {
		type: String,
		unique: true,
		required: true
	},
	description: {
		type: String,
		default: ''
	},
	parent: {
		type: String,
		default: '',
		required: true
	}
});

categorySchema.pre('validate', function (next) {
	if (!this.name) throw new ReferenceError(`Field 'name' for new category is not filled`);
	this.slug = this.name.toGreeklish();
	next();
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;