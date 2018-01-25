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

router.put('/one/:id/:admin', (req, res) => {
	const id = req.params.id;
	Shipping.findByIdAndUpdate(id, req.body, { new: true }, (err, shipping) => {
		if (err) {
			console.error(`${new Date()}, Shipping could not be updated. ERROR, ${err}`);
			return res
				.status(500)
				.send(
					`Τα στοιχεία του τρόπου αποστολής δεν ήταν δυνατόν να ανανεωθούν. Κωδικός σφάλματος: ${err.message}`
				);
		}
		res.send({ message: 'Τα στοιχεία του τρόπου αποστολής ανανεώθηκαν επιτυχώς!', category });
	});
});

router.delete('/one/:id/:admin', (req, res) => {
	const id = req.params.id;
	Shipping.findByIdAndRemove(id, (err, shipping) => {
		if (err) {
			console.error(`${new Date()}, Shipping could not get deleted. ERROR, ${err}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send(`Ο τρόπος αποστολής με όνομα ${shipping.name} διαγράφηκε επιτυχώς!`);
	});
});

module.exports = router;
