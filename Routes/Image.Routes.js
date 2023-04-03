const express = require("express");
const multer = require("multer");
const Image = require("../Model/Image.Model");

const ImageRoutes = express();

const upload = multer({
  limits: {
    fileSize: 1000000, // 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image."));
    }

    cb(undefined, true);
  },
});

ImageRoutes.post("/upload", upload.single("image"), async (req, res) => {
  const image = new Image({
    name: req.body.name,
    image: req.file.buffer,
  });

  try {
    await image.save();
    res.send("Image uploaded successfully.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = ImageRoutes;
