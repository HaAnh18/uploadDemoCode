var express = require('express');
var router = express.Router();
const handleFileUploadError = require("../middlewares/upload")
const { uploadFile, getHomepage, removeFile } = require("../controllers/file")

router.get('/', getHomepage);

router.post('/upload', handleFileUploadError, uploadFile)

router.get('/remove/:id', removeFile)

module.exports = router;
