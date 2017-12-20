<template>
  <div class="uc_register_share">
    <!--<img width="100%" src="../../assets/images/user/topBg.gif" alt="">-->
    <div class="waiting-for-you">
      终于等到你!
    </div>
      <div class="reg-wrap">
          <div class="reg-user-input">
              <div class="reg-input">
                  <input type="text" v-model="mobile" value="" v-on:input="mobileInput" placeholder="请输入手机号码">
              </div>
              <!-- added by meiyan 20171009 -->
              <div class="reg-input" v-show="lineBar">
                 <NECaptcha v-on:listenToChildHideBar="handleMsgCode"></NECaptcha>
              </div>
              <!-- End: added by meiyan 20171009 -->
              <div class="reg-input relative-box">
                <input type="text" v-model="CodeNumber" value="" placeholder="请输入验证码">
                <TimerBtn ref="child" class="right-btn" :mobilecode="codedata" v-on:listenToChildEvent="showMsgFromChild"></TimerBtn>
              </div>
              <div class="reg-input">
                  <input type="password" v-if="ShowPwd == true" v-model="UserPassword" placeholder="请输入密码">
                  <input type="text" v-if="ShowPwd != true" v-model="UserPassword" placeholder="请输入密码">
                  <div class="ShowPwdBut" @click.stop="ShowPwd = !ShowPwd">
                      <img v-if="ShowPwd == true" src="../../assets/images/user/slice_h@1.5x.png" alt="">
                      <img v-if="ShowPwd != true" src="../../assets/images/user/reg_img_9.png" alt="">
                  </div>
              </div>
          </div>
          <div class="registerAgreement">
              <input type="radio" checked="true" class="hide" id="Agreement">
              <label for="Agreement">
                  <p>我已阅读并同意<span @click.stop="Agree">《坚果理财用户协议》</span></p>
              </label>
          </div>
          <div class="reg-but" style="margin-top:30px;" @click.stop="info">立即注册</div>
        </div>
    <div class="InvitationCodeBg" v-show="isShow">
        <div class="InvitationCodeBox">
          <div class="InputCode">
            <input v-model="referers" type="number" placeholder="请输入邀请码">
          </div>
          <div class="clear InvitationCodeBut">
            <div class="fl" @click.stop="cancelcode">再说吧</div>
            <div class="fr" @click.stop="InvitationCode">确定</div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import NECaptcha from '../../components/NECaptcha.vue'
import TimerBtn from '../../components/TimerBtn.vue'
import {dakd} from '../../assets/js/registerAgreement'
import { MessageBox } from 'mint-ui'
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'

