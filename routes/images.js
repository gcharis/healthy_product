const express = require('express');
const Slider = require('../database/models/Slider.js');
const checkAdmin = require('../authentication/bustAndLog.js');

const router = express.Router();

// If the check fails a status of 500 will be sent and
// a log will be saved
router.param('admin', checkAdmin);

router.get('/slider/:admin', (req, res) => {
	Slider.find((err, slider) => {
		if (err) {
			console.error(`${new Date()}, Slider could not get retrieved. ERROR, ${err.message}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send(slider);
	});
});

router.put('/slider/:admin', (req, res) => {
	Slider.update({ _id: req.body._id }, req.body, { upsert: true }, (err) => {
		if (err) {
			console.error(`${new Date()}, Slider could not be saved. ERROR, ${err.message}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}

		res.send('Το νέο slider αποθηκεύτηκε επιτυχώς!');
	});
});

module.exports = router;
