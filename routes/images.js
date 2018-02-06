const express = require('express');
const Slider = require('../database/models/Slider.js');
const checkAdmin = require('../authentication/bustAndLog.js');

const router = express.Router();

// If the check fails a status of 500 will be sent and
// a log will be saved
router.param('admin', checkAdmin);

router.get('/slider', (req, res) => {
	Slider.find((err, sliders) => {
		if (err) {
			console.error(`${new Date()}, Slider could not get retrieved. ERROR, ${err.message}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send(sliders);
	});
});

router.put('/slider/:admin', (req, res) => {
	console.log(req.body._id);
	if (!req.body._id) {
		const newSlider = new Slider(req.body);
		newSlider.save((err, slider) => {
			if (err) {
				console.error(`${new Date()}, New slider could not be saved. ERROR, ${err.message}`);
				return res.status(500).send('Κάποιο σφάλμα συνέβη.');
			}

			res.send({ message: 'Το νέο slider αποθηκεύτηκε επιτυχώς!', slider });
		});
	} else {
		Slider.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, slider) => {
			if (err) {
				console.error(`${new Date()}, Slider could not be updated. ERROR, ${err.message}`);
				return res.status(500).send('Κάποιο σφάλμα συνέβη.');
			}
			res.send({ message: 'Το νέο slider αποθηκεύτηκε επιτυχώς!', slider });
		});
	}
});

module.exports = router;
