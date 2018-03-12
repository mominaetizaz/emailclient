//this is the official sendgrid node plugin to use their api
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRIDKEY);

sendEmail(message) {
 let isValid = validate(message);
  
  if (isValid) {
    return sgMail.send(message);
  }
}

validate(message) {
  
}
