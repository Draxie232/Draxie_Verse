const nodemailer = require("nodemailer");

const sendEmail = async (email, otp) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Draxie Verse Email Verification",
    text: `Your OTP code is ${otp}`
  });

};

module.exports = sendEmail;