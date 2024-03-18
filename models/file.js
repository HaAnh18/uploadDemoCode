const mongoose = require('mongoose');

// Define the file schema
const fileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  filename: {
    type: String
  },
  type: {
    type: String,
    enum: ["Image", "File"],
    required: [true, "Type is required"]
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

// Create and export the File model based on the schema
module.exports = mongoose.model("File", fileSchema);