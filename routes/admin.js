const express = require('express')
const Admin = require('../database/models/Admin.js')
const authentication = require('../authentication/jwtAuthentication.js')

const router = express.Router()

router.post('/register', (req, res) => {
    new Admin(req.body).save((err, admin) => {
        if (err) return res.status(500).send({
            message: `Δεν ήταν δυνατόν να δημιουργηθεί νέος admin. Κωδικός σφάλματος: ${err.message}`,
            err
        })
        res.send({ message: `Νέος admin με όνομα χρήστη ${admin.username} προστέθηκε επιτυχώς!`, admin })
    })
})

router.post('/login', (req, res) => {
    let adminToVerify = req.body

    Admin.findOne({ username: adminToVerify.username }, (err, admin) => {
        if (err) return res.status(500).send({ message: 'Κάποιο σφάλμα συνέβη.', err })
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

module.exports = router