// choose provider: SendGrid over SMTP when configured
const dns = require("dns");
let sgMail;
if (process.env.SENDGRID_API_KEY) {
    sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    if (process.env.SENDGRID_DATA_RESIDENCY) {
        sgMail.setDataResidency(process.env.SENDGRID_DATA_RESIDENCY);
    }
} else {
    // nodemailer is only required if SENDGRID_API_KEY is missing
    var nodemailer = require("nodemailer");
}

const sendMail = async (to, otp) => {
    // prefer SendGrid HTTP API when key is provided
    if (sgMail) {
        const msg = {
            to,
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            subject: "Your OTP Verification Code",
            html: `
                <div style="font-family:Arial;padding:20px">
                    <h2>Email Verification</h2>
                    <p>Your OTP is:</p>
                    <h1 style="color:#2b7cff;letter-spacing:6px">${otp}</h1>
                    <p>This OTP expires in 5 minutes.</p>
                </div>
            `,
        };
        try {
            const res = await sgMail.send(msg);
            console.log("SendGrid email sent", res[0]?.statusCode);
            return true;
        } catch (err) {
            console.error("MAIL ERROR (SendGrid):", err.message || err);
            throw err;
        }
    }

    // fallback to SMTP via nodemailer
    try {
        // Resolve the SMTP host to an IPv4 address and use that IP for the connection
        // while preserving the original hostname for TLS SNI verification.
        let resolvedHost = process.env.EMAIL_HOST;
        try {
            const res = await dns.promises.lookup(process.env.EMAIL_HOST, { family: 4 });
            if (res && res.address) resolvedHost = res.address;
        } catch (err) {
            console.warn("IPv4 lookup failed, falling back to hostname:", err.message);
        }

        const transporterConfig = {
            host: resolvedHost,
            port: process.env.EMAIL_PORT || 465,
            secure: process.env.EMAIL_SECURE !== "false",
            family: 4,
            tls: {
                servername: process.env.EMAIL_HOST,
            },
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
