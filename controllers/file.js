const File = require("../models/file");
const path = require("path");

// Controller function for handling file uploads
exports.uploadFile = async (req, res) => {
  // Extracting data from the request body and file
  let data = {
    title: req?.body?.title,
    filename: req?.file?.filename,
  };

  // Determine the file type based on its extension
  const fileExtension = path.extname(req?.file?.path).toLowerCase();

  // // Set the 'type' property in the data object based on the file extension
  if (fileExtension == ".pdf") {
    data.type = "File";
  } else {
    data.type = "Image";
  }

  // // Create a record in the 'File' collection in MongoDB with the provided data
  await File.create(data);

  // Redirect the user to the home page
  res.redirect("/");
};

// Controller function for rendering the homepage
exports.getHomepage = async (req, res) => {
  // Retrieve files from the MongoDB collection with type "File"
  const files = await File.find({ type: "File" });

  // Retrieve images from the MongoDB collection with type "Image"
  const images = await File.find({ type: "Image" });

  // Render the "file" view, passing the files and images data to the view
  res.render("file", { files: files, images: images });
};

// Controller function for removing a file
exports.removeFile = async (req, res) => {
  // Find the file by its ID and delete it from the MongoDB collection
  await File.findByIdAndDelete(req.params.id);

  // Redirect the user to the home page after successful deletion
  res.redirect("/");
};