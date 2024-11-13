const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Correct import
const cloudinary = require('./cloudinary'); // Cloudinary config

// Set up Multer to store images in Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // Cloudinary instance
  params: {
    folder: 'car_images', // Folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
    transformation: [{ width: 800, height: 600, crop: 'limit' }], // Resize image
  },
});

// Multer setup with file filter, limit to 10 images, and size calculation
const upload = multer({
  storage: storage,
  limits: { 
    files: 10,  // Max 10 images
    fileSize: 10 * 1024 * 1024,  // 10MB max file size per image
  }, 
  fileFilter: (req, file, cb) => {
    // Check if the file type is valid
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)) {
      return cb(new Error('Only image files are allowed'), false);
    }

    // Check file size before uploading
    if (file.size > 10 * 1024 * 1024) { // Limit file size to 10MB
      return cb(new Error('File size exceeds 10MB limit'), false);
    }

    cb(null, true);
  },
});

// Error handling middleware for multer
const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle Multer errors (like file size or file count errors)
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // Handle other errors
    return res.status(400).json({ message: err.message });
  }
  next();
};

module.exports = { upload, errorHandler };
