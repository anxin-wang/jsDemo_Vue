import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import iView from 'iview'
import Vuex from 'vuex'
import axios from 'axios'
import store2 from 'store2'
import store from './store/index'
import YDUI from 'vue-ydui'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

import './assets/js/min/jquery-1.10.2.min'
import './assets/js/min/base64js.min'
import './utils/setWechatTitle.js'

import 'mint-ui/lib/style.css'
import 'iview/dist/styles/iview.css'
import 'vue-ydui/dist/ydui.base.css';
import './assets/css/animate.css'
import './assets/css/common.less'

Vue.use(Mint)
Vue.use(iView)
Vue.use(Vuex)
Vue.use(YDUI)


Vue.prototype.$http = axios
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
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


var host = window.location.host;
var prot = window.location.protocol;

//处理微信不能解析localhost:8080的问题
if(host == 'localhost:8080'){
  var developUrl = "http://develop.jianguolicai.cn"
  axios.defaults.baseURL = developUrl
  var domain = location.href.split('#')[0];
  var wxUrl = developUrl+'/mapi2/index.php?act=weixinapi&url='+encodeURIComponent(domain)
}else{
    //axios.defaults.baseURL = prot+"//"+host;
  axios.defaults.baseURL = "http://develop.jianguolicai.cn";
  var domain = location.href.split('#')[0];
  var wxUrl = prot+"//"+host+'/mapi2/index.php?act=weixinapi&url='+encodeURIComponent(domain)
}

axios.post(wxUrl)
.then(function(obj){
    /*微信分享*/
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: obj.data.appid, // 必填，公众号的唯一标识
        timestamp: obj.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: obj.data.noncestr, // 必填，生成签名的随机串
        signature: obj.data.signature,// 必填，签名，见附录1
        jsApiList: [
            'chooseImage',
            'onMenuShareTimeline',
            'showAllNonBaseMenuItem',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            "showOptionMenu",
            "closeWindow",
            "uploadImage",
            "previewImage"
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
})



new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
