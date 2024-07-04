const express = require("express");
const multer = require("multer");
const uploadImage = express.Router();

const upload = require("./uploadImageController");

const uploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 },
});


uploadImage.post("/upload", uploader.single("file"), upload);

module.exports = uploadImage;
