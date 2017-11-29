const mongoose = require('mongoose')
const config = require('../config.js')

console.log('Connecting to database...')
mongoose.connect(config.db, err => {
    if (err) throw err
    console.log('Database connection established')
})
const connection = mongoose.connection

module.exports = connection