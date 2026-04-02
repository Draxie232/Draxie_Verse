const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const uploadController = require('../controllers/uploadController');
const User = require("../models/User");

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // delete local file after upload
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: "Uploaded successfully",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/update-profile-pic", async (req, res) => {
  try {
    const { email, imageUrl } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      { profilePic: imageUrl },
      { new: true }
    );

    res.json({
      message: "Profile updated",
      profilePic: user.profilePic,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/user/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    res.json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;