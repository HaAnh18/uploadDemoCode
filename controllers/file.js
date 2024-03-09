const FileAndImage = require("../models/file")
const path = require('path');

exports.uploadFile = async(req, res) => {
  let data = {
    title: req?.body?.title,
    filename: req?.file?.filename,
  }

  const fileExtension = path.extname(req?.file?.path).toLowerCase();

  if (fileExtension == ".pdf") {
    data.type = "File"
  } else {
    data.type = "Image"
  }

  await FileAndImage.create(data);
  res.redirect("/")
}

exports.getHomepage = async(req, res) => {
  const files = await FileAndImage.find({type: "File"})

  const images = await FileAndImage.find({type: "Image"})

  res.render('file', {files: files, images: images});
}

exports.removeFile = async(req, res) => {
  await FileAndImage.findByIdAndDelete(req.params.id)
  res.redirect("/");
}