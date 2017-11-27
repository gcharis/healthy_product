const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logger = require('morgan')

const connection = require('./database/connection.js')
const products = require('./routes/products.js')

const app = express()
const port = 4000

// Morgan middleware
app.use(logger('dev'))

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Ejs middleware
app.set('view engine', 'ejs')
app.set('views', __dirname)

// URI for static files
app.use('/static', express.static(__dirname + '/public'))

app.get('/', (err, res) => res.render('index'))

app.use('/products', products)


app.listen(port, () => console.log('Healthy Product started on port', port))