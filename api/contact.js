const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Email transporter configuration - Simple Gmail setup
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'mustafaprogrammer786@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'ppyumxbowtzlxbtx' // Google App Password use karo
  }
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Contact form submission received:', req.body);
    
    const { name, phone, email, service, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill all required fields' 
      });
    }

    const mailOptions = {
      from: email,
      to: 'everythingimmaculate456@gmail.com',
      subject: `New Contact Form - ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service Needed:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message || 'No message provided'}</p>
        <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p><em>Sent from Immaculate Professional Cleaning Services Website</em></p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully');
    res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully! We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting contact form. Please try again or call us directly.' 
    });
  }
});

// Agreement Form Endpoint
app.post('/api/agreement', async (req, res) => {
  try {
    console.log('Agreement form submission received');
    
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

    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill all required fields' 
      });
    }

    const mailOptions = {
      from: email,
      to: 'everythingimmaculate456@gmail.com',
      subject: `Service Agreement - ${firstName} ${lastName}`,
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
        
        <h3>Submission Details</h3>
        <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Signature:</strong> Provided digitally</p>
        
        <hr>
        <p><em>Sent from Immaculate Professional Cleaning Services Agreement Form</em></p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    console.log('Agreement email sent successfully');
    res.status(200).json({ 
      success: true, 
      message: 'Agreement submitted successfully! We will contact you shortly to confirm.' 
    });
  } catch (error) {
    console.error('Agreement form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting agreement. Please try again or call us directly.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Immaculate Cleaning Services API',
    endpoints: {
      contact: 'POST /api/contact',
      agreement: 'POST /api/agreement',
      health: 'GET /api/health'
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint not found' 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
