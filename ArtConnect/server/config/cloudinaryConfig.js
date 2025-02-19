// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// module.exports = cloudinary;


const cloudinary = require('cloudinary').v2; // Ensure you use v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your cloud name
    api_key: process.env.CLOUDINARY_API_KEY,       // Your API key
    api_secret: process.env.CLOUDINARY_API_SECRET, // Your API secret
});

module.exports = cloudinary;