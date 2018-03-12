const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const sendGrid = require('./emailProvider/SendGrid');
const mailGun = require('./emailProvider/MailGun');

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
                    res.send('error');
                });
        });
});

app.listen(process.env.PORT || 8081);
