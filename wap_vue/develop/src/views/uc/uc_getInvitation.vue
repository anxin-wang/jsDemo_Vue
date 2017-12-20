<template>
  <div class="UserRegister">
    <div class="UserLoginInputBox">
      <div class="UserLoginInput">
        <div class="clear UserLoginInputList">
          <label>账户</label>
          <input type="number" v-model="mobile" v-on:input="mobileInput" placeholder="请输入手机号">
        </div>
        <div class="clear UserLoginInputList" style="padding: 0rem 9rem 0rem 4rem">
          <label>验证码</label>
          <input type="number" v-model="CodeNumber" placeholder="请输入验证码">
          <div class="codebtn">
            <TimerBtn :mobilecode="codedata"></TimerBtn>
          </div>
        </div>
        <div class="clear UserLoginInputList">
          <label>邀请码</label>
          <input type="type" v-model="referer" placeholder="请输入密码">
        </div>
        <div class="UserLoginSubmit">
          <button @click.stop="info">修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import TimerBtn from '../../components/TimerBtn.vue'
    import { MessageBox } from 'mint-ui'
    import { Indicator } from 'mint-ui'
    import { Toast } from 'mint-ui'
    export default {
        name: 'UserLogin',
        data () {
            return {
                isShow:false,
                mobile:"",/*手机号mobile*/
                CodeNumber:"",/*手机验证码*/
                referer: '',/*密码*/
                referers:"",
                codedata:[],
            }
        },
        components: { TimerBtn },
        mounted(){
            if(this.mobile == ""){
                this.iphoneCode("")
            }
        },
        methods: {
            mobileInput (){
                let mobile = this.mobile
                this.iphoneCode(mobile)
            },
            /*手机发送验证码*/
            iphoneCode(val){
                let formData = {
                    codeUrl:"send_reset_pid_code",
                    codeinfo:[
                        {
                            field:"mobile",iphone:val
                        }
                    ]
                }
                this.codedata = formData
            },
            info () {
                let _that = this
                if(_that.mobile == ''){
                    _that.MintUiToast('请输入手机号码')
                    return false
                }
                if(_that.CodeNumber == ''){
                    _that.MintUiToast('请输入手机验证码')
                    return false
                }
                let Base64 = require('js-base64').Base64
                let Url = '/mapi2/index.php?&act=uc_reset_pid'
                let formData = new FormData()
                let user_name = window.storeWithExpiration.get('user_name')
                let user_pwd = window.storeWithExpiration.get('user_pwd')
                formData.append("mobile",_that.mobile)
                formData.append("email",user_name)
                formData.append("pwd",user_pwd)
                formData.append("mobile_code",_that.CodeNumber)
                formData.append("referer",_that.referer)
                Indicator.open({ spinnerType: 'fading-circle' })
                _that.$http.post(Url,formData)
                    .then(response => {
                        var response = JSON.parse(Base64.decode(response.data))
                        if(response.response_code == 1){
                            _that.MintUiToast(response.show_err)
                        }else{
                            _that.MintUiToast(response.show_err)
                        }
                        console.log(response)
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
            }
        }
    }
</script>
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
<style scoped>

  /*注册*/
  .UserRegister{
    background:#f5f4f9;
    position:absolute;
    left:0px;
    top:55px;
    width:100%;
    height:100%;
  }
  .UserLoginInput > a{
    color:#F4AC31;
  }
  .UserLoginInputBox{
    position:relative;
  }
  .UserLoginInput{
    padding:10px 12px;
    background:white;
  }
  .UserLoginInputList{
    padding:0px 40px 0px 40px;
    position:relative;
    height:30px;
    border-bottom:1px solid #d9d9d9;
    margin-bottom: 10px;
  }
  .UserLoginInputList label{
    font-size:14px;
    position:absolute;
    left:0px;
    top:50%;
    transform: translate(0%, -50%);
  }
  .UserLoginInputList input{
    width:100%;
    height:30px;
    background:none;
    text-indent:8px;
    font-size:14px;
    border:none;
  }
  .codebtn{
    width:90px;
    height:25px;
    position:absolute;
    right:0px;
    top:50%;
    transform: translate(0%, -50%);
  }
  .codebtn button{
    background: #F4AC31;
    border-radius:25px;
    border:none;
    width:100%;
    text-align:center;
    line-height:25px;
    color:white;
  }
  .codebtn button[disabled="disabled"]{
    background: #ccc;
  }
  .UserRegisterBtn a{
    width:80px;
    height:30px;
    border:1px solid #F4AC31;
    display:block;
    text-align:center;
    line-height:30px;
    border-radius:3px;
    color:#F4AC31;
    margin:0px -40px;
  }

  .RegisterAgreement div label{
    float:left;
    display:inline-block;
    margin-right:5px;
  }
  .RegisterAgreement div label > span{
    color:red;
  }
  .RegisterAgreement div label[for="RegisterAgreement"]{
    width:18px;
    height:18px;
    background:url("../../assets/images/weixuanzhong@1.5x.png");
    background-size:100%;
  }
  .RegisterAgreement div input:checked + label{
    background:url("../../assets/images/xuanzhong@1.5x.png");
    background-size:100%;
  }
  .UserLoginSubmit{
    padding:0px 10px;
    margin-top:20px;
  }
  .UserLoginSubmit button{
    width:100%;
    text-align:center;
    line-height:35px;
    background:#F3C783;
    color:white;
    border:none;
    font-size:15px;
    border-radius:45px;
  }
  .InvitationCodeBox .InputCode input{
    width:100%;
    height:40px;
    text-indent: 10px;
    border:1px solid #E5E5E5;
    border-radius:3px;
    margin-bottom:20px;
    z-index: 999999;
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
</style>
