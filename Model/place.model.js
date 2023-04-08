const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number
  });
  
  // Define a mongoose model for the data
  const DataModel = mongoose.model('Data', dataSchema);

  module.exports = {
    DataModel
  };
  