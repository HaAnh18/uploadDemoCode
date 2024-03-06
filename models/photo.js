const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  filename: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model("Image", imageSchema);