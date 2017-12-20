<template>
  <div class="UcBank">
    <div class="BankBox">
      <Row class-name="mt10 FontColor">
        <Col align="left" span="4">
          <p>
            <img :src="UserBankInfo.bank_icon" alt="">
          </p>
        </Col>
        <Col align="left" span="18">
          <div>
            <p>{{UserBankInfo.bank_name}}</p>
            <p>卡号:{{UserBankInfo.bank_no}}</p>
          </div>
        </Col>
      </Row>
      <div class="Examine" v-if="UserBankInfo.status == 1">
        <p>审核中</p>
      </div>
    </div>
    <div class="fr BankT" v-if="UserBankInfo.status != 1">
      <p @click.stop="ModifyMobile"><router-link to="#">修改富友支付预留手机</router-link></p>
      <p @click.stop="ModifyBank"><router-link to="#">修改更换银行卡</router-link></p>
    </div>
    <div class="Tishi" v-else>
      <p>提示!</p>
      <p>银行卡审核中不能充值和提现</p>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import { ucBank } from "../../service/getData"
import { ucThirdBankCartnumber } from "../../service/getData"
import { ucThirdBank } from "../../service/getData"
export default {
  name: 'UcInvest',
  data () {
    return {
        UserBankInfo: [],
    }
  },
  mounted () {
      this.UserBank ()
  },
  methods:{
      /*获取银行卡信息*/
      UserBank () {
          let _that = this
          ucBank(_that.UserName(),_that.UserPwd()).then(res => {
              if(res.response_code == 1){
                  _that.UserBankInfo = res.bankList
              }else{
                  Toast({
                      message: res.show_err,
                      position: 'bottom',
                      duration: 5000
                  });
              }
          })
      },
      /*更换预留手机号*/
      ModifyMobile () {
          let _that = this
          ucThirdBank(_that.UserName(),_that.UserPwd()).then(res => {
              if(res.response_code == 1){
                  storeWithExpiration.set("api_rechargesdk",res.html,86400000);
                  _that.$router.push('/uc_api_rechargesdk');
              }else{
                  Toast({
                      message: res.show_err,
                      position: 'bottom',
                      duration: 5000
                  });
              }
          })
      },
      /*更换银行卡*/
      ModifyBank () {
          let _that = this
          ucThirdBankCartnumber(_that.UserName(),_that.UserPwd()).then(res => {
              if(res.response_code == 1){
                  storeWithExpiration.set("api_rechargesdk",res.html,86400000);
                  _that.$router.push('/uc_api_rechargesdk');
              }else{
                  Toast({
                      message: res.show_err,
                      position: 'bottom',
                      duration: 5000
                  });
              }
          })
      },
      UserName () {
          return window.storeWithExpiration.get('user_name')
      },
      UserPwd () {
          return window.storeWithExpiration.get('user_pwd')
      }
  }
}
</script>

<style scoped>
.UcBank{
  padding:10px 12px;
}
.BankBox{
  width:100%;
  height:150px;
  background:#d85e5e;
  border-radius:10px;
  padding:20px 5px;
  position:relative;
  overflow: hidden;
}
.BankBox:after{
  content:"";
  width:40px;
  height:60px;
  background:url("../../assets/images/ucenter/bank_bg.png") center center /100% no-repeat;
  position:absolute;
  right:-5px;
  top:50%;
  -webkit-transform: translate(0%,-50%);
  -moz-transform: translate(0%,-50%);
  transform: translate(0%,-50%);
}
.BankBox > .FontColor > .ivu-col-span-4 > p{
  width:40px;
  height:40px;
  background:white;
  border-radius:50%;
  padding:1px;
  overflow: hidden;
}
.BankBox > .FontColor > .ivu-col-span-4 > p >img{
  width:100%;
}
.BankBox > .FontColor > .ivu-col-span-18 > div{
  line-height:40px;
  font-size:15px;
  color:white;
}
.BankBox > .FontColor > .ivu-col-span-18 > div > p{
  margin-bottom:15px;
}
.BankT a{
  color: #72adff;
  display:block;
  padding-top:15px;
  text-align:right;
}
.Examine{
  width:100px;
  height:40px;
  background:white;
  position:absolute;
  right:-18px;
  top:-12px;
  transform:rotate(30deg);
}
.Examine p{
  color: red;
  margin-top: 5px;
  text-align: center;
  line-height: 40px;
  margin-left: 23px;
  font-size: 14px;
}
.Tishi{
  color:#999;
  margin-top:20px;
  font-size:12px;
}
</style>
