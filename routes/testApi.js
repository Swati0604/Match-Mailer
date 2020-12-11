const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const multer = require('multer');
const app = require('../app');
const path = require('path');
const nodemailer = require('nodemailer');
const api = express();

//View Engine Setup
api.engine('handlebars', exphbs());
api.set('view-engines', 'handlebars');

//Static Folder
api.use('/public', express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

api.get('/', (req, res) => {
  res.send('contact');
});

api.post('/send', (req, res) => {
  console.log(req.body);

  const email = req.body.email;

  const output = `
  <p>You have a new Contact Request</p> 
  <h3>Contact Details</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
  </ul>
  `;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jhaswati0604@gmail.com',
      pass: 'ranjanajha',
    },

    tls: {
      rejectUnauthorized: false,
    },
  });

  var mailOptions = {
    from: 'jhaswati0604@gmail.com',
    to: email,
    subject: 'Hey',
    html: output,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

console.log('Server Started...');

module.exports = api;
