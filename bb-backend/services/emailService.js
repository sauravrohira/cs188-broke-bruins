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
          refreshToken: "1//04Twag_Afti0eCgYIARAAGAQSNwF-L9IrqFjnYLGFEoOr_PrAU8IhSw_XurtbS3r0SFDw60lacueQrtrl3CPCe1BOUAU91WsSGgM"
        }
    });

module.exports = transporter;