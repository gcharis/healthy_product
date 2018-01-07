const express = require('express');
const Category = require('../database/models/Category.js');
const checkAdmin = require('../authentication/bustAndLog.js');

const router = express.Router();

// If the check fails a status of 500 will be sent and
// a log will be saved
router.param('admin', checkAdmin);

router.get('/all', (req, res) => {
	Category.find((err, categories) => {
		if (err) {
			console.error(new Date(), 'Categories could not get retrieved. ERROR', err);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send(categories);
	});
});

router.post('/new/:admin', (req, res) => {
	let newCategory = new Category(req.body);
	newCategory.save((err, category) => {
		if (err) {
			console.error(new Date(), 'Category could not be saved. ERROR', err);
			return res
				.status(500)
				.send(`Η κατηγορία δεν ήταν δυνατόν να αποθηκευτεί. Κωδικός σφάλματος: ${err.message}`);
		}
		console.log(new Date(), `New category saved. name: ${category.name}`);
		res.send('Η κατηγορία προστέθηκε επιτυχώς!');
	});
});

router.delete('/one/:id/:admin', (req, res) => {
	let id = req.params.id;
	console.log(id);
	Category.findByIdAndRemove(id, (err, category) => {
		if (err) {
			console.error(new Date(), 'category could not get deleted. ERROR', err);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send(`Το προϊόν με κωδικό ${category.name} διαγράφηκε επιτυχώς!`);
	});
});
module.exports = router;