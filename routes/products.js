const express = require('express');
const Product = require('../database/models/Product.js');
const checkAdmin = require('../authentication/bustAndLog.js');

const router = express.Router();

// If the check fails a status of 500 will be sent and
// a log will be saved
router.param('admin', checkAdmin);

router.get('/all', (req, res) => {
	Product.find({}, (err, products) => {
		if (err) {
			console.error(`${new Date()}, Products could not get retrieved. ERROR, ${err.message}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send(products);
	});
});

router.get('/one/:id', (req, res) => {
	let id = req.params.id;
	Product.findById(id, (err, product) => {
		if (err) {
			console.error(`${new Date()}, Product could not get retrieved. ERROR, ${err.message}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send(product);
	});
});

router.get('/one-slug/:slug', (req, res) => {
	let slug = req.params.slug;
	Product.findOne({ slug }, (err, product) => {
		if (err) {
			console.error(`${new Date()}, Product could not get retrieved. ERROR, ${err.message}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη');
		}
		res.send(product);
	});
});

router.post('/by-category/:category/', async (req, res) => {
	const searchCategory = req.params.category;
	const productsPerPage = 24;
	const page = req.body.page;
	try {
		const products = await Product.find({
			$or: [ { 'category.slug': searchCategory }, { 'category.name': searchCategory } ]
		})
			.select('-images, -creationDate')
			.sort({ priority: 1 })
			.skip((page - 1) * productsPerPage)
			.limit(productsPerPage);
		const totalProducts = await Product.count();
		const pages = Math.ceil(totalProducts / productsPerPage);

		res.send({ products, pages });
	} catch (err) {
		console.error(`${new Date()}, Products could not get retrieved. ERROR, ${err.message}`);
		return res.status(500).send('Κάποιο σφάλμα συνέβη.');
	}
});

router.post('/new/:admin', (req, res) => {
	let newProduct = new Product(req.body);
	newProduct.save((err, product) => {
		if (err) {
			console.error(`${new Date()}, Product could not be saved. ERROR, ${err.message}`);
			return res.status(500).send(`Το προϊόν δεν ήταν δυνατόν να αποθηκευτεί. Κωδικός σφάλματος: ${err.message}`);
		}
		res.send('Το προϊόν προστέθηκε επιτυχώς!');
	});
});

router.put('/one/:id/:admin', (req, res) => {
	let id = req.params.id;
	Product.findByIdAndUpdate(id, req.body, { new: true }, (err, product) => {
		if (err) {
			console.error(`${new Date()}, Product could not be updated. ERROR, ${err.message}`);
			return res
				.status(500)
				.send(`Τα στοιχεία του προϊόντος δεν ήταν δυνατόν να ανανεωθούν. Κωδικός σφάλματος: ${err.message}`);
		}
		res.send({ message: 'Τα στοιχεία του προϊόντος ανανεώθηκαν επιτυχώς!', product });
	});
});

router.delete('/one/:id/:admin', (req, res) => {
	let id = req.params.id;
	Product.findByIdAndRemove(id, (err, product) => {
		if (err) {
			console.error(`${new Date()}, Product could not get deleted. ERROR, ${err.message}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send(`Το προϊόν με κωδικό ${product.sku} διαγράφηκε επιτυχώς!`);
	});
});

router.delete('/multiple/:admin', (req, res) => {
	let ids = req.body;

	ids.forEach(async (id) => {
		await Product.findByIdAndRemove(id, (err) => {
			if (err) {
				console.error(`${new Date()}, Product could not get deleted. ERROR, ${err.message}`);
				return res.status(500).send('Κάποιο σφάλμα συνέβη.');
			}
		});
	});
	res.send('Τα προϊόντα διαγράφηκαν επιτυχώς!');
});

module.exports = router;
