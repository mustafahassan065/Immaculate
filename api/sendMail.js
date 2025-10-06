// api/sendMail.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, service, message } = req.body;

  try {
    // ✅ Stable Gmail SMTP transport (instead of service: "gmail")
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: "mustafaprogrammer786@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD, // App password from Google
      },
    });

    await transporter.sendMail({
      from: `"Immaculate Professional Cleaning Services LLC" <everythingimmaculate456@gmail.com>`,
      to: "everythingimmaculate456@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("Email error:", err); // 🚨 Vercel logs میں exact error دکھائے گا
    res.status(500).json({ error: err.message });
  }
}
