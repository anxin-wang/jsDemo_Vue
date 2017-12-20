<template>
  <div class="Authentication">
    <form action="" class="AuthenticationBox">
      <div class="BoxList">
        <label>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</label>
        <template v-if="userinfo != null">
          <input type="text" readonly="readonly" :value="userinfo.real_name | NameFil">
        </template>
        <template v-else>
          <input type="text" value="" placeholder="请输入真实姓名">
        </template>
      </div>
      <div class="BoxList">
        <label>身份证号</label>
        <template v-if="userinfo != null">
          <input type="text" readonly="readonly" :value="userinfo.idno | idnoFil">
        </template>
        <template v-else>
          <input type="text" value="" placeholder="请输入身份证号码">
        </template>
      </div>
      <p>*认证成功后,认证信息将不可修改</p>
      <div class="UserLoginSubmit">
        <div>恭喜您已绑定富友托管账户</div>
      </div>
    </form>
  </div>
</template>

<script>
import PublicButton from '../../components/PublicButton.vue'
import { Indicator } from 'mint-ui'
import { MessageBox } from 'mint-ui'
export default {
    name: 'Authentication',
    components: {PublicButton},
    data () {
      return {
          userinfo:[]
      }
    },
    mounted(){
      this.info()
    },
    methods:{
        info () {
            let _that = this
            let Base64 = require('js-base64').Base64
            let Url = '/mapi2/index.php?&act=uc_center'
            let user_name = window.storeWithExpiration.get('user_name')
            let user_pwd = window.storeWithExpiration.get('user_pwd')
            let formData = new FormData();
            formData.append("email",user_name)
            formData.append("pwd",user_pwd)
            Indicator.open({ spinnerType: 'fading-circle' })
            _that.$http.post(Url,formData)
                .then(response => {
                    var response = JSON.parse(Base64.decode(response.data));
                    if(response.response_code == 1){
                        this.userinfo = response
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
    },
    filters:{
        NameFil(e){
            let reg = /^(.).+$/g;
            let rs = e.replace(reg, "$1*$2")
            return rs
        },
        idnoFil(e){
            let rs = e.substr(0,6)+'********'+e.substr(e.length-4)
            return rs
        }
    }
}
</script>

<style scoped>
.Authentication .BoxList{
  width:100%;
  padding:5px 12px 5px 70px;
  background:white;
  position:relative;
  border-bottom:1px solid #E5E5E5;
}
.Authentication .BoxList:last-child{border-bottom:0px;}
.Authentication .BoxList label{
  position:absolute;
  left:12px;
  top:50%;
  transform: translate(0%, -50%);
  font-size:15px;
}
.Authentication .BoxList input{
  width:100%;
  height:40px;
  border:none;
  font-size:15px;
  text-indent:10px;
}
.AuthenticationBox p{
  padding:0px 12px;
  color:red;
  margin:5px;
}
.UserLoginSubmit{
  padding:0px 10px;
  margin-top:20px;
}
.UserLoginSubmit div{
  width:100%;
  text-align:center;
  line-height:35px;
  background:#ccc;
  color:white;
  border:none;
  font-size:15px;
  border-radius:45px;
}
</style>
