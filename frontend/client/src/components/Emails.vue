<template>
  <form novalidate class="md-layout md-alignment-top-center" @submit.prevent="validateEmailForm">
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">Send Email</div>
        <span class='error-message'>{{errorMessage}}</span>
        <span v-if="emailSent" class='success-message'>Email Succesfully Sent</span>
      </md-card-header>

      <md-card-content>
        <md-field :class="getValidationClass('toEmailAddresses')">
          <label for="to-email-addresses">To:</label>
          <md-input name="to-email-addresses" id="to-email-addresses" autocomplete="email-addresses" v-model="form.toEmailAddresses" :disabled="sending" />
          <span class="md-helper-text">You may add one or more comma separated recipients</span>
          <span class="md-error" v-if="!$v.form.toEmailAddresses.required">At least 1 email address is required</span>
          <span class="md-error" v-if="$v.form.toEmailAddresses.required && !$v.form.toEmailAddresses.emailListValidator">Email address should be comma separated in valid format e.g john@example.com, doe@example.com</span>
        </md-field>

        <div class="md-layout">
          <md-switch id="showCC" class="md-primary md-layout-item md-xsmall-size-20 md-medium-size-15" v-model="ccFlag">CC</md-switch>
          <md-switch id="showBCC" class="md-primary md-layout-item" v-model="bccFlag">BCC</md-switch>

        </div>

        <md-field :class="getValidationClass('ccEmailAddresses')" v-if="ccFlag">
          <label for="cc-email-addresses">Cc:</label>
          <md-input name="cc-email-addresses" id="cc-email-addresses" autocomplete="cc-email-addresses" v-model="form.ccEmailAddresses" :disabled="sending" />
          <span class="md-helper-text">You may add one or more comma separated recipients</span>
          <span class="md-error" v-if="!$v.form.ccEmailAddresses.emailListValidator">Email address should be comma separated in valid format e.g john@example.com, doe@example.com</span>
        </md-field>

        <md-field :class="getValidationClass('bccEmailAddresses')" v-if="bccFlag">
          <label for="bcc-email-addresses">Bcc:</label>
          <md-input name="bcc-email-addresses" id="bcc-email-addresses" autocomplete="bcc-email-addresses" v-model="form.bccEmailAddresses" :disabled="sending" />
          <span class="md-helper-text">You may add one or more comma separated recipients</span>
          <span class="md-error" v-if="!$v.form.bccEmailAddresses.emailListValidator">Email address should be comma separated in valid format e.g john@example.com, doe@example.com</span>
        </md-field>

        <md-field :class="getValidationClass('subject')">
          <label for="subject">Subject:</label>
          <md-input name="subject" id="subject" autocomplete="subject" v-model="form.subject" :disabled="sending" />
          <span class="md-error" v-if="!$v.form.subject.required">Subject is required</span>
        </md-field>

        <md-field :class="getValidationClass('emailText')">
          <label for="emailText">Email Body:</label>
          <md-textarea rows="20" cols="100" name="emailText" id="emailText" autocomplete="email-body" v-model="form.emailText" :disabled="sending" />
          <span class="md-error" v-if="!$v.form.emailText.required">Email body is required</span>
        </md-field>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary md-raised" :disabled="sending">Send Email</md-button>
        </md-card-actions>

        <md-snackbar :md-active.sync="emailSent">Email was successfully sent!</md-snackbar>
      </md-card-content>
    </md-card>
  </form>
</template>

<script src="../scripts/emailVue.js"></script>

<style scoped>
  .error-message {
    color: red;
  }
  .success-message {
    color: green;
  }
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>
