const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
	slider: { type: [ String ], default: [] }
});

const Slider = mongoose.model('slider', sliderSchema);

module.exports = Slider;
