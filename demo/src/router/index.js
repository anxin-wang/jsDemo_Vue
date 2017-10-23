import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Demo from '@/components/Demo'
import First from '@/components/First'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }, {
      path: '/demo',
      name: 'Demo',
      component: Demo
    }, {
      path: '/first',
      name: 'First',
      component: First
    }
  ]
})
