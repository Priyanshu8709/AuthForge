const nodemailer = require("nodemailer");
const dns = require("dns");

const sendMail = async (to, otp) => {
    try {
        // Resolve the SMTP host to an IPv4 address and use that IP for the connection
        // while preserving the original hostname for TLS SNI verification.
        // Gmail-specific transporter options if using Gmail host
        let resolvedHost = process.env.EMAIL_HOST || "smtp.gmail.com";
        try {
            const res = await dns.promises.lookup(resolvedHost, { family: 4 });
            if (res && res.address) resolvedHost = res.address;
        } catch (err) {
            console.warn("IPv4 lookup failed, falling back to hostname:", err.message);
        }

        const transporterConfig = {
            host: resolvedHost,
            port: process.env.EMAIL_PORT || 587,
            secure: false, // use TLS upgrade
            requireTLS: true,
            logger: true,
            debug: true,
            family: 4,
            tls: {
                servername: process.env.EMAIL_HOST || "smtp.gmail.com",
            },
            connectionTimeout: 5 * 60 * 1000,   // 5 minutes
            socketTimeout: 5 * 60 * 1000,       // 5 minutes
            auth: {
                user: process.env.EMAIL_USER || process.env.MAIL_ADDRESS,
                pass: process.env.EMAIL_PASS || process.env.MAIL_PASSWORD,
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
