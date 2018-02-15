import config from '../config/config';{}

var nodemailer = require('nodemailer');

export class Mailer {
  transporter: any;
  mailOptions: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: config.server.mailService,
      auth: {
        user: config.server.mailUser,
        pass: config.server.mail
      }
    });
    
    this.mailOptions = {
      from: config.server.mailFrom,
      to: config.server.mailTo,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
  }

  public sendMail(user) {
    this.transporter.sendMail(this.mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
