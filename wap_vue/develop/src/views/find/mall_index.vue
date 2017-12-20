<template>
  <div class="MallContent">
    <!--轮播图-->
    <slider :getData="getData"></slider>
    <!--通告-->
    <!--<rollnotice :lsit="rollnoticeList"></rollnotice>-->
    <!--积分规则-->
    <flexbox :lsit="Boxlist"></flexbox>
    <!--优选商品列表-->
    <preferred></preferred>
    <!--会员任务-->
    <leaguerTask></leaguerTask>
    <!--商品列表-->
    <commodityList></commodityList>
  </div>
</template>

<script>
import "../../assets/css/integralmall.css"
import Vue from 'vue';
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
};
export default {
  components:{
      /*轮播图 组件*/
      slider:require('../../components/mall/index/slider.vue'),
      /*积分规则 组件*/
      flexbox:require('../../components/mall/index/flexbox.vue'),
      /*通告 组件*/
      rollnotice:require('../../components/mall/index/rollnotice.vue'),
      /*优选商品列表 组件*/
      preferred:require('../../components/mall/index/preferred.vue'),
      /*会员任务 组件*/
      leaguerTask:require('../../components/mall/index/leaguerTask.vue'),
      /*商品列表 组件*/
      commodityList:require('../../components/mall/index/commodityList.vue'),
  },
  data () {
    return {
        user_name:'',
        user_pwd:'',
        defaultImg:'',
        Boxlist:[],
        rollnoticeList:[],
        getData:[],
        InregralInfo:"",
    }
  },
  mounted () {
      this.$nextTick(function () {
          this.compInfo()

          this.user()
          /*积分规则 组件 信息*/

      })
  },
  methods: {
      /*页面数据信息*/
      compInfo: function () {
          let _self = this
          /*获取账号密码*/
          if(_self.$route.params.user_name != undefined){
              _self.user_name = _self.$route.params.user_name
              storeWithExpiration.set("MallUserName",_self.user_name,86400000)
          }else{
              _self.user_name = ''
          }
          if(_self.$route.params.user_pwd != undefined){
              _self.user_pwd = _self.$route.params.user_pwd
              storeWithExpiration.set("MallUserPwd",_self.user_pwd,86400000)
          }else{
              _self.user_pwd = ''
          }
          _self.InregralMe(_self.user_name,_self.user_pwd)

          /*通告 接口信息*/
          _self.rollnoticeList = {}
          /*轮播图 接口信息*/
          _self.getData = {
              act: 'IntegralAdvactivity',
              r_type: '1',
              style:4
          }
      },
      /*我的积分信息*/
      InregralMe(name,pwd){
          let _self = this
          let Base64 = require('js-base64').Base64
          let Url = '/mapi2/index.php?'
          let formData = new FormData()
          formData.append("act",'uc_score')
          formData.append("email",_self.userName())
          formData.append("pwd",_self.userPwd())
          _self.$http.post(Url,formData)
              .then(response => {
                  let res = JSON.parse(Base64.decode(response.data));
                  _self.InregralInfo = res.usable_score
                  _self.Boxlist = [
                      {
                          name:'积分',
                          text:res.usable_score,
                          url:'/integralMe',
                          img:require('../../assets/images/mall/index/img_01.png')
                      },
                      {
                          name:'活动抽奖',
                          text:'',
                          url:'/draw_index',
                          img:require('../../assets/images/mall/index/img_02.png')
                      },
                      {
                          name:'积分规则',
                          text:'',
                          url:'/ruleIntegral',
                          img:require('../../assets/images/mall/index/img_03.png')
                      },
                      {
                          name:'兑换记录',
                          text:'',
                          url:'/recordExchange',
                          img:require('../../assets/images/mall/index/img_04.png')
                      }
                  ]
                  if(res.response_code == 0){
                      _self.applogin()
                      _self.DialogAlert(res.show_err)
                  }
              },response => {
              })
      },
      applogin(){ //登录
          zichanjia_app_android.applogin();
      },
      user(){
          let _self = this;
          let Base64 = require('js-base64').Base64
          let url = '/mapi2/index.php'
          let formData = new FormData()
          formData.append("act",'uc_center')
          formData.append("email",_self.userName())
          formData.append("pwd",_self.userPwd())
          _self.$http.post(url, formData).then(function (response) {
              let res = JSON.parse(Base64.decode(response.data));
              _self.UserId = res.id
          });
      },
      userName(){ return window.storeWithExpiration.get('MallUserName')},
      userPwd(){return window.storeWithExpiration.get('MallUserPwd')},
      DialogAlert(meg){
          this.$dialog.alert({
              title:'提示！',
              mes: meg,
              callback:() => {
              }
          });
      },
  },
  filters:{
      bannerimgurl (url){

      }
  }
}
</script>


