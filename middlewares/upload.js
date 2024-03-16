const multer = require("multer");
const path = require("path");

// Configure storage for uploaded files
const storage = multer.memoryStorage();

// Configure Multer middleware with storage and file filter
const uploadImg = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Define allowed file types
    const fileTypes = /jpeg|JPG|png|pdf/;

    // Check if the file mimetype and extension match the allowed types
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      // If the file format is allowed, accept the file
      return cb(null, true);
    }

    // If the file format is not allowed, render the signup page with an error message
    cb("Check the file format");
  },
}).single("image");

module.exports = uploadImg;
