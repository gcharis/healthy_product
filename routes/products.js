const express = require('express')
const Product = require('../database/models/Product.js')

const router = express.Router()

router.get('/all', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: 'Κάποιο σφάλμα συνέβη.', err })
        res.send(products)
    })
})

router.get('/by-category/:category', (req, res) => {
    let searchCategory = req.params.category
    Product.find({ category: searchCategory }, (err, products) => {
        if (err) return res.status(500).send({ message: 'Κάποιο σφάλμα συνέβη.', err })
        res.send(products)
    })
})

router.post('/new', (req, res) => {
    let newProduct = new Product(req.body)
    newProduct.save((err, product) => {
        if (err) return res.status(500).send({
            message: `Το προϊόν δεν ήταν δυνατόν να αποθηκευτεί. Κωδικός σφάλματος: ${err.message}`,
            err
        })
        res.send({ message: 'Το προϊόν προστέθηκε επιτυχώς!', product })
    })
})

router.put('/one', (req, res) => {
    Product.findByIdAndUpdate(_id, updatedProduct, { new: true }, (err, product) => {
        if (err) return res.status(500).send({
            message: 'Τα στοιχεία του προϊόντος δεν ήταν δυνατόν να ανανεωθούν.',
            err
        })
        res.send({ message: 'Τα στοιχεία του προϊόντος ανανεώθηκαν επιτυχώς!', product })
    })
})

module.exports = router