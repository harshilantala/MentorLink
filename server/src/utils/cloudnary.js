const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// ✅ Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true, // Ensures HTTPS URLs
}); 


console.log("Cloudinary Config Loaded:", { 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

module.exports = { cloudinary };