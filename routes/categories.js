const express = require('express');
const Category = require('../database/models/Category.js');
const checkAdmin = require('../authentication/bustAndLog.js');

const router = express.Router();

// If the check fails a status of 500 will be sent and
// a log will be saved
router.param('admin', checkAdmin);

router.get('/all/:admin', (req, res) => {
	Category.find((err, categories) => {
		if (err) {
			console.error(`${new Date()}, Categories could not get retrieved. ERROR, ${err}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send(categories);
	});
});

router.get('/one/:id/:admin', async (req, res) => {
	const id = req.params.id;
	const category = await Category.findById(id);

	try {
		if (!!category.parent) {
			const parent = await Category.findById(category.parent);
			category.parent = parent.name;
		}
	} catch (err) {
		return res.status(500).send(err.toString());
	}

	res.send(category);
});

router.post('/new/:admin', (req, res) => {
	const newCategory = new Category(req.body);
	newCategory.save((err, category) => {
		if (err) {
			console.error(`${new Date()}, Category could not be saved. ERROR, ${err}`);
			return res
				.status(500)
				.send(`Η κατηγορία δεν ήταν δυνατόν να αποθηκευτεί. Κωδικός σφάλματος: ${err.message}`);
		}
		console.log(`${new Date()}, New category saved. name: ${category.name}`);
		res.send('Η κατηγορία προστέθηκε επιτυχώς!');
	});
});

router.put('/one/:id/:admin', async (req, res) => {
	const categoryParent = req.body.parent;
	const parent = await Category.findOne({ $or: [ { name: categoryParent }, { slug: categoryParent } ] });

	const updatedCategory = { ...req.body, parent: parent ? parent._id : '' };
	const id = req.params.id;

	Category.findByIdAndUpdate(id, updatedCategory, { new: true }, (err, category) => {
		if (err) {
			console.error(`${new Date()}, Category could not be updated. ERROR, ${err.message}`);
			return res
				.status(500)
				.send(`Τα στοιχεία της κατηγορίας δεν ήταν δυνατόν να ανανεωθούν. Κωδικός σφάλματος: ${err.message}`);
		}
		res.send({ message: 'Τα στοιχεία της κατηγορίας ανανεώθηκαν επιτυχώς!', category });
	});
});

router.put('/multiple/:admin', (req, res) => {
	const { categories } = req.body;
	try {
		categories.forEach(async (category) => await Category.findByIdAndUpdate(category._id, category));
	} catch (err) {
		console.error(`${new Date()}, Multiple categories could not be updated. ERROR, ${err.message}`);
		return res.status(500).send('Ένα σφάλμα συνέβη.');
	}
});

router.delete('/one/:id/:admin', (req, res) => {
	const id = req.params.id;
	Category.findByIdAndRemove(id, (err, category) => {
		if (err) {
			console.error(`${new Date()}, Category could not get deleted. ERROR, ${err}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send(`Η κατηγορία με όνομα ${category.name} διαγράφηκε επιτυχώς!`);
	});
});

router.put('/clear-navbar', async (req, res) => {
	try {
		const categories = await Category.find();
		categories.forEach(async (category) => {
			category.navigationBarOrder = null;
			category.isInNavigationBar = false;
			await category.save();
		});

		res.send('Η μπάρα των κατηγοριών ανανεώθηκε επιτυχώς!');
	} catch (err) {
		console.error(`${new Date()}, Navigation bar could not get deleted. ERROR, ${err.message}`);
		return res.status(500).send('Κάποιο σφάλμα συνέβη.');
	}
});

router.get('/navigation-bar', (req, res) => {
	Category.find({ isInNavigationBar: true })
		.sort({ navigationBarOrder: 1 })
		.select({ name: 1, slug: 1 })
		.exec((err, navBar) => {
			if (err) {
				console.error(`${new Date()}, Navigation bar could not get retrieved. ERROR, ${err.message}`);
				return res.status(500).send('Κάποιο σφάλμα συνέβη.');
			}
			res.send(navBar);
		});
});

module.exports = router;
