var nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());

var to;
var subject;
var body;
var path;

var Storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});

var upload = multer({
  storage: Storage,
}).single('file'); //Field name and max count

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src' + '/Form.js');
});

app.post('/sendemail', (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.end('Something went wrong!');
    } else {
      from = req.body.name;
      email = req.body.email;
      phone = req.body.phone;
      linkdin = req.body.LinkedIn;
      PortFolio = req.body.PortFolio;
      path = req.file.path;
      console.log(from);
      console.log(email);
      console.log(phone);
      console.log(linkdin);
      console.log(PortFolio);
      console.log(req.file);
      console.log(req.files);
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajdevanshueee@gmail.com',
          pass: 'raJdevanshu1',
        },
      });

      var mailOptions = {
        from: email,
        to: 'rajdevanshueee@gmail.com',
        subject: `Resume from ${from}`,
        html: `<li><ul>Name: ${from}</ul><ul>Phone: ${phone}</ul><ul>Linkdin: ${linkdin}</ul><ul>PortFolio: ${PortFolio}</ul></li><p>That was easy!</p>`,
        attachments: [
          {
            path: path,
          },
        ],
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('server started');
});
