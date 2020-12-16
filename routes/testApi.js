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

// var Storage = multer.diskStorage({
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
//   },
// });

// var upload = multer({
//   storage: Storage,
// }).single('file');

api.get('/', (req, res) => {
  res.send('contact');
});

api.post('/send', (req, res) => {
  console.log(req.body);
  upload(req, res, function (err) {
    const email = req.body.email;
    // const path = req.file.path
    // console.log(path);`r`
    const output = `
  <p>Hie <span style={{font-weight:'bold'}}>${req.body.person},</span></p> 
  <p>Hope you are doing great.</p>
  <p>I came across this exciting opportunity available in your organiation. I am intrested in applying for the position of <span style={{font-weight:'bold'}}>UI/UX Designer at Myntra</span></span>. I feel my skiils and experience will be a valuable asset to your firm.
  <br><br>I have attached my Resume & Portfolio link for your consideration. Please take a moment to go through them to get a better picture of who I am.
  <br><br></p>
  
  <p><span style={{font-weight:'bold'}}>PortFolio:</span> ${req.body.portfolio}</p>
  <p><span style={{font-weight:'bold'}}>LinkedIn:</span> ${req.body.linkedin}</p>

  <p>I would love to talk to you regarding this amazing opportunity in your organization.</p>

  <br>
  <p>Thanks in advance,</p>
    <p>${req.body.name}</p>
    <p>${req.body.email}</p>
    <p>${req.body.phone}</p>
 
  `;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rajdevanshueee@gmail.com',
        pass: 'raJdevanshu1',
      },

      tls: {
        rejectUnauthorized: false,
      },
    });

    var mailOptions = {
      from: email,
      to: req.body.contact,
      subject: 'Hey',
      html: output,
      /*  attachments: [
       {
       path: path
       }
    ]*/
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });
});

console.log('Server Started...');

module.exports = api;
