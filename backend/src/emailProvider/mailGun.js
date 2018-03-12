'use strict';
const axios = require('axios');

class MailGun {
    sendEmail(message) {
        message.to.join(',');
        message.cc.join(',');
        message.bcc.join(',');

        return axios({
            method: 'post',
            url: 'https://api.mailgun.net/v3/sandbox171bb31efeaf4e2db87f13c9db671e61.mailgun.org/messages',
            auth: {
                username: 'api',
                password: process.env.MAILGUN_KEY
            },
            params: message
        });
    }
}

module.exports = MailGun;
