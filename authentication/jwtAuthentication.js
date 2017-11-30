const jwt = require('jsonwebtoken')
const config = require('../config.js')

module.exports = {
    initializeToken(user) {
        return jwt.sign(user, config.secretKey, {
            expiresIn: '1h'
        })
    },
    verifyAdmin(token) {
        return new Promise(resolve => {
            jwt.verify(token, config.secretKey, (err, decoded) => {
                if (err) throw err
                resolve(decoded)
            })
        })
    }
}