const dotenv = require("dotenv");
dotenv.config();

const _config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.MONGO_URI,
  cloud_Name: process.env.CLOUDINARY_NAME,
  api_Key: process.env.CLOUDINARY_API_KEY,
  api_secret_Key: process.env.CLOUDINARY_SECRET_KEY,
};

module.exports = Object.freeze(_config);