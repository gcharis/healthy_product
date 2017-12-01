const express = require('express')
const fs = require('fs')
const Admin = require('../database/models/Admin.js')
const authentication = require('../authentication/jwtAuthentication.js')

const router = express.Router()

router.post('/register', (req, res) => {
    new Admin(req.body).save((err, admin) => {
        if (err) return res.send({
            message: `Δεν ήταν δυνατόν να δημιουργηθεί νέος admin. Κωδικός σφάλματος: ${err.message}`,
            err
        })
        res.send({ message: `Νέος admin με όνομα χρήστη ${admin.username} προστέθηκε επιτυχώς!`, admin })
    })
})

router.post('/login', (req, res) => {
    let adminToVerify = req.body

    Admin.findOne({ username: adminToVerify.username }, (err, admin) => {
        if (err) return res.send({ message: 'Κάποιο σφάλμα συνέβη.', err })
        if (!admin) return res.status(500).send({ message: `Τα στοιχεία που δώσατε είναι λανθασμένα. Παρακαλώ προσπαθήστε ξανά.` })
        admin.comparePassword(adminToVerify.password, (err, isMatch) => {
            if (!isMatch) {
                return res.status(500).send({ message: `Τα στοιχεία που δώσατε είναι λανθασμένα. Παρακαλώ προσπαθήστε ξανά.` })
            }
            let token = authentication.initializeToken({ username: admin.username, password: admin.password })
            res.send({ message: `Καλώς ήρθατε ${admin.username}`, admin, token })
        })
    })
})

router.put('/update/:id', (req, res) => {
    let updatedAdmin = req.body
    let id = req.params.id

    Admin.findByIdAndUpdate(id, updatedAdmin, { new: true }, (err, admin) => {
        if (err) return res.send({
            message: `Τα στοιχεία δεν ήταν δυνατόν να ανανεωθούν. Κωδικός σφάλματος: ${err.message}`,
            err
        })
        if (!admin) return res.status(500).send({ message: 'Δεν βρέθηκε admin με αυτά τα στοιχεία.' })
        res.send({ message: `Τα στοιχεία σας ανανεώθηκαν με επιτυχία ${admin.username}!` })
    })
})

router.get('/logs', (req, res) => {
    new Promise(resolve => {
        fs.readFile(`${__dirname}/../logs/logs.txt`, 'utf-8', (err, data) => {
            if (err) throw err
            data = data ? JSON.parse(data) : data
            resolve(data)
        })
    })
        .then(logs => res.send(logs))
        .catch(err => res.send({ message: 'Κάποιο σφάλμα συνέβη.' }))
})

module.exports = router