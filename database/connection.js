const mongoose = require('mongoose')

console.log('Connecting to database...')
mongoose.connect('mongodb://localhost/healthy_product', err => {
    if (err) throw err
    console.log('Database connection established')
})
const connection = mongoose.connection

module.exports = connection