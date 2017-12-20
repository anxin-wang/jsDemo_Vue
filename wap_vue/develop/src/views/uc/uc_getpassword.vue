<template>
  <!--<div class="UcGetPassword">-->
    <!--<ul>-->
      <!--<li class="clear">-->
        <!--<label>原密码:</label>-->
        <!--<input v-model="old_pwd" v-show="old_pwd1" :value="old_pwd" type="password" placeholder="请输入原密码">-->
        <!--<input v-model="old_pwd" v-show="old_pwd2" :value="old_pwd" type="text">-->
        <!--<p @click.stop="old_pwd_fun"><img src="../../assets/images/user/slice_h@1.5x.png" alt=""></p>-->
      <!--</li>-->
      <!--<li class="clear">-->
        <!--<label>新密码:</label>-->
        <!--<input v-model="new_pwd" v-show="new_pwd1" type="password" placeholder="请输入新密码">-->
        <!--<input v-model="new_pwd" v-show="new_pwd2" :value="new_pwd" type="text">-->
        <!--<p @click.stop="new_pwd_fun"><img src="../../assets/images/user/slice_h@1.5x.png" alt=""></p>-->
      <!--</li>-->
      <!--<li class="clear">-->
        <!--<label>确认新密码:</label>-->
        <!--<input v-model="cfm_new_pwd" v-show="cfm_new_pwd1" type="password" placeholder="请再次输入新密码">-->
        <!--<input v-model="cfm_new_pwd" v-show="cfm_new_pwd2" :value="cfm_new_pwd" type="text">-->
        <!--<p @click.stop="cfm_new_pwd_fun"><img src="../../assets/images/user/slice_h@1.5x.png" alt=""></p>-->
      <!--</li>-->
    <!--</ul>-->
    <!--<div class="pl15 pr15 mt60">-->
      <!--<div class="But" @click.stop="info">确定修改</div>-->
    <!--</div>-->
  <!--</div>-->
</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import { MessageBox } from 'mint-ui'
export default {
  name: 'UcInvest',
  data () {
    return {
        old_pwd:"",
        old_pwd1:true,
        old_pwd2:false,
        new_pwd:"",
        new_pwd1:true,
        new_pwd2:false,
        cfm_new_pwd:"",
        cfm_new_pwd1:true,
        cfm_new_pwd2:false,
    }
  },
  mounted () {
  },
  methods:{
      old_pwd_fun () {
          this.old_pwd1 = !this.old_pwd1;
          this.old_pwd2 = !this.old_pwd2;
      },
      new_pwd_fun () {
          this.new_pwd1 = !this.new_pwd1;
          this.new_pwd2 = !this.new_pwd2;
      },
      cfm_new_pwd_fun () {
          this.cfm_new_pwd1 = !this.cfm_new_pwd1;
          this.cfm_new_pwd2 = !this.cfm_new_pwd2;
      },
      info () {
          let _that = this
          let Base64 = require('js-base64').Base64
          let Url = '/mapi2/index.php?&act=uc_save_pwd'
          let formData = new FormData();
          formData.append("email",_that.UserName());
          formData.append("pwd",_that.UserPwd());
          formData.append("user_pwd",_that.new_pwd);
          formData.append("user_pwd_confirm",_that.cfm_new_pwd);
          _that.$http.post(Url,formData)
              .then(response => {
                  var response = JSON.parse(Base64.decode(response.data));
                  if(response.response_code == 1){
                      Toast({
                          message: response.show_err,
                          position: 'bottom',
                          duration: 5000
                      });
                      _that.retLogin()
                  }else{
                      Toast({
                          message: response.show_err,
                          position: 'bottom',
                          duration: 5000
                      });
                  }
              },response => {
              })
      },
      retLogin(){
          let _that = this
          let Base64 = require('js-base64').Base64
          let Url = '/mapi2/index.php?&act=loginout'
          Indicator.open({ spinnerType: 'fading-circle' })
          _that.$http.post(Url)
              .then(response => {
                  var response = JSON.parse(Base64.decode(response.data));
                  Indicator.close()
              }).then(response => {
                  storeWithExpiration.set("user_name","");
                  storeWithExpiration.set("user_pwd","");
                  _that.$router.push('/uc_center');
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
.UcGetPassword ul li{
  padding:7px 15px;
  background:white;
  border-bottom:1px solid #e5e5e5;
}
.UcGetPassword ul li label{
  width:22%;
  line-height: 40px;
  float:left;
}
.UcGetPassword ul li input{
  width:65%;
  height:40px;
  text-indent: 10px;
  border:none;
}
.UcGetPassword ul li p{
  width:30px;
  height:30px;
  float:right;
  margin-top:10px;
}
.UcGetPassword ul li p img{
  width:100%;
}
.But{
  width: 100%;
  text-align: center;
  line-height: 44px;
  background: #f3c783;
  color: #fff;
  border: none;
  font-size: 15px;
  border-radius: 45px;
}
</style>
