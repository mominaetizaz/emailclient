import Api from '@/services/Api'
import * as _ from 'lodash'

const trimEmails = (emails) => {
  return emails.map((e) => e.trim())
};

export default {
  sendEmail (formData) {
    let emailParams = {
      to: trimEmails(formData.toEmailAddresses.split(',')),
      subject: formData.subject,
      body: formData.emailText
    };

    let ccEmailAddresses = formData.ccEmailAddresses || '';
    if (!_.isEmpty(ccEmailAddresses.trim())) {
      emailParams.cc = trimEmails(formData.ccEmailAddresses.split(','))
    }

    let bccEmailAddresses = formData.bccEmailAddresses || '';
    if (!_.isEmpty(bccEmailAddresses.trim())) {
      emailParams.bcc = trimEmails(formData.bccEmailAddresses.split(','))
    }

    return Api().post('sendEmail', emailParams);
  }
}
