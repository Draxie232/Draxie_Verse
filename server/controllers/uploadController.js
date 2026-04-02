const cloudinary = require('../config/cloudinary');
const User = require('../models/User');
const Video = require('../models/videos'); // Matching your exact filename
const fs = require('fs');

// 1. Upload Profile Pic
exports.uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'draxie_verse/profiles',
    });

    fs.unlinkSync(req.file.path); // Clean up temp file
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Profile Pic Upload Error:", error);
    res.status(500).json({ error: 'Image upload failed' });
  }
};

// 2. Save Profile Pic to User DB
exports.updateUserProfilePic = async (req, res) => {
  const { email, imageUrl } = req.body;
  try {
    await User.findOneAndUpdate(
      { email },
      { profilePic: imageUrl },
      { new: true }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Database update failed' });
  }
};

// 3. Upload Video & Save to DB
exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No video uploaded' });
    
    const { email } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'video', 
      folder: 'draxie_verse/vlogs',
    });

    fs.unlinkSync(req.file.path); // Clean up temp file

    const newVideo = new Video({
      userEmail: email || 'anonymous',
      title: 'New Vlog ' + new Date().toLocaleTimeString(),
      videoUrl: result.secure_url,
      thumbnail: result.secure_url.replace('.mp4', '.jpg').replace('.mov', '.jpg')
    });

    const savedVideo = await newVideo.save();
    res.json({ video: savedVideo });
  } catch (error) {
    console.error("Video Upload Error:", error);
    res.status(500).json({ error: 'Video upload failed' });
  }
};

// 4. Get User Data
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.json(user || {});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// 5. Get User Videos
exports.getUserVideos = async (req, res) => {
  try {
    const videos = await Video.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
    res.json({ videos });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};