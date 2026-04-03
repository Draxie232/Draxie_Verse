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
    
    // Catch the new title and description from the frontend
    const { email, title, description } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'video', 
      folder: 'draxie_verse/vlogs',
    });

    fs.unlinkSync(req.file.path); 

    const newVideo = new Video({
      userEmail: email || 'anonymous',
      title: title || 'Untitled Vlog',
      description: description || '',
      videoUrl: result.secure_url,
      thumbnail: result.secure_url.replace('.mp4', '.jpg').replace('.mov', '.jpg'),
      cloudinaryId: result.public_id // Save this so we can delete it later!
    });

    const savedVideo = await newVideo.save();
    res.json({ video: savedVideo });
  } catch (error) {
    console.error("Video Upload Error:", error);
    res.status(500).json({ error: 'Video upload failed' });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    
    // 1. Find the video in the database
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    // 2. Delete the actual video file from Cloudinary using the public_id
    // Note: resource_type: 'video' is absolutely required here!
    if (video.cloudinaryId) {
      await cloudinary.uploader.destroy(video.cloudinaryId, { resource_type: 'video' });
    }

    // 3. Delete the record from MongoDB
    await Video.findByIdAndDelete(videoId);

    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: 'Failed to delete video' });
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

// Fetch ALL Videos (Global Feed)
exports.getAllVideos = async (req, res) => {
  try {
    // Fetch all videos from the database
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json({ videos });
  } catch (error) {
    console.error("Fetch All Videos Error:", error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};

// Handle Video Interactions (Likes & Views)
exports.updateInteraction = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // Expects 'like', 'unlike', or 'view'

    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    // Convert string to number for math
    let currentLikes = parseInt(video.likes) || 0;
    let currentViews = parseInt(video.views) || 0;

    if (action === 'like') currentLikes += 1;
    if (action === 'unlike') currentLikes = Math.max(0, currentLikes - 1); // Prevent negative likes
    if (action === 'view') currentViews += 1;

    // Convert back to string to match your MongoDB schema
    video.likes = currentLikes.toString();
    video.views = currentViews.toString();

    await video.save();
    
    res.json({ success: true, likes: video.likes, views: video.views });
  } catch (error) {
    console.error("Interaction Error:", error);
    res.status(500).json({ error: 'Failed to update interaction' });
  }
};