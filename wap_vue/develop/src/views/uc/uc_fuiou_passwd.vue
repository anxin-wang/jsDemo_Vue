<template>
  <div class="UcBinDing">
    <div class="pl15 pr15 pt15">
      <div>
        <input v-model="login_password" type="password" :placeholder="login_pwd_text">
        <input v-model="login_password_confirm" name="login_password" type="password" :placeholder="'确认'+login_pwd_text">
        <p class="mb10 mt10 f15">富友交易密码</p>
        <input v-model="focharge_password" type="password" :placeholder="trade_pwd_text">
        <input v-model="focharge_password_confirm" type="password" name="focharge_password" :placeholder="'确认'+trade_pwd_text">
        <div class="text">
          <p>登录密码及<em>富友交易密码</em>设置规则;</p>
          <p>密码需由不少于8位的字母和数字混合组成，<em>支持" _ "</em>;</p>
        </div>
        <div class="zhu mt20">
          <span>注:非银行卡取款密码，该密码仅用于金账户资金提现至银行卡时使用。</span>
        </div>
        <div class="bindingBut">
          <button @click.stop="info">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
  name: 'UcInvest',
  data () {
    return {
        login_password:'',
        login_password_confirm:'',
        focharge_password:'',
        focharge_password_confirm:'',
        Verification:false,
        login_pwd_text:"登录密码",
        trade_pwd_text:"交易密码"

    }
  },
  mounted () {

  },
  methods:{
      /*获取信息*/
      info () {
          let _that = this
          if(_that.login_password == ""){
              _that.passwd(_that.login_password,_that.login_pwd_text)
              return false
          }else{
              if(_that.login_password_confirm == ""){
                  _that.passwd(_that.login_password_confirm,"确认"+_that.login_pwd_text)
                  return false
              }else{
                  _that.Verification = true
                  if(_that.Verification != false){
                      if(_that.login_password !== _that.login_password_confirm){
                          this.MintUiToast("两次"+_that.login_pwd_text+"不一致")
                          return false
                      }else{
                          if(_that.focharge_password == ""){
                              _that.passwd(_that.focharge_password,_that.trade_pwd_text)
                              return false
                          }else{
                              if(_that.focharge_password_confirm == ""){
                                  _that.passwd(_that.focharge_password_confirm,"确认"+_that.trade_pwd_text)
                                  return false
                              }else{
                                  if(_that.Verification != false){
                                      if(_that.focharge_password !== _that.focharge_password_confirm){
                                          this.MintUiToast("两次"+_that.trade_pwd_text+"不一致")
                                          return false
                                      }else{
                                          let user_fuiou_pwd = {
                                              login_password:_that.login_password,
                                              focharge_password:_that.focharge_password,
                                          }
                                          storeWithExpiration.set("user_fuiou_pwd",user_fuiou_pwd,86400000)
                                          this.MintUiToast("密码设置成功")
                                          _that.$router.push('/uc_binding');
                                          return true
                                      }
                                  }
                              }
                          }

                      }
                  }
              }
          }
      },
      passwd(password,pwdname){
          let str = password
          var name = pwdname
          if (str == null || str.length <8) {
              this.MintUiToast(name+"不能为空或小于8位")
              this.Verification = false
              return false;
          }
          let reg1 = new RegExp(/^[0-9A-Za-z]+$/);
          if (!reg1.test(str)) {
              this.Verification = false
              return false;
          }
          let reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
          if (reg.test(str)) {
              this.Verification = true
              return true;
          } else {
              this.Verification = false
              this.MintUiToast(name+"必须为字母加数字")
              return false;
          }
      },
      MintUiToast(value){
          Toast({
              message: value,
              position: 'bottom',
              duration: 1500
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
.UcBinDing{
  position:fixed;
  left:0;
  top:45px;
  width:100%;
  height:100%;
  overflow-y: auto;
  padding-bottom:55px;
  background:#E5E5E5;
}
.UcBinDing div input,.UcBinDing div select{
  width:100%;
  height:44px;
  margin-bottom:10px;
  border-radius:4px;
  border:1px solid #D9D9D9;
  background:white;
  text-indent: .5em;
}
.UcBinDing div.clear{
  width:100%;
}
.UcBinDing div.clear div{
  width:48%;
}
.UcBinDing div em{
  color: #73d1ff;
}
.UcBinDing div span{
  color:red;
}
.bindingBut button{
  width:100%;
  height:45px;
  margin:30px 0px;
  border-radius:45px;
  background:#F3AD45;
  border:none;
  box-shadow: none;
  color:white;
  font-size:15px;
}
</style>
