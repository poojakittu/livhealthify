const express = require("express");
const { DataModel } = require("../Model/place.model");
const dataRoutes = express.Router();




dataRoutes.post('/data', (req, res) => {
    const { name, latitude, longitude } = req.body;
    console.log(name)
  
    // Create a new data object
    const newData = new DataModel({ name, latitude, longitude });
  
    // Save the data object to the database
    newData.save((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  });
  
  // GET endpoint to find nearby data
  dataRoutes.get('/data/nearby', (req, res) => {
    const { latitude, longitude,name } = req.query;
  
    // Find data within a certain radius from the given latitude and longitude
    DataModel.find({
      name:req.query.name,
      latitude: { $gte: latitude - 0.1, $lte: latitude + 0.1 },
      longitude: { $gte: longitude - 0.1, $lte: longitude + 0.1 }
    }, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  });

  module.exports = {
    dataRoutes,
  };
  
  