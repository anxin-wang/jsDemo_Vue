// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import {routerMode} from './config/env'
import routes from './router'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)


const router = new VueRouter({
  routes
})
console.log(router);



/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
