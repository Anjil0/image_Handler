const UploadFileUrl = require("./imageModel");
const {
  uploadOnCloudinary,
  deleteImageOnCloudinary,
} = require("../utils/cloudinary");
const fs = require("fs");

const uploadImage = async (req, res) => {
  let uploadResponse = null;

  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const originalFileName = file.originalname;

    if (!originalFileName) {
      console.error("File name is missing");
      return res.status(400).json({ message: "File name is missing" });
    }

    const uploadToCloud = await uploadOnCloudinary(file.path, originalFileName);

    if (!uploadToCloud) {
      console.error("Error uploading to Cloudinary");
      return res.status(500).json({ message: "Error uploading to Cloudinary" });
    }

    uploadResponse = uploadToCloud;

    const existingFile = await UploadFileUrl.findOne({ originalFileName });
    if (existingFile) {
      console.error("File with this name already exists");
      await deleteImageOnCloudinary(uploadToCloud.public_id);
      return res
        .status(400)
        .json({ message: "File with this name already exists" });
    }

    const store = new UploadFileUrl({
      fileUrl: uploadToCloud.secure_url,
      originalFileName: originalFileName,
      imagePublicID: uploadToCloud.public_id,
    });

    const fileUrlSaved = await store.save();

    res.status(200).json({
      message: "Image uploaded successfully",
      fileUrl: fileUrlSaved.fileUrl,
      originalFileName: fileUrlSaved.originalFileName,
      imagePublicID: fileUrlSaved.imagePublicID,
    });

    fs.unlinkSync(file.path);
  } catch (err) {
    if (uploadResponse) {
      await deleteImageOnCloudinary(uploadResponse.public_id);
    }
    console.error(`Error uploading image: ${err.message}`);
    res.status(500).json({ message: `Error uploading image: ${err.message}` });
  }
};

module.exports = uploadImage;
