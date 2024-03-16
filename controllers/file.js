const File = require("../models/file");
const path = require("path");

// Controller function for handling file uploads
exports.uploadFile = async (req, res) => {
  const fileBuffer = req.file.buffer;

  // Extracting data from the request body and file
  let data = {
    title: req?.body?.title,
    file: {
      data: fileBuffer,
      contentType: req.file.mimetype,
    },
  };

  // Determine the file type based on its extension
  const fileExtension = path.extname(req?.file?.originalname).toLowerCase();

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

exports.getPDF = async (req, res) => {
  // Find the PDF file in the database by its ID
  const PDFFile = await File.findById(req.params.id);

  // If the PDF file is not found, return a 404 error response
  if (!PDFFile) {
    return res.status(404).send("PDF not found");
  }

  // Convert the binary data of the PDF file to a base64-encoded string
  const base64Data = Buffer.from(PDFFile.file.data, "binary").toString(
    "base64"
  );

  // Set the response headers for serving the PDF file
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": 'inline; filename="file.pdf"',
  });

  // Send the base64-encoded PDF data as the response
  res.send(Buffer.from(base64Data, "base64"));
};
