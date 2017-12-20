<template>
  <div class="Feedback">
      <div class="Feedback_tit">欢迎您提出宝贵的意见和建议,您留下的每个字都将用来改善我们的软件</div>
      <div class="Feedback_con">
        <textarea v-model="Feedback_con" placeholder="请输入您的意见和建议"></textarea>
      </div>
      <div class="Feedback_email mt10"><input v-model="email" type="text" placeholder="请输入您的电子邮件"></div>
      <div class="pl15 pr15 pt50">
          <div class="but" @click.stop="info">提交</div>
      </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
export default {
  name: 'UcInvest',
  data () {
    return {
        Feedback_con:"",
        email:"",
        UserInfo:""
    }
  },
    mounted () {
      this.userinfo()
    },
    methods:{
        /*获取信息*/
        info () {
            let _that = this
            let Base64 = require('js-base64').Base64
            let Url = '/mapi2/index.php?&act=feedback'
            let formData = new FormData();
            formData.append("advice",_that.Feedback_con);
            formData.append("email",_that.email);
            formData.append("username",_that.UserName());
            formData.append("password",_that.UserPwd());
            Indicator.open({ spinnerType: 'fading-circle' })
            _that.$http.post(Url,formData)
                .then(response => {
                    var response = JSON.parse(Base64.decode(response.data));
                    Toast({
                        message: response.error,
                        position: 'bottom',
                        duration: 5000
                    });
                    Indicator.close()
                })
        },
        userinfo(){
            let _that = this
            let Base64 = require('js-base64').Base64
            let Url = '/mapi2/index.php?&act=uc_center'
            let formData = new FormData();
            formData.append("email",_that.UserName());
            formData.append("pwd",_that.UserPwd());
            Indicator.open({ spinnerType: 'fading-circle' })
            _that.$http.post(Url,formData)
                .then(response => {
                    var response = JSON.parse(Base64.decode(response.data));
                    _that.UserInfo = response
                    Indicator.close()
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
.Feedback_tit{
  padding:10px 12px;
  background:#f8f3f3;
  color:#666;
}
.Feedback_con,
.Feedback_email{
  padding:10px 12px;
  background:white;
}
.Feedback_con textarea{
  width:100%;
  min-height:180px;
  font-size:14px;
  text-indent: 10px;
  padding:5px;
  border:none
}
.Feedback_email input{
  width:100%;
  height:30px;
  text-indent: 10px;
  border:none;
  font-size:14px;
}
.but{
  width:100%;
  line-height:45px;
  text-align:center;
  background:#f4ac31;
  border-radius:45px;
  font-size:15px;
  color:white;
  box-shadow: 0px 4px 2px rgba(0,0,0,0.1);
}
</style>
