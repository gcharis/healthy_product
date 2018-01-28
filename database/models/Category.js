const mongoose = require('mongoose');
const toGreeklish = require('../../custom_scripts/convertToGreeklish.js');

let categorySchema = new mongoose.Schema({
	name: { type: String, unique: true, required: true },
	slug: { type: String, unique: true, required: true },
	description: { type: String, default: '' },
	parent: { type: String, default: '' }
});

categorySchema.pre('validate', function(next) {
	if (!this.name) throw new ReferenceError(`Field 'name' for new category is not filled`);
	this.slug = this.name.toGreeklish();
	next();
});

categorySchema.pre('save', async function(next) {
	const parent = await this.constructor.findOne({ $or: [ { name: this.parent }, { slug: this.parent } ] });

	this.parent = !!parent ? parent._id : '';
	next();
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
