const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Required for serving static files
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from 'public' directory
app.use(express.static('public'));

// Nodemailer transporter setup with Elastic Email
const transporter = nodemailer.createTransport({
  host: 'smtp.elasticemail.com',
  port: 2525, // Use 587 for TLS or 465 for SSL if needed
  secure: false, // True for 465, false for other ports
  auth: {
    user: process.env.ELASTIC_EMAIL_USER, // Your Elastic Email account email
    pass: process.env.ELASTIC_EMAIL_API_KEY, // Your API key as password
  },
});

// Homepage route - Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to send emails
app.post('/send-message', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: process.env.ELASTIC_EMAIL_USER,
    to: 'mcklinrzirongodza@gmail.com', // Your recipient email
    subject: `Message from ${name}: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending message');
    } else {
      console.log('Message sent successfully: ' + info.response);
      res.status(200).send('Message sent');
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
