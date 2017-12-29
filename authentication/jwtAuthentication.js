const jwt = require('jsonwebtoken');
const config = require('../config.js');

module.exports = {
	initializeToken(user) {
		return jwt.sign(user, config.secretKey, {
			expiresIn: '1h'
		});
	},
	verifyAdmin(token) {
		return new Promise((resolve) => {
			jwt.verify(token, config.secretKey, { maxAge: '1d' }, (err, decoded) => {
				if (err) reject(new Error('Δεν έχετε εξουσιοδότηση για αυτή την ενέργεια.'));
				resolve(decoded);
			});
		});
	}
};
