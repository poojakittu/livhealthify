const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: Buffer,
    required: true
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
