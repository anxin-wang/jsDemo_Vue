// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'jquery'

import 'babel-polyfill'

import store2 from 'store2'

import 'iview/dist/styles/iview.css'
import '@/assets/css/public.less'
import axios from 'axios'

import './assets/js/jquery-1.10.2.min'

Vue.use(iView);

Vue.prototype.$http = axios
Vue.config.productionTip = false

var host = window.location.host;
var prot = window.location.protocol;
//axios.defaults.baseURL = prot+"//"+host;
  if(host != 'localhost:8080'){
      axios.defaults.baseURL = prot+"//"+host;
  }else{
      axios.defaults.baseURL = "http://develop.jianguolicai.cn";
  }



//axios.defaults.headers.common['Autho  rization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



//用户登录信息注册
window.storeWithExpiration = {
  set: function (key, val, exp) {
    store2.set(key, {val: val, exp: exp, time: new Date().getTime()})
  },
  get: function (key) {
    var info = store2.get(key)
    if (!info) {
      return null
    }
    if (new Date().getTime() - info.time > info.exp) {
      // Remove 'username'
      store2.remove(key)
      return null
    }
    return info.val
  },
  remove: function(key){
    store2.remove(key);
  }
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
