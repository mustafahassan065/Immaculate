// api/sendMail.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName, email, phone, service, message } = req.body;

  try {
    // ✅ Stable Gmail SMTP transport (instead of service: "gmail")
    let transporter = nodemailer.createTransporter({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: "everythingimmaculate456@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD, // App password from Google
      },
    });

    await transporter.sendMail({
      from: `"Immaculate Cleaning Website" <everythingimmaculate456@gmail.com>`,
      to: "everythingimmaculate456@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Message:</b> ${message}</p>
        <hr>
        <p><em>Sent from Immaculate Professional Cleaning Services Website</em></p>
      `,
    });

    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: err.message });
  }
}
