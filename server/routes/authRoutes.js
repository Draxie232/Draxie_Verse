const express = require("express");
const router = express.Router();

const { signup, verifyOtp, login } = require("../controllers/authController");

// ✅ ROUTES
router.post("/register", signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);   // 🔥 THIS WAS MISSING

module.exports = router;