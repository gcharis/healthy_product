const authentication = require('./jwtAuthentication.js');
const logger = require('../logs/logger.js');

module.exports = function(req, res, next) {
	const token = req.headers.token;
	if (!token) return res.send({ message: 'Χρείαζεστε έγκριση για αυτή την ενέργεια.' });

	// Verify admin
	authentication
		.verifyAdmin(token)
		.then((results) => next()) // An err object is created when the authentication fails
		.catch((err) => {
			const intruderIP = req.headers['x-appengine-user-ip'] || req.connection.remoteAddress;

			console.error(`Authentication failed for IP: ${intruderIP} on ${new Date()}`);

			const newLog = { date: new Date(), content: `Αποτυχημένη προσπάθεια σύνδεσης για την IP: ${intruderIP}` };

			logger.updateLogs(newLog).catch((err) => res.status(500));

			res.status(500).send(err.message);
		});
};
