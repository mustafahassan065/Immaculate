const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email transporter configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'mustafaprogrammer786@gmail.com',
    pass: process.env.EMAIL_PASS || 'ppyumxbowtzlxbtx'
  }
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, email, service, message } = req.body;

    const mailOptions = {
      from: email,
      to: 'everythingimmaculate456@gmail.com',
      subject: `New Contact Form Submission - ${service}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service Needed:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully!' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting contact form' 
    });
  }
});

// Agreement Form Endpoint
app.post('/api/agreement', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      serviceType,
      serviceDate,
      serviceTime,
      specialInstructions,
      signature
    } = req.body;

    const mailOptions = {
      from: email,
      to: 'everythingimmaculate456@gmail.com',
      subject: `New Service Agreement - ${firstName} ${lastName}`,
      html: `
        <h2>New Service Agreement Submission</h2>
        <h3>Client Information</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        
        <h3>Service Details</h3>
        <p><strong>Service Type:</strong> ${serviceType}</p>
        <p><strong>Preferred Date:</strong> ${serviceDate}</p>
        <p><strong>Preferred Time:</strong> ${serviceTime}</p>
        <p><strong>Special Instructions:</strong> ${specialInstructions || 'None'}</p>
        
        <h3>Agreement Details</h3>
        <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Signature:</strong> Provided (see attachment)</p>
      `,
      attachments: signature ? [
        {
          filename: 'signature.png',
          content: signature.split('base64,')[1],
          encoding: 'base64'
        }
      ] : []
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: 'Agreement submitted successfully!' 
    });
  } catch (error) {
    console.error('Agreement form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting agreement' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running' 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
