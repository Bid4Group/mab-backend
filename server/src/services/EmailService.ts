import config from '../config/config';{}
import User from '../models/User';

var nodemailer = require('nodemailer');

export class EmailService {
  transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: config.server.mailService,
      auth: {
        user: config.server.mailUser,
        pass: config.server.mail
      }
    });
  }

  public sendMail(user: User) {
    if (user) {
      let mailOptions = {
        from: config.server.mailFrom,
        to: config.server.mailTo,
        subject: `User Registration Mail for: ${user.firstname}, ${user.lastname}`,
        text: `The following user: ${user.firstname}, ${user.lastname} wants to register.\n
                Company: ${user.company}\n
                Phone number: ${user.phonenumber}\n
                Email: ${user.email}`
      };
  
      this.transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } else {
      console.log("User could not be found!");
    }
  }
}
