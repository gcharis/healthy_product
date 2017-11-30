const express = require('express')
const Product = require('../database/models/Product.js')
const authentication = require('../authentication/jwtAuthentication.js')
const config = require('../config.js')

const router = express.Router()

router.param('admin', (req, res, next, value, nameOfParameter) => {
    let token = req.body.token
    // Verify admin
    authentication.verifyAdmin(token)
        .then(results => next())
        .catch(err => {
            let intruderIP = req.headers['x-appengine-user-ip'] || req.connection.remoteAddress

            console.error(`Authentication failed for IP: ${intruderIP} on ${new Date()}`)
            res.status(500).send({ message: 'Δεν έχετε εξουσιοδότηση για αυτή την ενέργεια.' })
        })
})

router.get('/all', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: 'Κάποιο σφάλμα συνέβη.', err })
        res.send(products)
    })
})

router.get('/by-category/:category/', (req, res) => {
    let searchCategory = req.params.category
    Product.find({ category: searchCategory }, (err, products) => {
        if (err) return res.status(500).send({ message: 'Κάποιο σφάλμα συνέβη.', err })
        res.send(products)
    })
})

router.post('/new/:admin', (req, res) => {
    let newProduct = new Product(req.body)
    newProduct.save((err, product) => {
        if (err) return res.status(500).send({
            message: `Το προϊόν δεν ήταν δυνατόν να αποθηκευτεί. Κωδικός σφάλματος: ${err.message}`,
            err
        })
        res.send({ message: 'Το προϊόν προστέθηκε επιτυχώς!', product })
    })
})

router.put('/one/:id/:admin', (req, res) => {
    let _id = req.params.id
    Product.findByIdAndUpdate(_id, updatedProduct, { new: true }, (err, product) => {
        if (err) return res.status(500).send({
            message: 'Τα στοιχεία του προϊόντος δεν ήταν δυνατόν να ανανεωθούν.',
            err
        })
        res.send({ message: 'Τα στοιχεία του προϊόντος ανανεώθηκαν επιτυχώς!', product })
    })
})

router.delete('/one/:id/:admin', (req, res) => {
    let _id = req.params.id
    Product.findByIdAndRemove(_id, (err, product) => {
        if (err) return res.status(500).send({
            message: 'Το προϊόν δεν ήταν δυνατόν να διαγραφεί.',
            err
        })
        res.send({ message: `Το προϊόν με κωδικό ${product.sku} διαγράφτηκε επιτυχώς!` })
    })
})

module.exports = router