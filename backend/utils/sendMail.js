const nodemailer = require("nodemailer");
const dns = require("dns");

const sendMail = async (to, otp) => {
    try {
        const transporterConfig = {
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT || 465,
            secure: process.env.EMAIL_SECURE !== "false",
            family: 4,
            // force IPv4 lookup to avoid ENETUNREACH on platforms without IPv6
            lookup: (hostname, options, callback) => dns.lookup(hostname, { family: 4 }, callback),
            connectionTimeout: 10000,
            socketTimeout: 10000,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        };

        const transporter = nodemailer.createTransport(transporterConfig);

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
        return true;

    } catch (error) {
        console.log("MAIL ERROR:", error.message);
        throw error;
    }
};

module.exports = sendMail;
