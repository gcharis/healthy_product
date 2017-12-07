const express = require('express')
const Product = require('../database/models/Product.js')
const authentication = require('../authentication/jwtAuthentication.js')
const config = require('../config.js')
const checkAdmin = require('../authentication/bustAndLog.js')
const logger = require('../logs/logger.js')

const router = express.Router()

// If the check fails a status of 500 will be sent and
// a log will be saved
router.param('admin', checkAdmin)

router.get('/all', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: 'Κάποιο σφάλμα συνέβη.', err })
        res.send(products)
    })
})

router.get('/one/:id', (req, res) => {
    let id = req.params.id
    Product.findById(id, (err, product) => {
        if (err) return res.send({ message: 'Κάποιο σφάλμα συνέβη.', err })
        res.send(product)
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
    let id = req.params.id
    Product.findByIdAndUpdate(id, updatedProduct, { new: true }, (err, product) => {
        if (err) return res.status(500).send({
            message: `Τα στοιχεία του προϊόντος δεν ήταν δυνατόν να ανανεωθούν. Κωδικός σφάλματος: ${err.message}`,
            err
        })
        res.send({ message: 'Τα στοιχεία του προϊόντος ανανεώθηκαν επιτυχώς!', product })
    })
})

router.delete('/one/:id/:admin', (req, res) => {
    let id = req.params.id
    Product.findByIdAndRemove(id, (err, product) => {
        if (err) return res.status(500).send({ message: 'Κάποιο σφάλμα συνέβη.', err })
        res.send({ message: `Το προϊόν με κωδικό ${product.sku} διαγράφηκε επιτυχώς!` })
    })
})

router.delete('/multiple/:admin', (req, res) => {
    let ids = req.body

    ids.forEach(async id => {
        await Product.findByIdAndRemove(id, err => {
            if (err) return res.send({ message: 'Κάποιο σφάλμα συνέβη.', err })
        })
    });
    res.send({ message: 'Τα προϊόντα διαγράφηκαν επιτυχώς!' })
})

module.exports = router