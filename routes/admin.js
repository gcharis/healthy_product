const express = require('express');
const path = require('path');
const Admin = require('../database/models/Admin.js');
const Log = require('../database/models/Log.js');
const authentication = require('../authentication/jwtAuthentication.js');

const router = express.Router();

router.post('/verify', (req, res) => {
	if (!req.headers.token) return res.sendStatus(500).send('No token found');

	authentication
		.verifyAdmin(req.headers.token)
		.then((results) => res.send('Admin verified'))
		.catch((err) => res.sendStatus(500).send(err.message));
});

router.post('/pre-register', (req, res) => {
	if (req.body.registerKey !== 'test')
		return res.sendStatus(500).send('Δεν έχετε εξουσιοδότηση για αυτή την ενέργεια.');
	res.sendFile(path.resolve(`../healthy_product/public/views/register.html`));
});

router.post('/register', (req, res) => {
	new Admin(req.body).save((err, admin) => {
		if (err) {
			console.error(new Date(), 'Register fail. ERROR', err);
			return res
				.status(500)
				.send(`Δεν ήταν δυνατόν να δημιουργηθεί νέος admin. Κωδικός σφάλματος: ${err.message}`);
		}
		let token = authentication.initializeToken({ username: admin.username, password: admin.password });
		res.send({ message: `Νέος admin με όνομα χρήστη ${admin.username} προστέθηκε επιτυχώς!`, admin, token });
	});
});

router.post('/login', (req, res) => {
	let adminToVerify = req.body;

	Admin.findOne({ username: adminToVerify.username }, (err, admin) => {
		if (err) {
			console.error(new Date(), 'Login fail. ERROR', err);
			return res.sendStatus(500).send('Κάποιο σφάλμα συνέβη.');
		}
		if (!admin)
			return res.sendStatus(500).send('Τα στοιχεία που δώσατε είναι λανθασμένα. Παρακαλώ προσπαθήστε ξανά.');
		admin.comparePassword(adminToVerify.password, (err, isMatch) => {
			if (!isMatch) {
				return res.sendStatus(500).send('Τα στοιχεία που δώσατε είναι λανθασμένα. Παρακαλώ προσπαθήστε ξανά.');
			}
			let token = authentication.initializeToken({ username: admin.username, password: admin.password });
			res.send({ message: `Καλώς ήρθατε ${admin.username}`, admin, token });
		});
	});
});

router.put('/update/:id', (req, res) => {
	let updatedAdmin = req.body;
	let id = req.params.id;

	Admin.findByIdAndUpdate(id, updatedAdmin, { new: true }, (err, admin) => {
		if (err) {
			console.error(new Date(), 'Admin info update failed. ERROR', err);
			return res
				.status(500)
				.send(`Τα στοιχεία δεν ήταν δυνατόν να ανανεωθούν. Κωδικός σφάλματος: ${err.message}`);
		}
		if (!admin) return res.sendStatus(500).send('Δεν βρέθηκε admin με αυτά τα στοιχεία.');
		res.send(`Τα στοιχεία σας ανανεώθηκαν με επιτυχία ${admin.username}!`);
	});
});

router.get('/logs', (req, res) => {
	Log.find({}, (err, logs) => {
		if (err) {
			console.error(new Date(), 'Logs could not get retrieved. ERROR', err);
			return res.sendStatus(500).send('Κάποιο σφάλμα συνέβη.');
		}
		if (!logs) return res.sendStatus(500).send('Δεν βρέθηκαν καταγεγραμμένα γεγονότα.');
		res.send(logs);
	});
});

module.exports = router;
