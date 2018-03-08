const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');

//this is the official sendgrid node plugin to use their api
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.post('/sendEmail', (req, res) => {
    let msg = {
        from: 'Momin Aitizaz <mominaetizaz@sitemindereval.com>',
        to: req.body.to,
        cc: req.body.cc || [],
        bcc: req.body.bcc || [],
        subject: req.body.subject,
        text: req.body.body,
    };

    return sgMail.send(msg, (error, result) => {
        if (error) {
            msg.to.join(',');
            msg.cc.join(',');
            msg.bcc.join(',');

            return axios({
                method: 'post',
                url: 'https://api.mailgun.net/v3/sandbox171bb31efeaf4e2db87f13c9db671e61.mailgun.org/messages',
                auth: {
                    username: 'api',
                    password: 'key-ed95e1f04dc91f075e8c41fb6bceb8ff'
                },
                params: msg
            }).then((body) => {
                res.send('success');
            }).catch((err) => {
                res.send('error');
            });
        } else {
            res.send('success');
        }
    });

});

app.listen(process.env.PORT || 8081);