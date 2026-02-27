// replaced nodemailer with Brevo (Sendinblue) transactional email API
const Brevo = require("sib-api-v3-sdk");

const sendMail = async (to, otp) => {
  try {
    // configure Brevo client with API key from environment
    const client = Brevo.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const apiInstance = new Brevo.TransactionalEmailsApi();
    // construct request object using helper to ensure fields are copied correctly
    const payload = Brevo.SendSmtpEmail.constructFromObject({
      to: [{ email: to }],
      sender: {
        email: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        name: "AuthForge Security",
      },
      subject: "Your AuthForge Verification Code",
      htmlContent: `
        <div style="font-family:Arial;padding:20px">
          <h2>Verify your account</h2>
          <p>Your OTP is:</p>
          <h1 style="color:#2b7cff;letter-spacing:6px">${otp}</h1>
          <p>This code expires in 5 minutes.</p>
        </div>
      `,
    });

    await apiInstance.sendTransacEmail(payload);
    return true;
  } catch (error) {
    console.error("MAIL ERROR:", error);
    throw error;
  }
};

module.exports = sendMail;