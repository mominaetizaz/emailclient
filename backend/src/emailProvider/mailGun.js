'use strict';
const axios = require('axios');

class MailGun {
  
  sendEmail(message) {
    let isValid = validate(message);

    if (isValid) {
      return axios({
        method: 'post',
        url: 'https://api.mailgun.net/v3/sandbox171bb31efeaf4e2db87f13c9db671e61.mailgun.org/messages',
        auth: {
            username: 'api',
            password: process.env.MAILGUNKEY
        },
        params: msg
      });
    }
  }

  validate(message) {

  }
  
}

module.exports = MailGun;
