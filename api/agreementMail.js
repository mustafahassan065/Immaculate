// api/agreementMail.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    serviceType,
    serviceDate,
    serviceTime,
    neededWorkers,
    specialInstructions,
    signature,
  } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "mustafaprogrammer786@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Immaculate Professional Cleaning Services LLC" <everythingimmaculate456@gmail.com>`,
      to: "everythingimmaculate456@gmail.com",
      subject: "🧾 New Service Agreement Submission",
      html: `
        <h2>New Service Agreement Submitted</h2>
        <p><b>First Name:</b> ${firstName}</p>
        <p><b>Last Name:</b> ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Address:</b> ${address}</p>
        <p><b>Service Type:</b> ${serviceType}</p>
        <p><b>Service Date:</b> ${serviceDate}</p>
        <p><b>Service Time:</b> ${serviceTime}</p>
        <p><b>Needed Workers:</b> ${neededWorkers}</p>
        <p><b>Special Instructions:</b> ${specialInstructions || "N/A"}</p>
        <br>
        <h3>Digital Signature:</h3>
        <img src="${signature}" alt="Client Signature" style="max-width: 400px; border:1px solid #ddd; border-radius:6px;"/>
      `,
    });

    res.status(200).json({ success: true, message: "Agreement email sent successfully!" });
  } catch (err) {
    console.error("Agreement email error:", err);
    res.status(500).json({ error: err.message });
  }
}
