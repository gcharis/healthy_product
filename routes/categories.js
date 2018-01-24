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
			console.error(`${new Date()}, Category could not be updated. ERROR, ${err}`);
			return res
				.status(500)
				.send(`Τα στοιχεία της κατηγορίας δεν ήταν δυνατόν να ανανεωθούν. Κωδικός σφάλματος: ${err.message}`);
		}
		res.send({ message: 'Τα στοιχεία της κατηγορίας ανανεώθηκαν επιτυχώς!', category });
	});
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
module.exports = router;
