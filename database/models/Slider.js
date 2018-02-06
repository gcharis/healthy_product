const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({ images: { type: [ String ], default: [] } });

const Slider = mongoose.model('slider', sliderSchema);

module.exports = Slider;
