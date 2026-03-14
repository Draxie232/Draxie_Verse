const nodemailer = require("nodemailer");

const sendEmail = async (email, code) => {

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
    subject: "Draxie Verse Verification",
    text: `Your verification code is ${code}`
  });

};

module.exports = sendEmail;