const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone:{ type: Number, required: true },
  product: { type: String, required: true },
  category: { type: String, required: true },
  comment: { type: String, required: true },
  size: { type: String, required: true },
});

const ContactModel = mongoose.model('contact', ContactSchema);

module.exports = {ContactModel};

