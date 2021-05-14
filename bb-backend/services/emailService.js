nodemailer = require('nodemailer')

//nodemailer config
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: "raghavdhall@gmail.com",
          pass: "Shakti@1234",
          clientId: "1047170839854-6os4a3sf98o6olth0n9i5sqe649ihbgk.apps.googleusercontent.com",
          clientSecret: "BxmwuoHQ_mmpyXJheGIDmhAY",
          refreshToken: "1//04l-HuEwKcvOOCgYIARAAGAQSNwF-L9IrdgfGeZ0TZ45qOFh_JmTA19SpZM3eZ-WFhdTohIYpUZmSa6Ofl2LTa1sW8Yb9-vjr3CE"
        }
    });

module.exports = transporter;