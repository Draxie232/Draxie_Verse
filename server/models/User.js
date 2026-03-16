const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  verified: {
    type: Boolean,
    default: false
  },

  otp: {
    type: String
  },

  otpExpires: {
    type: Date
  }

});

module.exports = mongoose.model("User", userSchema);