<template>
  <div id="app">
    <md-app md-mode="reveal" md-sync-route>
      <md-app-toolbar class="md-primary">
        <span class="md-title">Siteminder Evaluation</span>
      </md-app-toolbar>
      <md-content id="tab-dashboard" md-label="Send Emails" to="/"></md-content>
    </md-app>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .heading {
    font-weight: normal;
    text-align: center;
    border-bottom: 1px solid #e6e6e6;
  }
</style>
