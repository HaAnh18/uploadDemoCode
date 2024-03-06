const multer = require("multer"); // is the middleware for handling "multipart/form-data" which is used for file uploads
const path = require("path");


const storage = multer.diskStorage({
  // Set the destination of upload file
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  // Set the name for upload file
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  // 
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Check the file format");
  },
}).single('image');

module.exports = upload
