const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.SMTP_USER,  // Removed quotes
    pass: process.env.SMTP_PASSWORD  // Removed quotes
  }
});

// Verify connection configuration
transporter.verify((error, success) => {

    
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});

module.exports = transporter;