const jwt = require('jsonwebtoken');
const config = require('../config.js');

module.exports = {
	initializeToken(user) {
		return jwt.sign(user, config.secretKey, {
			expiresIn: '2h'
		});
	},
	verifyAdmin(token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, config.secretKey, { maxAge: '2h' }, (err, decoded) => {
				if (err) reject(new Error('Δεν έχετε εξουσιοδότηση για αυτή την ενέργεια.'));
				resolve(decoded);
			});
		});
	}
};
