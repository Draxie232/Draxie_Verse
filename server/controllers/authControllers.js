const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

exports.signup = async (req, res) => {

  const { email, password } = req.body;

  try {

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    await sendEmail(email, verificationCode);

    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({
      message: "User created. Verification email sent."
    });

  } catch (error) {
    res.status(500).json(error);
  }

};