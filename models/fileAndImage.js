const mongoose = require('mongoose');

const fileAndImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  filename: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["Image", "File"],
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model("FileAndImage", fileAndImageSchema);