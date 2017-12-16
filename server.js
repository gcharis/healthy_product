const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const connection = require('./database/connection.js');
const products = require('./routes/products.js');
const shippings = require('./database/models/Shippings.js');
const admin = require('./routes/admin.js');
const logger = require('./logs/logger.js');
const config = require('./config.js');

const app = express();
const port = process.env.PORT || config.port;

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	next();
});

// Morgan middleware
app.use(morgan('dev'));

// Body Parser middleware
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

// Ejs middleware
app.set('view engine', 'ejs');
app.set('views', __dirname);

// URI for static files
app.use('/public', express.static(__dirname + '/public'));

// Make refresh work on refresh for development reasons
// app.get('*', (err, res) => res.render('index'));
app.get('/', (err, res) => res.render('index'));

app.use('/products', products);
app.use('/shippings', shippings);
app.use('/admin', admin);

app.listen(port, () => console.log('Healthy Product started on port', port));
