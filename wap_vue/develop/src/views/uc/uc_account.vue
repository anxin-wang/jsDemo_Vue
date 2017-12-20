<template>
  <div class="uc_account">
    <ul>
      <li v-for="item in active1">
        <router-link :to="item.Url" class="clear">
          <div class="uc_fl lh50 f14">{{ item.Text }}</div>
          <div class="uc_fr">
            <div class="clear">
              <img style="width: 50px" width="50" class="mr10 fl" v-if="item.Img" :src="item.Img" alt="">
              <p class="fl lh50 mr15" v-if="item.R_Text">{{ item.R_Text }}</p>
              <Icon class="f24 fl lh50"  type="ios-arrow-right"></Icon>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <ul class="mt10">
      <li v-for="item in active2">
        <router-link :to="item.Url" class="clear">
          <div class="uc_fl lh35 f14">{{ item.Text }}</div>
          <div class="uc_fr">
            <div class="clear">
              <img style="width: 50px" width="50" class="mr10 fl" v-if="item.Img" :src="item.Img" alt="">
              <p class="fl lh35 mr15" v-if="item.R_Text">{{ item.R_Text }}</p>
              <Icon class="f24 fl lh35"  type="ios-arrow-right"></Icon>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <div style="height:100px;"></div>
    <div class="UserLoginSubmit">
      <div @click.stop="Out">退出</div>
    </div>
    <div style="height:100px;"></div>
    <div class="tianfu clear">
      <p class="fl mr10"><img width="16" src="../../assets/images/investment/tianfu.png" alt=""></p>
      <p class="fl lh20">平台账户资金由富友托管</p>
    </div>
    <div class="SignOutFixed" v-show="isShow">
      <div class="Sign_outBox">
        <div class="InfoPrompt">
          <h3>是否要退出账号？</h3>
          <div class="clear OutInfo">
            <div @click.stop="cancel" class="fl">取消</div>
            <div @click.stop="Sign_out()" class="fl">确认退出</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
import { ucLoginOut } from '../../service/getData'
export default {
  name: 'uc_account',
  data () {
    return {
        isShow: false,
        active1: [
            {Text: '头像',R_Text: '', Url: '#' ,Img: require('../../assets/images/ucenter/uc_icon11@1.5x.png')}
        ],
        active2: [
            {Text: '修改登录密码',R_Text: '', Url: '/uc_getpassword' },
            {Text: '修改邀请码',R_Text: '', Url: '/uc_getInvitation' },
        ],
        cook:""
    }
  },
  mounted () {

  },
  methods: {
      Out () {
        this.isShow = true
      },
      cancel () {
          this.isShow = false
      },
      Sign_out(){
          let _that = this
          storeWithExpiration.remove("user_name");
          storeWithExpiration.remove("user_pwd");
          storeWithExpiration.remove("MallUserName");
          storeWithExpiration.remove("MallUserPwd");
          ucLoginOut().then(res => {
              console.log(res)
          })
          _that.$router.push('/uc_center');
      }
  }
}
</script>

<style scoped>
.lh50{line-height:50px;}
.uc_account ul li{
  padding:5px 10px;
  background:white;
  border-style:solid none none;
  border-width:1px;
  border-color:#D9D9D9;
  line-height:30px;
}
.uc_account ul li a{
  display:block;
}
.uc_account ul li a .uc_fl{
  float:left;
}
.uc_account ul li a .uc_fr{
  float:right;
}
.tianfu{
  width:210px;
  position:fixed;
  left:50%;
  bottom: 30px;
  transform: translate(-50%, 0%);
}
.SignOutFixed{
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.5);
  position:fixed;
  left:0px;
  top:0px;
  z-index: 999999;
}
.SignOutFixed .Sign_outBox{
  width:90%;
  height:100px;
  background:white;
  border-radius:3px;
  position:fixed;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
}
.InfoPrompt{
  padding:15px 20px;
}
.OutInfo{
  width:100px;
  float:right;
  margin-top:20px;
}
.OutInfo > div{
  width:50%;
  color:green;
}
</style>
