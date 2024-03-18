var express = require('express')
var router = express.Router()
const uploadImg = require("../middlewares/upload")
const { uploadFile, getHomepage, removeFile, getPDF } = require("../controllers/file")

router.get('/', getHomepage);

router.post('/upload', uploadImg, uploadFile)

router.get('/remove/:id', removeFile)

module.exports = router;
