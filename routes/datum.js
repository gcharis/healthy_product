const express = require('express');
const mongoose = require('mongoose');
const Data = require('../database/models/Data.js');
const Bank = require('../database/models/Bank.js');
const checkAdmin = require('../authentication/bustAndLog.js');

const router = express.Router();

// If the check fails a status of 500 will be sent and
// a log will be saved
router.param('admin', checkAdmin);

router.get('/:label', (req, res) => {
	Data.findOne({ label: req.params.label }, (err, data) => {
		if (err) {
			console.error(`${new Date()}, Datum could not get retrieved. ERROR, ${err.message}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send(data);
	});
});

router.put('/:admin', async (req, res) => {
	if (!req.body._id) {
		const newData = new Data(req.body);
		newData.save((err, input) => {
			if (err) {
				console.error(`${new Date()}, New data could not be saved. ERROR, ${err.message}`);
				return res.status(500).send('Κάποιο σφάλμα συνέβη.');
			}

			res.send({ message: 'Η νέα πληροφορία αποθηκεύτηκε επιτυχώς!', input });
		});
	} else {
		Data.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, input) => {
			if (err) {
				console.error(`${new Date()}, Data could not be updated. ERROR, ${err.message}`);
				return res.status(500).send('Κάποιο σφάλμα συνέβη.');
			}
			res.send({ message: 'Η νέα πληροφορία αποθηκεύτηκε επιτυχώς!', input });
		});
	}
});

router.get('/banks', (req, res) => {
	Bank.find((err, banks) => {
		if (err) {
			console.error(`${new Date()}, Banks could not get retrieved. ERROR, ${err.message}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send(banks);
	});
});

router.post('/banks', (req, res) => {
	const newBank = req.body;
	newBank.save((err, bank) => {
		if (err) {
			console.error(`${new Date()}, New bank could not be saved. ERROR, ${err.message}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}

		res.send({ message: 'Η νέα τράπεζα αποθηκεύτηκε επιτυχώς!', bank });
	});
});

router.put('/banks/:id', (req, res) => {
	const id = req.params.id;
	Bank.findByIdAndUpdate(id, req.body, { new: true }, (err, bank) => {
		if (err) {
			console.error(`${new Date()}, Bank could not be updated. ERROR, ${err.message}`);
			return res
				.status(500)
				.send(`Τα στοιχεία της τράπεζας δεν ήταν δυνατόν να ανανεωθούν. Κωδικός σφάλματος: ${err.message}`);
		}
		res.send({ message: 'Τα στοιχεία της τράπεζας ανανεώθηκαν επιτυχώς!', product });
	});
});

router.delete('/banks/:id', (req, res) => {
	let id = req.params.id;
	Bank.findByIdAndRemove(id, (err, bank) => {
		if (err) {
			console.error(`${new Date()}, Bank could not get deleted. ERROR, ${err.message}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send('Η τράπεζα διαγράφηκε επιτυχώς!');
	});
});

module.exports = router;
