const express = require('express');
const Order = require('../database/models/Order.js');
const checkAdmin = require('../authentication/bustAndLog.js');
const axios = require('axios');

const router = express.Router();

// If the check fails a status of 500 will be sent and
// a log will be saved
router.param('admin', checkAdmin);

router.post('/all/:admin', async (req, res) => {
	const ordersPerPage = 30;
	const page = req.body.page;
	try {
		const orders = await Order.find()
			.sort({
				creationDate: -1
			})
			.skip((page - 1) * ordersPerPage)
			.limit(ordersPerPage);
		const totalOrders = await Order.count();
		const pages = Math.ceil(totalOrders / ordersPerPage);

		res.send({
			orders,
			pages
		});
	} catch (err) {
		console.error(`${new Date()}, Orders could not get retrieved. ERROR, ${err.message}`);
		return res.status(500).send('Κάποιο σφάλμα συνέβη.');
	}
});

router.get('/one/:id/:admin', (req, res) => {
	const id = req.params.id;
	Order.findOne({
		id
	}, (err, order) => {
		if (err) {
			console.error(`${new Date()}, Order could not get retrieved. ERROR, ${err.message}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send(order);
	});
});

router.get('/one/:id/', (req, res) => {
	const id = req.params.id;
	Order.findById(id).select('items, total').exec((err, order) => {
		if (err) {
			console.error(`${new Date()}, Order could not get retrieved. ERROR, ${err.message}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send(order);
	});
});

router.post('/new/', async (req, res) => {
	if (!req.body.recaptcha || req.body.recaptcha === ' ') return res.status(403).send('no captcha');
	const secretKey = process.env.CAPTCHA_KEY;
	const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body
		.recaptcha}&remoteip=${req.connection.remoteAddress}`;
	console.log(secretKey)
	const googleRes = await axios.post(verifyUrl);
	if (!googleRes.data || !googleRes.data.success) return res.status(403).send('No successfull captcha');

	const newOrder = new Order(req.body);
	newOrder.save((err, order) => {
		if (err) {
			console.error(`${new Date()}, Order could not be saved. ERROR, ${err.message}`);
			return res
				.status(500)
				.send(`Η παραγγελία δεν ήταν δυνατόν να αποθηκευτεί. Κωδικός σφάλματος: ${err.message}`);
		}
		console.log(`${new Date()}, New order saved. name: ${order.name}`);
		res.send(
			'Η παραγγελία παραδώθηκε επιτυχώς! Θα σας αποσταλεί σύντομα email με τις λεπτομέρειες της παραγγελίας.'
		);
	});
});

router.put('/one/:id/:admin', (req, res) => {
	const id = req.params.id;
	Order.update({
		_id: id
	}, req.body, {
		new: true
	}, (err, order) => {
		if (err) {
			console.error(`${new Date()}, Order could not be updated. ERROR, ${err.message}`);
			return res
				.status(500)
				.send(`Τα στοιχεία της παραγγελίας δεν ήταν δυνατόν να ανανεωθούν. Κωδικός σφάλματος: ${err.message}`);
		}
		res.send({
			message: `Τα στοιχεία παραγγελίας ${order.id} ανανεώθηκαν επιτυχώς!`,
			order
		});
	});
});

router.delete('/one/:id/:admin', (req, res) => {
	const id = req.params.id;
	Order.findByIdAndRemove(id, (err, order) => {
		if (err) {
			console.error(`${new Date()}, Order could not get deleted. ERROR, ${err.message}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send(`Η παραγγελία με αριθμό ${order.id} διαγράφηκε επιτυχώς!`);
	});
});

module.exports = router;