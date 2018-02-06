const express = require('express');
const mongoose = require('mongoose');
const Data = require('../database/models/Data.js');
const checkAdmin = require('../authentication/bustAndLog.js');

const router = express.Router();

// If the check fails a status of 500 will be sent and
// a log will be saved
router.param('admin', checkAdmin);

router.get('/:label/:admin', (req, res) => {
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

module.exports = router;