export default {
    name: 'UserLogin',
    data () {
        return {
            ShowPwd:true,
            isShow:false,
            mobile:"",/*手机号mobile*/
            CodeNumber:"",/*手机验证码*/
            UserPassword: '',/*密码*/
            referers:"",
            codedata:[],
            ph:"",
            ercode:"", //external recommendation code: 20170915 by meiyan
            //default terminal on this page is 'mobile': 20170915 by meiyan
            //changed to 'wechat' on 20171101
            terminal:"wechat",
            lineBar: false
        }
    },
    components: { NECaptcha, TimerBtn },
    mounted(){
        this.ph = document.documentElement.clientHeight-45
        if(this.mobile == ""){
            this.iphoneCode("")
        }
        this.SChannelVisitRecord()
    },
    methods: {
        handleMsgCode (data) { //隐藏滑动条并触发发送短信
          let _self = this;
          console.log(data)
          console.log(data.mark,'----------------')
          _self.lineBar = data.mark;
          console.log(_self.lineBar,'显示打印了什么东西')
          _self.$refs.child.send(data.data);
        },
        showMsgFromChild (data) { //控制显示验证滑动条
          this.lineBar = data;
        },
        Agreement () {
            var html = document.getElementById("refisterYx").innerHTML
            MessageBox('坚果理财用户协议', html)
        },
        mobileInput (){
            let mobile = this.mobile
            this.iphoneCode(mobile)
        },
        /*手机验证码*/
        iphoneCode(val){
            let formData = {
                codeUrl:"send_register_code_verify",
                codeinfo:[
                    {
                        field  : "mobile",
                        iphone : val
                    }
                ]
            }
            this.codedata = formData
        },
        info () {
            //20170905_meiyan
            this.ercode = this.$route.query.ercode
            //end of meiyan

            let _that = this
            let Base64 = require('js-base64').Base64
            let Url = '/mapi2/index.php?&act=register'
            let formData = new FormData()
            formData.append("mobile",_that.mobile)
            formData.append("user_name",_that.mobile)
            formData.append("mobile_code",_that.CodeNumber)
            formData.append("user_pwd",_that.UserPassword)
            formData.append("user_pwd_confirm",_that.UserPassword)
            formData.append("ercode",_that.ercode)// 20170915_meiyan for external recommendation
            formData.append("terminal",_that.terminal)// 20170925_meiyan for terminal distinguish
            Indicator.open({ spinnerType: 'fading-circle' })
            /*  注册接口 */
            _that.$http.post(Url,formData)
                .then(response => {
                    var response = JSON.parse(Base64.decode(response.data))
                    if(response.response_code == 1){
                        console.log(response.user_pwd)
                        storeWithExpiration.set("user_name",response.mobile,86400000)
                        storeWithExpiration.set("user_pwd",response.user_pwd,86400000)
                        storeWithExpiration.set("user_id",response.ips_acct_no,86400000)
                        setTimeout(() => {
                            let user_name = window.storeWithExpiration.get('user_name')
                            let user_pwd = window.storeWithExpiration.get('user_pwd')
                            let loginuser = new FormData()
                            loginuser.append("email",user_name)
                            loginuser.append("pwd",user_pwd)
                            _that.userLogin(loginuser)
                        },1000)
                    }else{
                        _that.MintUiToast(response.show_err)
                        _that.CodeNumber = ""
                        _that.UserPassword = ""
                    }
                    Indicator.close()
                },response => {
                    console.log(response)
                })
        },
        InvitationCode(){
            let _that = this
            let Base64 = require('js-base64').Base64
            let Url = '/mapi2/index.php?&act=uc_invitationcode'
            let user_name = window.storeWithExpiration.get('user_name')
            let user_pwd = window.storeWithExpiration.get('user_pwd')
            let formData = new FormData();
            formData.append("referer",_that.referers);
            formData.append("email",user_name);
            formData.append("pwd",user_pwd);
            Indicator.open({ spinnerType: 'fading-circle' })
            _that.$http.post(Url,formData)
                .then(response => {
                    var response = JSON.parse(Base64.decode(response.data));
                    if(response.response_code == 1){
                        _that.MintUiToast(response.show_err)
                        _that.$router.push('/uc_center');
                    }else{
                        _that.MintUiToast(response.show_err)
                        _that.CodeNumber = ""
                        _that.UserPassword = ""
                    }
                    console.log(response)
                    Indicator.close()
                },response => {
                    console.log(response)
                })
        },
        userLogin(loginuser){
            let _that = this
            let Base64 = require('js-base64').Base64
            let Url = '/mapi2/index.php?&act=login'
            Indicator.open({ spinnerType: 'fading-circle' })
            _that.$http.post(Url,loginuser)
                .then(response => {
                    var response = JSON.parse(Base64.decode(response.data))
                    if(response.response_code == 1){
                        _that.MintUiToast(response.show_err)
                    //meiyan_20170928 add judgement on
                        if( _that.ercode ){
                            Indicator.close()
                            window.location.href="/wap_vue/#/uc_center"
                        }else{
                            _that.isShow = true
                        }
                        console.log(_that.ercode)
                    //end of meiyan
                    }else{
                        _that.MintUiToast(response.show_err)
                    }
                    Indicator.close()
                },response => {
                    console.log(response)
                })
        },
        MintUiToast(value){
            Toast({
                message: value,
                position: 'bottom',
                duration: 5000
            })
        },
        cancelcode(){
            this.$router.push('/uc_center');
        },
        /*注册协议*/
        Agree(){
            var addhtml = ''
            $.each(dakd,function(i,v){
                if(v.title == ''){
                    addhtml += '<p>'+v.text+'</p>'
                }else{
                    if(v.text == ''){
                        addhtml += '<h3>'+v.title+'</h3>'
                    }else{
                        addhtml += '<h3>'+v.title+'</h3><p>'+v.text+'</p>'
                    }
                }

            })
            MessageBox('坚果理财用户协议', addhtml)
        },

        //T239_meiyan_20171101
        SChannelVisitRecord(){

            this.ercode = this.$route.query.ercode
            let _that = this

            if(_that.ercode){
                let Url = '/mapi2/index.php?&act=s_channel_visit_record'
                let formData = new FormData()
                formData.append("ercode",_that.ercode)
                formData.append("terminal",_that.terminal)

                _that.$http.post(Url,formData)
                  .then(response => {
                      console.log(response)
                  },error => {
                      console.log(error)
                  })
            } //if
        }, //SChannelVisitRecord

        //end_of_T239_20171101
    },
    filters:{
        NameFil(val){
            if(val != 0){
                let rs = val.substr(0,3)+'****'+val.substr(val.length-4)
                return rs
            }else{
                return '0'
            }

        }
    }
}
</script>
<style scoped>
  .registerAgreement{ margin-top: 15px}
  .reg-user-input > div.reg-input input{ font-size: 15px!important;}
  .registerAgreement label p{
    font-size: 12px!important;
    color: #96A0B7!important;
    margin: 10px 10px!important;
  }
  .registerAgreement label p span{
    color: #FFBD58!important;
    font-size: 12px!important;
  }
  .uc_register_share .reg-but{
    background: #fecf72!important;
    color: #fff!important;
  }
  ::-webkit-input-placeholder {color: #b9c0d0;}
  :-moz-placeholder { color: #b9c0d0;}
  ::-moz-placeholder { color: #b9c0d0;}
  :-ms-input-placeholder { color: #b9c0d0;}
  .right-btn{
    width: 100px!important;
    height: 30px!important;
    position: absolute;
    top: 0;
    right: 0;
  }
  .relative-box{ position: relative;}
  .reg-user-input > div.reg-input button{
    background: #fff!important;
    font-size: 15px;
    color: #FFBD58!important;
  }
  .reg-user-input > div.reg-input input{
    -webkit-box-shadow: none!important;
    -moz-box-shadow: none!important;
    box-shadow: none!important;
    border-bottom: 1px solid #d9d9d9!important;
    -webkit-border-radius: 0!important;
    -moz-border-radius: 0!important;
    border-radius: 0!important;
    text-indent: .6em!important;
  }
  .waiting-for-you{
    height: 107px;
    background-color: #fff;
    color: #242424;
    font-size: 24px;
    font-weight: bold;
    padding-top: 34px;
    padding-left: 21px;
  }
</style>
<style>
body{background:white;}
.mint-header.is-fixed{
    z-index: inherit!important;
}
.mint-msgbox-message p{
    text-indent: 2em;
    margin-top:10px;
    text-align: left;
    font-size:12px;
}
.mint-msgbox-message h3{
    text-align: left;
    padding:10px 0px;
    font-size:14px;
}
.mint-msgbox-message p span{
    color:red;
}
.mint-msgbox-message{
    word-wrap:break-word;
    overflow: scroll;
    color:#333;
    line-height:23px;
    font-size:14px;
}
.mint-msgbox-title{
    font-weight:normal;
}
@media screen and (max-height:480px) {
    .mint-msgbox-message{
        max-height: 220px;
    }
}
@media screen and (min-height: 480px) and (max-height:568px) {
    .mint-msgbox-message{
        max-height: 320px;
    }
}
@media screen and (min-height: 568px) and (max-height:667px) {
    .mint-msgbox-message{
        max-height: 400px;
    }
}
@media screen and (min-height: 667px) and (max-height:736px) {
    .mint-msgbox-message{
        max-height: 480px;
    }
}
</style>
<style scoped lang="less">
@import "../../assets/css/uc_register_share";
.uc_register_share{
  top:45px;
  background-color: #fff;
}
/*注册完成后填写邀请码*/
.InvitationCodeBg{
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.5);
  position:fixed;
  left:0px;
  top:0px;
  z-index: inherit;
}
.InvitationCodeBg .InvitationCodeBox{
  width:80%;
  min-height:120px;
  background:white;
  padding:40px 20px 10px 20px;
  border-radius:10px;
  position:fixed;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
}
.InvitationCodeBg .InvitationCodeBox:before{
  content:"";
  width:70%;
  height:65%;
  display:block;
  overflow: auto;
  background:url("../../assets/images/user/ren@1.5x.png") no-repeat;
  background-size:100%;
  position:absolute;
  left:50%;
  top:-90px;
  transform:translate(-50%,0%);
  z-index: 1;
}
.InvitationCodeBox .InputCode input{
  width:100%;
  height:40px;
  text-indent: 1em;
  border:1px solid #E5E5E5;
  border-radius:3px;
  margin-bottom:20px;
  z-index: 999999;
}
.InvitationCodeBox .InvitationCodeBut{
  padding:10px 15px;
}
.InvitationCodeBox .InvitationCodeBut div{
  width:44%;
  height:40px;
  border-radius:40px;
  line-height:40px;
  text-align:center;
  color:white;
  font-size:15px;
}
.InvitationCodeBox .InvitationCodeBut div.fl:first-child{
  background:#ccc;
}
.InvitationCodeBox .InvitationCodeBut div.fr:last-child{
  background:#F4AC31;
}
</style>
