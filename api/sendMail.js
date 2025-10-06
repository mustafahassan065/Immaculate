// api/sendMail.js
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, service, message } = req.body;

  try {
    // ✅ Stable Gmail SMTP transport
    let transporter = nodemailer.createTransporter({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: "mustafaprogrammer786@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Immaculate Cleaning Website" <everythingimmaculate456@gmail.com>`,
      to: "everythingimmaculate456@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Message:</b> ${message || 'No message provided'}</p>
        <p><b>Submission Time:</b> ${new Date().toLocaleString()}</p>
        <hr>
        <p><em>Sent from Immaculate Professional Cleaning Services Website</em></p>
      `,
    });

    res.status(200).json({ success: true, message: "Contact form submitted successfully! We will get back to you soon." });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to send email. Please try again later." });
  }
};
