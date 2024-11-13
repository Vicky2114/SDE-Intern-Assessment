const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "dr8uqc19o",
  api_key: "481386613484751",
  api_secret: "H_z3kDSvE6jqhr_HkRMzbI-D8sI",
});

module.exports = cloudinary;
