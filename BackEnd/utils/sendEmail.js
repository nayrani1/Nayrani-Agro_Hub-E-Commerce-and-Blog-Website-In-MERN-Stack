const nodemailer = require("nodemailer");

const sendEmail = async options => {
    let e = process.env;
    const  transport = nodemailer.createTransport({
        host: e.SMTP_HOST,
        port: e.SMTP_PORT,
        auth: {
          user: e.AUTH_USERNAME,
          pass: e.AUTH_PASSWORD
        }
    });
    // setup email data with unicode symbols
    const message = {
        from: `"${e.FROM_NAME}" <${e.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject || "No Subject",
        text: options.message || "",
    }
    try {
        await transport.sendMail(message);
        return 'success';
    } catch (error) {
        console.log('Error sending email', error);
        throw new Error("Failed to send the email");
        }
};

module.exports = sendEmail;