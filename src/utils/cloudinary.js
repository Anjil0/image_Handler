const cloudinary = require("cloudinary").v2;
const config = require("../config/config");

cloudinary.config({
  cloud_name: config.cloud_Name,
  api_key: config.api_Key,
  api_secret: config.api_secret_Key,
});

const uploadOnCloudinary = async (localFilePath, originalFileName) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      public_id: originalFileName,
      resource_type: "auto",
    });

    console.log("Image uploaded successfully:", response.url);
    return response;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return null;
  }
};

const deleteImageOnCloudinary = async (publicID) => {
  console.log("Image to be deleted:", publicID);
  try {
    await cloudinary.uploader.destroy(publicID);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};

module.exports = { uploadOnCloudinary, deleteImageOnCloudinary };
