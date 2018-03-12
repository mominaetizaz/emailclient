import { validationMixin } from 'vuelidate'
import {emailList} from '../validators/emailList'
import Email from '../services/EmailService'
import {
  required
} from 'vuelidate/lib/validators'
export default {
  name: 'EmailForm',
  mixins: [validationMixin],
  data: () => ({
    form: {
      toEmailAddresses: null,
      ccEmailAddresses: null,
      bccEmailAddresses: null,
      subject: null,
      emailText: null
    },
    emailSent: false,
    sending: false,
    errorMessage: null,
    ccFlag: false,
    bccFlag: false
  }),
  validations: {
    form: {
      toEmailAddresses: {
        required,
        emailList
      },
      ccEmailAddresses: {
        emailList
      },
      bccEmailAddresses: {
        emailList
      },
      subject: {
        required
      },
      emailText: {
        required
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset();
      this.form.toEmailAddresses = null;
      this.form.ccEmailAddresses = null;
      this.form.bccEmailAddresses = null;
      this.form.subject = null;
      this.form.emailText = null;
    },
    sendEmail () {
      this.sending = true;
      Email.sendEmail(this.form).then((response) => {
        if (response.data === 'success') {
          this.emailSent = true;
          this.sending = false;
          this.errorMessage = null;
          this.clearForm();
        } else {
          this.emailSent = false;
          this.sending = false;
          this.errorMessage = 'Error occurred while sending email. Please try again!';
          
          if (response.data === 'validation error') {
              this.errorMessage = 'Error occurred, please make sure your inputs are valid';
          }
        }
      }).catch((err) => {
        this.emailSent = false;
        this.sending = false;
        this.errorMessage = 'Error occurred while sending email. Please try again!';
      })
    },
    validateEmailForm () {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.sendEmail();
      }
    }
  }
}
