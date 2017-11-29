const jwt = require('jsonwebtoken')
const config = require('../config.js')

module.exports = {
    initializeToken(user) {
        console.log(user)
        return jwt.sign(user, config.secretKey, {
            expiresIn: '1h'
        })
    }
}