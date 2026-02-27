const nodemailer = require("nodemailer");

const sendMail = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      logger: true,
      debug: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
      tls: {
     rejectUnauthorized: false,
     },

    });

    await transporter.sendMail({
      from: `"AuthForge Security" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your AuthForge Verification Code",
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>Verify your account</h2>
          <p>Your OTP is:</p>
          <h1 style="color:#2b7cff;letter-spacing:6px">${otp}</h1>
          <p>This code expires in 5 minutes.</p>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.log("MAIL ERROR:", error);
    throw error;
  }
};

module.exports = sendMail;