// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files (your HTML files)
app.use(express.static(path.join(__dirname, '../')));

// SMTP Configuration
const transporter = nodemailer.createTransporter({
    host: 'smtp.gmail.com', // Using Gmail SMTP
    port: 587,
    secure: false,
    auth: {
        user: 'mustafaprogrammer786@gmail.com', // Your email
        pass: 'tbamgpjupoeqizpi' // You'll need to generate an App Password
    }
});

// Test email configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('SMTP Configuration Error:', error);
    } else {
        console.log('SMTP Server is ready to send emails');
    }
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        // Validate required fields
        if (!name || !email || !phone) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, and phone are required fields' 
            });
        }

        // Email content
        const mailOptions = {
            from: '"Immaculate Cleaning Website" <everythingimmaculate456@gmail.com>',
            to: 'everythingimmaculate456@gmail.com',
            subject: `New Contact Form Submission - ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #FF9800; border-bottom: 2px solid #FF9800; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">Client Information:</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold; width: 30%;">Name:</td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone:</td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Service Needed:</td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${service || 'Not specified'}</td>
                            </tr>
                        </table>
                    </div>

                    ${message ? `
                    <div style="background: #fff3e0; padding: 15px; border-radius: 5px; border-left: 4px solid #FF9800;">
                        <h4 style="color: #333; margin-top: 0;">Project Details:</h4>
                        <p style="color: #666; line-height: 1.6; margin: 0;">${message}</p>
                    </div>
                    ` : ''}

                    <div style="margin-top: 30px; padding: 15px; background: #e8f5e8; border-radius: 5px;">
                        <p style="margin: 0; color: #2e7d32; font-size: 14px;">
                            <strong>Submission Time:</strong> ${new Date().toLocaleString()}
                        </p>
                    </div>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.json({ 
            success: true, 
            message: 'Contact form submitted successfully! We will get back to you soon.' 
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to submit contact form. Please try again later.' 
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

        // Validate required fields
        if (!firstName || !lastName || !email || !phone || !address || !serviceType || !serviceDate || !serviceTime) {
            return res.status(400).json({ 
                success: false, 
                message: 'All required fields must be filled out' 
            });
        }

        // Format service time for display
        const timeDisplay = {
            morning: 'Morning (8:00 AM - 12:00 PM)',
            afternoon: 'Afternoon (12:00 PM - 4:00 PM)',
            evening: 'Evening (4:00 PM - 6:00 PM)'
        }[serviceTime] || serviceTime;

        // Email content
        const mailOptions = {
            from: '"Immaculate Cleaning Website" <everythingimmaculate456@gmail.com>',
            to: 'everythingimmaculate456@gmail.com',
            subject: `New Service Agreement - ${firstName} ${lastName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
                    <h2 style="color: #FF9800; border-bottom: 2px solid #FF9800; padding-bottom: 10px; text-align: center;">
                        NEW SERVICE AGREEMENT SIGNED
                    </h2>
                    
                    <div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF9800;">
                        <h3 style="color: #333; margin-top: 0; text-align: center;">🎉 Agreement Successfully Signed 🎉</h3>
                    </div>

                    <div style="background: #f9f9f9; padding: 25px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Client Information</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; width: 35%; background: #f5f5f5;">Full Name:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${firstName} ${lastName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; background: #f5f5f5;">Email:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; background: #f5f5f5;">Phone:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${phone}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; background: #f5f5f5;">Service Address:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${address}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="background: #f9f9f9; padding: 25px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Service Details</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; width: 35%; background: #f5f5f5;">Service Type:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${serviceType}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; background: #f5f5f5;">Service Date:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${new Date(serviceDate).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; background: #f5f5f5;">Preferred Time:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${timeDisplay}</td>
                            </tr>
                        </table>
                    </div>

                    ${specialInstructions ? `
                    <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196F3;">
                        <h4 style="color: #333; margin-top: 0;">Special Instructions:</h4>
                        <p style="color: #666; line-height: 1.6; margin: 0; background: white; padding: 15px; border-radius: 5px;">${specialInstructions}</p>
                    </div>
                    ` : ''}

                    ${signature ? `
                    <div style="background: #f9f9f9; padding: 25px; border-radius: 8px; margin: 20px 0; text-align: center;">
                        <h3 style="color: #333; margin-top: 0; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Digital Signature</h3>
                        <p style="color: #666; margin-bottom: 15px;">Client has signed the agreement electronically</p>
                        <div style="background: white; padding: 20px; border: 2px dashed #ddd; border-radius: 5px; display: inline-block;">
                            <img src="${signature}" alt="Client Signature" style="max-width: 300px; max-height: 150px;" />
                        </div>
                    </div>
                    ` : ''}

                    <div style="margin-top: 30px; padding: 20px; background: #e8f5e8; border-radius: 8px; text-align: center;">
                        <p style="margin: 0; color: #2e7d32; font-size: 14px;">
                            <strong>Agreement Signed:</strong> ${new Date().toLocaleString()}
                        </p>
                        <p style="margin: 10px 0 0 0; color: #2e7d32; font-size: 12px;">
                            This agreement was signed through the Immaculate Professional Cleaning Services website
                        </p>
                    </div>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.json({ 
            success: true, 
            message: 'Service agreement submitted successfully! We will contact you shortly to confirm your booking.' 
        });

    } catch (error) {
        console.error('Agreement form error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to submit agreement. Please try again later.' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Immaculate Cleaning API is running',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});
