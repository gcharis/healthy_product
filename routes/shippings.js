const express = require('express');
const Shipping = require('../database/models/Shipping.js');
const checkAdmin = require('../authentication/bustAndLog.js');

const router = express.Router();

// If the check fails a status of 500 will be sent and
// a log will be saved
router.param('admin', checkAdmin);

router.get('/all/:admin', (req, res) => {
	Shipping.find((err, shippings) => {
		if (err) {
			console.error(`${new Date()}, Shippings could not get retrieved. ERROR, ${err}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send(shippings);
	});
});

router.post('/new/:admin', (req, res) => {
	const newShipping = new Shipping(req.body);
	newShipping.save((err, shipping) => {
		if (err) {
			console.error(`${new Date()}, Shipping could not be saved. ERROR, ${err}`);
			return res
				.status(500)
				.send(`Ο τρόπος αποστολής δεν ήταν δυνατόν να αποθηκευτεί. Κωδικός σφάλματος: ${err.message}`);
		}
		console.log(`${new Date()}, New shipping saved. name: ${shipping.name}`);
		res.send('Ο τρόπος αποστολής προστέθηκε επιτυχώς!');
	});
});

module.exports = router;
