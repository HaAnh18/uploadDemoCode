var express = require('express');
var router = express.Router();
const upload = require("../middlewares/upload")
const { uploadFile, getHomepage, removeFile } = require("../controllers/fileAndImage")

/* GET home page. */
router.get('/', getHomepage);

router.post('/upload', upload, uploadFile)

router.get('/remove/:id', removeFile)

module.exports = router;
