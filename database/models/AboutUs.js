const mongoose = require('mongoose');

const aboutAsSchema = new mongoose.Schema({
	images: [{
        shortDescription: {
            type: String,
            required: true
        },
        base64String: {
            type: String,
            required: true
        },
        order: {
            type: Number,
            required: true
        }
    }],
	description: {
        type: String,
        required: true
    }
});

const AboutUs = mongoose.model('aboutAs', bankSchema);

module.exports = AboutUs;
