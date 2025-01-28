const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors'); // Import CORS

const app = express(); // Initialize the app
const port = process.env.PORT || 3000; // Port from Heroku or local

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Nodemailer SMTP setup for Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // Using SSL
  secure: true, // Use SSL
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_PASS, // Your Gmail App password
  },
});

// POST route to handle form submission
app.post('/send-message', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'mcklinrzirongodza@gmail.com', // Your email address
    subject: `Message from ${name}: ${subject}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Subject: ${subject}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
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
