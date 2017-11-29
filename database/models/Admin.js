const mongoose = require('mongoose')
const mongooseTypes = require('mongoose-types')
mongooseTypes.loadTypes(mongoose, 'email')
const Email = mongoose.SchemaTypes.Email
const bcrypt = require('bcrypt')
const saltRounds = 10;

let adminSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: Email,
        required: true
    }
})

adminSchema.methods.comparePassword = function (candidatePassword, callBack) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return callBack(err)
        callBack(null, isMatch)
    })
}


adminSchema.pre('save', function (next) {
    let admin = this
    // generate a salt
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) console.error(err)
        // hash the password using our new salt
        bcrypt.hash(admin.password, salt, (err, hash) => {
            if (err) console.error(err)
            this.password = hash
            next()
        })
    })
})

const Admin = mongoose.model('admin', adminSchema)

module.exports = Admin