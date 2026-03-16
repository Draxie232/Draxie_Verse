const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

/* ---------------- SIGNUP ---------------- */

const signup = async (req, res) => {

  try {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      email,
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 5 * 60 * 1000
    });

    await user.save();

    await sendEmail(email, otp);

    res.json({
      message: "OTP sent to email"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


/* ---------------- VERIFY OTP ---------------- */

const verifyOtp = async (req, res) => {

  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not found"
    });
  }

  if (user.otp !== otp) {
    return res.status(400).json({
      message: "Invalid OTP"
    });
  }

  if (user.otpExpires < Date.now()) {
    return res.status(400).json({
      message: "OTP expired"
    });
  }

  user.verified = true;
  user.otp = null;

  await user.save();

  res.json({
    message: "Email verified successfully"
  });

};


/* ---------------- EXPORT ---------------- */

module.exports = {
  signup,
  verifyOtp
};