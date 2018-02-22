const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const connection = require('./database/connection.js');
const products = require('./routes/products.js');
const categories = require('./routes/categories.js');
const shippings = require('./routes/shippings.js');
const orders = require('./routes/orders.js');
const admin = require('./routes/admin.js');
const datum = require('./routes/datum.js');
const images = require('./routes/images.js');
const aboutUs = require('./routes/aboutUs.js');
const config = require('./config.js');

require('./schedule_jobs/productViewCounterReset.js');

const app = express();

app.use(function(req, res, next) {
//http://localhost:9000

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	next();
});

// Morgan middleware
app.use(morgan('dev'));

// Body Parser middleware
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// Ejs middleware
app.set('view engine', 'ejs');
app.set('views', __dirname);

// URI for static files
app.use('/public', express.static(`${__dirname}/public`));

app.get('/', (err, res) => res.render('index'));

app.use('/products', products);
app.use('/categories', categories);
app.use('/shippings', shippings);
app.use('/admin', admin);
app.use('/orders', orders);
app.use('/datum', datum);
app.use('/images', images);
app.use('/aboutUs', aboutUs);

app.listen(config.port, () => console.log(`Healthy Product started on port ${config.port}`));
