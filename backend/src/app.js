const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const SendGrid = require('./emailProvider/SendGrid');
const MailGun = require('./emailProvider/MailGun');
const EmailValidator = require('./validator/EmailValidator');

const sendGrid = new SendGrid();
const mailGun = new MailGun();
const emailValidator = new EmailValidator();

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
    
    //validate email message and send feedback if not valid
    if (emailValidator.validateEmail(msg)) {
        //1st try sending the email via Sendgrid
        return sendGrid.sendEmail(msg)
            .then(() => {
                res.send('success');
             })
            .catch((err) => {
                //if we errored then make a 2nd try via failover provider
                return mailGun.sendEmail(msg)
                    .then(() => {
                        res.send('success');
                    })
                    .catch((err) => {
                        res.status(500).send('error');
                    });
            });
    } else {
        res.send('validation error');
    }
});

app.listen(process.env.PORT || 8081);
