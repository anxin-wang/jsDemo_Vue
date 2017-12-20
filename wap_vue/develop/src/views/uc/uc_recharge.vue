<template>
  <div class="recharge">
    <p>使用{{UserBankInfo.bank_name}}<span>尾号</span><span v-if="isShow" :data-bank_no="UserBankInfo.bank_no" v-substr></span>充值</p>
    <div class="item-box">
      <label>金额</label>
      <input v-model="amount" type="number" placeholder="建议充值大于100元以上金额">
    </div>
    <p>{{UserBankInfo.memo1}}</p>
    <div class="item-box radio-file">
      <label>富友支付</label>
      <input type="radio" checked="checked" />
      <span class="check-icon"></span>
    </div>
    <span class="btn" @click.stop="focharge">充值</span>
    <div class="FochargeForm"></div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
  name: 'recharge',
  data () {
      return {
          isShow: false,
          amount: '',
          UserBankInfo: []
      }
  },
  mounted () {
      let _that = this
      _that.UserBank()
      //_that.notify()
  },
  methods: {
      /*获取银行卡信息*/
      UserBank () {
          let _that = this
          let Base64 = require('js-base64').Base64
          let Url = '/mapi2/index.php?&act=uc_bank'
          let formData = new FormData();
          formData.append("email",_that.UserName());
          formData.append("pwd",_that.UserPwd());
          Indicator.open({ spinnerType: 'fading-circle' })
          _that.$http.post(Url,formData)
              .then(response => {
                  var response = JSON.parse(Base64.decode(response.data));
                  if(response.response_code == 1){
                      _that.UserBankInfo = response.bankList
                      _that.isShow = true
                  }else{
                      Toast({
                          message: response.show_err,
                          position: 'bottom',
                          duration: 5000
                      });
                  }
                  Indicator.close()
              },response => {
                  console.log(response)
              })
      },
      /*获取银行卡充值限额*/
      notify () {
          let _that = this
          let Base64 = require('js-base64').Base64
          let Url = '/mapi2/index.php?&act=memo1'
          let formData = new FormData();
          formData.append("email",_that.UserName());
          formData.append("pwd",_that.UserPwd());
          formData.append("type",1);
          _that.$http.post(Url,formData)
              .then(response => {
                  var response = JSON.parse(Base64.decode(response.data));
              },response => {
                  console.log(response)
              })
      },
      /*充值*/
      focharge () {
          let _that = this
          let Base64 = require('js-base64').Base64
          let Url = '/mapi2/index.php?&act=api_rechargesdk'
          let formData = new FormData();
          formData.append("email",_that.UserName());
          formData.append("pwd",_that.UserPwd());
          formData.append("amount",_that.amount);
          _that.$http.post(Url,formData)
              .then(response => {
                  var response = JSON.parse(Base64.decode(response.data));
                  if(response.response_code == 1){
                      storeWithExpiration.set("api_rechargesdk",response.html,86400000);
                      _that.$router.push('/uc_api_rechargesdk');
                  }else{
                      Toast({
                          message: response.show_err,
                          position: 'bottom',
                          duration: 5000
                      });
                  }
              },response => {
                  console.log(response)
              })
          /*if(_that.amount >= 100){

          }else{
              Toast({
                  message: "充值金额不能小于100",
                  position: 'bottom',
                  duration: 5000
              });
          }*/

      },
      UserName () {
          return window.storeWithExpiration.get('user_name')
      },
      UserPwd () {
          return window.storeWithExpiration.get('user_pwd')
      }
  },
  directives: {
      substr:{
          inserted:function(el){
              let target = el.target
              let Text = el.getAttribute("data-bank_no")
              if(Text.length == 18){
                  el.innerHTML = "("+Text.substring(14)+")"
              }else if(Text.length == 19){
                  el.innerHTML = "("+Text.substring(15)+")"
              }else if(Text.length == 20){
                  el.innerHTML = "("+Text.substring(16)+")"
              }
          }
      }
  }
}
</script>
<style scoped>
  .btn{
    display: block;
    width: 90%;
    line-height: 45px;
    background-color: #f4ad31;
    color: #fff;
    text-align: center;
    font-size: 15.5px;
    border-radius: 45px;
    margin: 50px auto;
  }
  .radio-file{ position: relative;}
  .radio-file input[type=radio]{
    position: absolute;
    right: 0;
    top: 8px;
    width: 100%;
    filter: alpha(Opacity = 0);
    -moz-opacity: 0;
    opacity: 0;
  }
  .radio-file input:checked ~ span.check-icon{
    background: url("../../assets/images/investment/xuanzhong.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    -webkit-transition: all .25s linear;
    -moz-transition: all .25s linear;
    -ms-transition: all .25s linear;
    -o-transition: all .25s linear;
    transition: all .25s linear;
  }
  .radio-file input ~ span.check-icon{
    display: inline-block;
    width: 25px;
    height: 25px;
    position: absolute;
    right: 15px;
    top: 13px;
    background: url("../../assets/images/investment/weixuanzhong.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;

  }
.item-box{
  background-color: #fff;
  height: 50px;
  line-height: 50px;
  font-size: 15.5px;font-weight: 600;
  padding-left: 10px;
  color: #333333;
}
.item-box input {
  height: 40px;
  width: 85%;
  border: 0;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  padding-left: 10px;
}
.item-box input:focus{
  outline: none;
  border: 1px solid #f4ad31;
}
.recharge p{ font-size: 14px;color: #999999;padding: 10px 10px;}
.recharge p span{ display: inline-block;padding: 0 2.5px;}
.recharge{
  font-family: "微软雅黑体";
  position: fixed;
  top: 42px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #F5F5F5;
  overflow-y: auto;
}
</style>
