const express = require('express');
const Data = require('../database/models/Data.js');
const checkAdmin = require('../authentication/bustAndLog.js');

const router = express.Router();

// If the check fails a status of 500 will be sent and
// a log will be saved
router.param('admin', checkAdmin);

router.get('/:admin', (req, res) => {
	Data.findOne({ label: req.query.label }, (err, data) => {
		if (err) {
			console.error(`${new Date()}, New data could not get retrieved. ERROR, ${err.message}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send(data);
	});
});

router.put('/:admin', (req, res) => {
	Data.update({ _id: req.body._id }, req.body, { upsert: true }, (err) => {
		if (err) {
			console.error(`${new Date()}, New data could not be saved. ERROR, ${err.message}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}

		res.send('Η νέα πληροφορία αποθηκεύτηκε επιτυχώς!');
	});
});

module.exports = router;
