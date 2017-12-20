<template>
  <div class="UserLogin">
    <!--<div class="LoginHeadLogo">
        <div class="LoginLogo">
          <img src="../../assets/images/user/jianguologo@2x.png" alt="logo">w
        </div>
    </div>-->
    <div class="waiting-for-you">
      一直在等你!
    </div>
    <div class="UserLoginInputBox">
      <form  action="/" method="post" class="UserLoginInput">
        <div class="clear UserLoginInputList">
          <!--<label>账户</label>-->
          <input v-model="UserEmail" type="text" name="email" placeholder="请输入手机号">
        </div>
        <div class="clear UserLoginInputList">
          <!--<label>密码</label>-->
          <input type="password"  v-model="UserPassword" v-show="isHide" placeholder="请输入密码">
          <input type="text" v-model="UserPassword" name="pwd" v-show="isShow"  placeholder="请输入密码">
          <div class="ShowPassword" @click.stop="ShowPassword">
            <img :src="c_img" alt="">
          </div>
        </div>
        <router-link to="/getpassword">忘记密码</router-link>
        <!--按钮-->
        <div class="UserLoginSubmit">
          <div v-on:click="submit_form">登录</div>
        </div>
      </form>
      <div class="UserRegisterBtn">
        <router-link to="/register">注册</router-link>
      </div>
    </div>
  </div>

</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
  name: 'UserLogin',
  data () {
    return {
        ButtonData: {Text: '登录', ClickName: 'TestData'},
        isShow: false,
        isHide: true,
        UserPassword: '',
        UserEmail: '',
        c_img: require('../../assets/images/user/slice_h@1.5x.png')
    }
  },
  methods: {
      ShowPassword () {
          this.isShow = !this.isShow;
          this.isHide = !this.isHide;
          if(this.isHide != true){
              this.c_img = require('../../assets/images/user/slice_y@1.5x.png')
          }else{
              this.c_img = require('../../assets/images/user/slice_h@1.5x.png')
          }
      },
      submit_form () {
          let _that = this
          if(_that.UserEmail == ""){
              Toast({
                  message: '手机号不能为空',
                  position: 'bottom',
                  duration: 2000
              });
          }else{
              if(_that.UserPassword == ""){
                  Toast({
                      message: '密码不能为空',
                      position: 'bottom',
                      duration: 2000
                  });
              }else{
                  let Base64 = require('js-base64').Base64
                  let Url = '/mapi2/index.php?&act=login'
                  let formElement = document.querySelector(".UserLoginInput")
                  let formData = new FormData(formElement)
                  Indicator.open({ spinnerType: 'fading-circle' })
                  this.$http.post(Url,formData)
                      .then(response => {
                          var response = JSON.parse(Base64.decode(response.data))
                          if(response.response_code == 1){
                              storeWithExpiration.set("user_name",response.user_name,86400000)
                              storeWithExpiration.set("user_pwd",response.user_pwd,86400000)
                              storeWithExpiration.set("user_id",response.ips_acct_no,86400000)
                              _that.$router.push('/uc_center');
                          }else{
                              Toast({
                                  message: response.show_err,
                                  position: 'bottom',
                                  duration: 5000
                              });
                          }
                          Indicator.close()
                      },response => {
                      })
              }
          }

      }
  }
}
</script>
<style>
  body{background:white;}
</style>
<style scoped>
.waiting-for-you{
  height: 107px;
  background-color: #fff;
  margin-top: 45px;
  color: #242424;
  font-size: 24px;
  font-weight: bold;
  padding-top: 34px;
  padding-left: 21px;
}
.UserLogin{
  background:white;
  position:absolute;
  left:0px;
  top:0px;
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
  padding:40px 0px;
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
  /*top:-70px;*/
}
.UserLoginInput{
  padding:10px 20px;
  background:white;
  border-radius:10px;
}
.UserLoginInputList{
  padding:0px 40px 0px 25px;
  position:relative;
  height:40px;
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
::-webkit-input-placeholder {color: #b9c0d0;}
:-moz-placeholder { color: #b9c0d0;}
::-moz-placeholder { color: #b9c0d0;}
:-ms-input-placeholder { color: #b9c0d0;}
.UserLoginInputList input{
  width:100%;
  height:40px;
  background:none;
  /*text-indent:.8em;*/
  font-size:14px;
  border:none;
  color: #b9c0d0;
  margin-left: -.45rem;
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
.UserRegisterBtn{
  position:fixed;
  left:50%;
  bottom:70px;
}
.UserRegisterBtn a{
  width:54px;
  height:22px;
  border:1px solid #F4AC31;
  display:block;
  text-align:center;
  line-height:22px;
  border-radius:3px;
  color:#F4AC31;
  margin:0px -20px;
}
.UserLoginSubmit{
  margin-top:20px;
}
.UserLoginSubmit div{
  width:100%;
  text-align:center;
  line-height:40px;
  background:#F3C783;
  color:white;
  border:none;
  font-size:15px;
  border-radius:45px;
  margin-top: 40px;
}
</style>
