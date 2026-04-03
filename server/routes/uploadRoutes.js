const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); 
const uploadController = require('../controllers/uploadController'); 

// 1. Upload Profile Picture to Cloudinary
router.post('/upload', upload.single('image'), uploadController.uploadProfilePic);

// 2. Save Profile Picture URL to MongoDB
router.post('/update-profile-pic', uploadController.updateUserProfilePic);

// 3. Upload Video to Cloudinary & Save to MongoDB
router.post('/upload-video', upload.single('video'), uploadController.uploadVideo);

// 4. Get User Profile Data
router.get('/user/:email', uploadController.getUserProfile);

// 5. Get User's Videos
router.get('/videos/:email', uploadController.getUserVideos);

module.exports = router;