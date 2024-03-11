const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  filename: {
    type: String,
    required: [true, "File is required"]
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

module.exports = mongoose.model("File", fileSchema);