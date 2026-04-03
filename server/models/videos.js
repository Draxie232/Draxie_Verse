const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" }, // New field
  videoUrl: { type: String, required: true },
  thumbnail: { type: String, required: true },
  cloudinaryId: { type: String, required: true }, // New field: Critical for deleting from Cloudinary
  likes: { type: String, default: "0" },
  views: { type: String, default: "0" },
}, { timestamps: true }); 

module.exports = mongoose.model("Video", videoSchema);