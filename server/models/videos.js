const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnail: { type: String, required: true },
  likes: { type: String, default: "0" },
  views: { type: String, default: "0" },
}, { timestamps: true }); // timestamps automatically adds createdAt and updatedAt

module.exports = mongoose.model('Video', videoSchema);