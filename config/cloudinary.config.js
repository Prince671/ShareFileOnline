const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({ 
  cloud_name: 'dew8fprd5', 
  api_key: '917665457192822', 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
