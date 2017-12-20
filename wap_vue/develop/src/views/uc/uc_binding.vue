<template>
  <div class="UcBinDing">
    <div class="pl15 pr15 pt15">
      <div>
        <input v-model="real_name" type="text" name="real_name" placeholder="姓名">
        <input v-model="mobile" name="mobile" type="number" readonly="readonly" placeholder="手机号码">
        <select name="id_type" v-model="id_type">
          <option value="" disabled selected>请选择证件类型</option>
          <option value="0">身份证</option>
          <option value="1">其他</option>
        </select>
        <input type="number" v-model="id_card" name="id_card" placeholder="证件号码">
        <div class="clear">
          <p>开户行所在省市</p>
          <div class="fl mb10">
            <select v-model="province" name="" v-on:change="city">
              <option value=""  disabled selected>选择开户行所在省</option>
              <option v-for="(item,index) in region" :value="index" >{{ item.province_name }}</option>
            </select>
          </div>
          <div class="fr mb10">
            <select v-model="city_code">
              <option value=""  disabled selected>选择开户行所在市</option>
              <option v-for="item in region_city" :value="item.city_id" >{{ item.city_name }}</option>
            </select>
          </div>
        </div>
        <select name="bank_code" v-model="bank_code">
          <option value=""  disabled selected>选择银行</option>
          <option :value="item.id" v-for="item in FuiouBankList">{{item.name}}</option>
        </select>
        <input type="text" v-model="bank_branch_name" name="bank_branch_name" placeholder="开户支行(选填)">
        <p class="pb5"style="color:red;">请绑定一类银行卡账户，二类账户每日提现限额一万</p>
        <input type="number" v-model="bank_no" name="bank_no" placeholder="卡号">
        <div class="clear">
          <router-link class="fr" to="/uc_fuiou_passwd">
            <template v-if="user_fuiou_pwd != null">
              <span>已设置密码</span>
            </template>
            <template v-else>
              <span>设置密码</span>(可选)
            </template>
          </router-link>
        </div>
        <div class="text">
          <p>默认托管账户密码为注册手机号码的后<em>6位</em>;</p>
          <p>客户姓名必须与绑定的银行卡户名<em>一致</em>;</p>
          <p>手机号码作为系统登录的唯一识别旧，用于找回</p>
          <p>密码，及接收相关系统提示短信;</p>
          <p>身份证号码必须和银行开户预留证件号一致;</p>
          <p>支付密码仅在<em>用户提现时使用</em>;</p>
        </div>
        <div class="bindingBut">
          <button @click.stop="info">注册</button>
        </div>
        <p v-for="item in region.city">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import { fuioupayment } from '../../assets/js/fuioupayment_bank_info.js'
export default {
  name: 'UcInvest',
  data () {
    return {
        UserBankInfo: [],
        FuiouBankList:[],
        mobile:'',
        user_fuiou_pwd:"",
        region:[],/*地区 省*/
        province:'',
        region_city:"",/*地区 市*/
        city_code:'',
        real_name:'',
        bank_branch_name:'',
        bank_no:'',
        bank_code:'',
        id_type:'',
        id_card:'',
        UserData:[]
    }
  },
  mounted () {
      //this.mobile = this.UserName()
      this.user_fuiou_pwd = window.storeWithExpiration.get('user_fuiou_pwd')
      this.fuiou_bank ()
      this.userInfo ()/*获取手机号*/
      this.region = fuioupayment
  },
  methods:{
      /*获取信息*/
      info () {
          let _that = this
          let Base64 = require('js-base64').Base64
          let Url = '/mapi2/index.php?&act=register_idno'
          let formData = new FormData();
          let user_fuiou_pwd = window.storeWithExpiration.get('user_fuiou_pwd')
          if(user_fuiou_pwd != null){
              var loginpwd = user_fuiou_pwd.login_password
              var focharge_password = user_fuiou_pwd.focharge_password
              formData.append("login_password",loginpwd);
              formData.append("focharge_password",focharge_password);
          }else{
              var loginpwd = ""
              var focharge_password = ""
          }

          formData.append("email",_that.UserName());
          formData.append("pwd",_that.UserPwd());
          formData.append("real_name",_that.real_name);
          formData.append("mobile",_that.mobile);
          formData.append("id_type",_that.id_type);
          formData.append("id_card",_that.id_card);
          formData.append("city_code",_that.city_code);
          formData.append("bank_code",_that.bank_code);
          formData.append("bank_branch_name",_that.bank_branch_name);
          formData.append("bank_no",_that.bank_no);
          Indicator.open({ spinnerType: 'fading-circle' })
          _that.$http.post(Url,formData)
              .then(response => {
                  var response = JSON.parse(Base64.decode(response.data));
                  if(response.response_code == 1){
                      _that.UserBankInfo = response.bankList
                  }else{
                      Toast({
                          message: response.show_err,
                          position: 'bottom',
                          duration: 5000
                      });
                  }
                  console.log(response)
                  Indicator.close()
              },response => {
                  console.log(response)
              })
      },
      fuiou_bank(){
          let _that = this
          let Base64 = require('js-base64').Base64
          let Url = '/mapi2/index.php?&act=get_fuiou_support_bank'
          let formData = new FormData();
          formData.append("email",_that.UserName());
          formData.append("pwd",_that.UserPwd());
          Indicator.open({ spinnerType: 'fading-circle' })
          _that.$http.post(Url,formData)
              .then(response => {
                  var response = JSON.parse(Base64.decode(response.data));
                  if(response.response_code == 1){
                      _that.FuiouBankList = response.item
                  }else{
                      Toast({
                          message: response.show_err,
                          position: 'bottom',
                          duration: 5000
                      });
                  }
                  console.log(response)
                  Indicator.close()
              },response => {
                  console.log(response)
              })
      },
      city(){
          const code_id = this.province
          if(code_id != null){
              this.region_city = fuioupayment[code_id].city
              console.log(this.region_city)
          }
      },
      /*获取手机号啊*/
      userInfo () {
          let _that = this
          let Base64 = require('js-base64').Base64
          let Url = '/mapi2/index.php?&act=uc_center'
          let formData = new FormData();
          formData.append("email",_that.UserName())
          formData.append("pwd",_that.UserPwd())
          Indicator.open({ spinnerType: 'fading-circle' })
          _that.$http.post(Url,formData)
              .then(response => {
                  var response = JSON.parse(Base64.decode(response.data));
                  if(response.response_code == 1){
                      _that.UserData = response
                      _that.mobile = response.mobile
                  }else{
                      Toast({
                          message: response.show_err,
                          position: 'bottom',
                          duration: 5000
                      })
                  }
                  Indicator.close()
              },response => {
                  console.log(response)
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
<style>

</style>
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
