import Vue from 'vue'
import Router from 'vue-router'
import Emails from '@/components/Emails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Emails',
      component: Emails
    }
  ]
})
