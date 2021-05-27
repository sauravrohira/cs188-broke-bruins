nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure:false,
  requireTLS:true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

module.exports = transporter;