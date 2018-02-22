const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
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

const AboutUs = mongoose.model('aboutUs', aboutUsSchema);

module.exports = AboutUs;
