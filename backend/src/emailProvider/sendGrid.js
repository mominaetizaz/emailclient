'use strict'

//this is the official sendgrid node plugin to use their api
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

class SendGrid {
    sendEmail(message) {
        return sgMail.send(message);
    }
}

module.exports = SendGrid;
