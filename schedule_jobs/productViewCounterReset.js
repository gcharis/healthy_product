const schedule = require('node-schedule');
const Product = require('../database/models/Product.js');

schedule.scheduleJob('0 0 0 1 * *', async (resetDate) => {
	try {
		const products = await Product.find();
		products.forEach(async (product) => {
			product.viewCounter = 0;
			await product.save();
		});
		console.log(`Products view counter reset on ${resetDate}`);
	} catch (err) {
		console.error(`${resetDate}, An error occurred while reseting products counter ERROR ${err}`);
	}
});
