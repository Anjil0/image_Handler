const mongoose = require("mongoose");

const uploadFileUrlSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: true,
  },
  originalFileName: {
    type: String,
    required: true,
    unique: true,
  },
  imagePublicID: {
    type: String,
    required: true,
  },
});

const UploadFileUrl = mongoose.model("UploadFileUrl", uploadFileUrlSchema);

module.exports = UploadFileUrl;
