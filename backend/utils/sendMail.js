const nodemailer = require("nodemailer");

const sendMail = async (to, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `Secure Auth System <${process.env.EMAIL_USER}>`,
            to: to,
            subject: "Your OTP Verification Code",
            html: `
                <div style="font-family:Arial;padding:20px">
                    <h2>Email Verification</h2>
                    <p>Your OTP is:</p>
                    <h1 style="color:#2b7cff;letter-spacing:6px">${otp}</h1>
                    <p>This OTP expires in 5 minutes.</p>
                </div>
            `,
        });

        console.log("Email sent:", info.response);

    } catch (error) {
        console.log("MAIL ERROR:", error.message);
    }
};

module.exports = sendMail;
