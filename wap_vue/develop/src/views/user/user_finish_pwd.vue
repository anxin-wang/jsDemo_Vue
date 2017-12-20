<template>
  <div class="UserRegister">
    <div class="waiting-for-you">
      终于找到你!
    </div>
    <div class="UserLoginInputBox">
      <div class="UserLoginInput" onclick="return false"  >
        <div class="clear UserLoginInputList">
         <!-- <label>密码</label>-->
          <input type="password" :value="NewUserPassword" v-model="NewUserPassword" v-show="isHide" placeholder="请输入新密码">
          <input type="text" v-model="NewUserPassword" name="password" v-show="isShow" :value="NewUserPassword" placeholder="请输入新密码">
          <div class="ShowPassword" @click.stop="ShowPassword(1)">
            <img :src="c_img" alt="">
          </div>
        </div>
        <div class="clear UserLoginInputList">
         <!-- <label>密码</label>-->
          <input type="password" :value="CNewUserPassword" v-model="CNewUserPassword" v-show="isHide1" placeholder="请再次输入新密码">
          <input type="text" v-model="CNewUserPassword" name="password" v-show="isShow1" :value="CNewUserPassword" placeholder="请再次输入新密码">
          <div class="ShowPassword" @click.stop="ShowPassword(2)">
            <img :src="c_img1" alt="">
          </div>
        </div>
        <div class="UserLoginSubmit">
          <button @click.stop="info">完成</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TimerBtn from '../../components/TimerBtn.vue'
  import { Indicator } from 'mint-ui'
  import { Toast } from 'mint-ui'
  export default {
    name: 'UserLogin',
    data () {
      return {
        isShow: false,
        isHide: true,
        isShow1: false,
        isHide1: true,
        mobile:'',/*手机号码*/
        CodeNumber: '',/*手机验证码*/
        NewUserPassword: '',/*新密码*/
        CNewUserPassword: '',/*新密码*/
        c_img: require('../../assets/images/user/slice_h@1.5x.png'),
        c_img1: require('../../assets/images/user/slice_h@1.5x.png'),
        datainfo:[],
        codedata:[],
      }
    },
    components: { TimerBtn },
    mounted () {
      if(this.mobile == ""){
        this.iphoneCode("")
      }
    },
    methods: {
      ShowPassword (n) {
        if(n == 1){
          this.isShow = !this.isShow;
          this.isHide = !this.isHide;
          if(this.isHide != true){
            this.c_img = require('../../assets/images/user/slice_y@1.5x.png')
          }else{
            this.c_img = require('../../assets/images/user/slice_h@1.5x.png')
          }
        }else{
          this.isShow1 = !this.isShow1;
          this.isHide1 = !this.isHide1;
          if(this.isHide1 != true){
            this.c_img1 = require('../../assets/images/user/slice_y@1.5x.png')
          }else{
            this.c_img1 = require('../../assets/images/user/slice_h@1.5x.png')
          }
        }
      },
      mobileInput (){
        let mobile = this.mobile
        this.iphoneCode(mobile)
      },
      /*手机验证码*/
      iphoneCode(val){
        let formData = {
          codeUrl:"send_reset_pwd_code",
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
        let Base64 = require('js-base64').Base64
        let Url = '/mapi2/index.php?&act=save_reset_pwd'

        let par = _that.$route.params;
        _that.mobile = par.phone;
        _that.CodeNumber = par.code;

        let formData = new FormData();
        formData.append("mobile",_that.mobile);
        formData.append("mobile_code",_that.CodeNumber);
        formData.append("user_pwd",_that.NewUserPassword);
        formData.append("user_pwd_confirm",_that.CNewUserPassword);
        Indicator.open({ spinnerType: 'fading-circle' })
        _that.$http.post(Url,formData)
          .then(response => {
            var response = JSON.parse(Base64.decode(response.data));
            if(response.response_code == 1){
              _that.datainfo = response.bankList
              _that.MintUiToast(response.show_err)
              setTimeout(() => {
                  _that.$router.push('/login');
              },1000)
            }else{
              _that.MintUiToast(response.show_err)
            }
            Indicator.close()
          },response => {
          })
      },
      MintUiToast(value){
        Toast({
          message: value,
          position: 'bottom',
          duration: 5000
        })
      }
    }
  }
</script>
<style>
  body{background:white;}
</style>
<style scoped>
  ::-webkit-input-placeholder {color: #b9c0d0;}
  :-moz-placeholder { color: #b9c0d0;}
  ::-moz-placeholder { color: #b9c0d0;}
  :-ms-input-placeholder { color: #b9c0d0;}
  .waiting-for-you{
    height: 107px;
    background-color: #fff;
    color: #242424;
    font-size: 24px;
    font-weight: bold;
    padding-top: 34px;
    padding-left: 21px;
  }
  .UserRegister{
    background:white;
    position:absolute;
    left:0px;
    top:45px;
    width:100%;
    height:100%;
  }
  .LoginHeadLogo{
    width:100%;
    height:230px;
    background:#F4AC31;
  }
  .LoginHeadLogo .LoginLogo{
    width:50%;
    margin:0px auto;
    padding:20px 0px;
  }
  .LoginHeadLogo .LoginLogo img{
    width:100%;
  }
  .UserLoginInput > a{
    color:#F4AC31;
  }
  .UserLoginInputBox{
    /*padding:0px 10px;*/
    position:relative;
    /*top:-110px;*/
  }
  .UserLoginInput{
    padding:10px 15px;
    background:white;
    border-radius:10px;
  }
  .UserLoginInputList{
    padding:0px 40px 0px 40px;
    position:relative;
    height:30px;
    border-bottom:1px solid #d9d9d9;
    margin-bottom: 20px;
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
    font-size:14px;
    border:none;
    margin-left: -.6rem;
    padding-bottom: 10px;
  }
  .ShowPassword{
    width:25px;
    height:25px;
    position:absolute;
    right:10px;
    text-align:right;
    top:50%;
    transform: translate(0%, -50%);
  }
  .ShowPassword img{
    width:100%;
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
    background: #fff;
    border-radius:25px;
    border:none;
    width:100%;
    text-align:center;
    line-height:25px;
    color: #F4AC31;
  }
  .codebtn button[disabled="disabled"]{
    background: #ccc;
  }
  .UserRegisterBtn{
    position:absolute;
    left:50%;
    bottom:-80px;
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
    padding:0px 20px;
    margin-top:20px;
  }
  .UserLoginSubmit button{
    width:100%;
    text-align:center;
    line-height:41px;
    /*background:#F3C783;*/
    margin-top: 61px;
    color:white;
    border:none;
    font-size:15px;
    border-radius:45px;
    background: -webkit-linear-gradient(90deg,#ffbe58,#ffd881);
    background: -moz-linear-gradient(90deg,#ffbe58,#ffd881);
    background: linear-gradient(90deg,#ffbe58,#ffd881);
  }
</style>
