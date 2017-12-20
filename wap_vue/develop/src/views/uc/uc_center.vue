<template>
  <div class="jg-uc_center" :style="'min-height:'+screenHeight+'px'">
    <!--头部 html-->
    <div class="clear jg-header-top">
      <h1 class="fl">我的</h1>
      <div class="fr" @click.stop="clickUrl()">
        <p class="fl mr15 f14">{{UserData.user_login_status == 0 ? "未登录" : UserData.user_name | nameinfo}}</p>
        <div class="jg-header-portrait fl"><img src="../../assets/images/ucenter/portrait.png" alt=""></div>
      </div>
    </div>
    <!--资产账户信息 html-->
    <div class="jg-account-info">
      <div class="clear">
        <div class="fl jg-assets-info">
          <h2>账户总资产(元)</h2>
          <h1 v-if="UserData.user_login_status != 0">{{UserData.total_money == 0 ? "0.00" : UserData.total_money | NumberMoney }}</h1>
          <h1 v-else>--</h1>
        </div>
        <div class="fr jg-RechargeAndEnchashment ">
          <router-link to="#" @click.native="clickUrl('uc_recharge')">充值</router-link>
          <router-link to="#" @click.native="clickUrl('uc_money_carry')">提现</router-link>
        </div>
      </div>
      <div class="clear jg-assets-account-info mt10">
        <div class="fl">
          <router-link to="#">
            <p>可用余额(元)</p>
            <h3 v-if="UserData.user_login_status != 0">{{ UserData.ips_balance == 0 ? "0.00" : UserData.ips_balance | NumberMoney }}</h3>
            <h3 v-else>--</h3>
          </router-link>
        </div>
        <div class="fl">
          <router-link to="#">
            <p>累计收益(元)</p>
            <h3 v-if="UserData.user_login_status != 0">{{ UserData.load_wait_repay_money == null ? "0.00" : UserData.load_wait_repay_money | NumberMoney }}</h3>
            <h3 v-else>--</h3>
          </router-link>
        </div>
        <div class="fl">
          <router-link to="#">
            <p>冻结金额(元)</p>
            <h3 v-if="UserData.user_login_status != 0">{{ UserData.ips_lock == 0 ? "0.00" : UserData.ips_lock | NumberMoney }}</h3>
            <h3 v-else>--</h3>
          </router-link>
        </div>
      </div>
    </div>
    <!--我的列表信息 html-->
    <div class="jg-list-info">
      <h3>我的</h3>
      <ul>
        <li>
          <router-link to="#" class="clear" @click.native="clickUrl('uc_invest')">
            <span><img src="../../assets/images/ucenter/icon01@1.5x.png" alt=""></span>
            <p class="fl">投资记录</p>
            <Icon class="fr" size="25" type="ios-arrow-right"></Icon>
          </router-link>
        </li>
        <li>
          <router-link to="#" class="clear" @click.native="clickUrl('uc_ips_carry')">
            <span><img src="../../assets/images/ucenter/icon02@1.5x.png" alt=""></span>
            <p class="fl">资金记录</p>
            <Icon class="fr" size="25" type="ios-arrow-right"></Icon>
          </router-link>
        </li>
        <li>
          <router-link to="#" class="clear" @click.native="clickUrl('uc_coupon')">
            <span><img src="../../assets/images/ucenter/icon03@1.5x.png" alt=""></span>
            <p class="fl">我的卡券</p>
            <Icon class="fr" size="25" type="ios-arrow-right"></Icon>
          </router-link>
        </li>
        <li>
          <router-link to="#" class="clear" @click.native="clickUrl('uc_bank')">
            <span><img src="../../assets/images/ucenter/icon04@1.5x.png" alt=""></span>
            <p class="fl">银行卡</p>
            <Icon class="fr" size="25" type="ios-arrow-right"></Icon>
          </router-link>
        </li>
      </ul>
    </div>
    <!--账户设置列表信息 html-->
    <div class="jg-list-info">
      <h3 class="mt10">账户设置</h3>
      <ul class="pb50">
        <li>
          <router-link to="#" class="clear" @click.native="clickShare('share')">
            <span><img src="../../assets/images/ucenter/icon05@1.5x.png" alt=""></span>
            <p class="fl">分享</p>
            <Icon class="fr" size="25" type="ios-arrow-right"></Icon>
          </router-link>
        </li>
        <li>
          <router-link to="#" class="clear" @click.native="clickUrl('uc_account')">
            <span><img src="../../assets/images/ucenter/icon06@1.5x.png" alt=""></span>
            <p class="fl">账户设置</p>
            <Icon class="fr" size="25" type="ios-arrow-right"></Icon>
          </router-link>
        </li>
      </ul>
    </div>
    <!--微信分享 组件-->
    <wxshare :isShow="isShow" :shareDataobj="shareDataobj" v-on:popuphide="popuphide"></wxshare>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import { screenHeight } from '../../service/toastInfo'
import { ucEnter } from '../../service/getData'
export default {
    components:{
        wxshare:require('../../components/share.vue')
    },
    data () {
        return {
            UserData: [],
            isShow:false,
            shareDataobj:{},
            /*获取屏幕的高度*/
            screenHeight:screenHeight
        }
    },
    mounted () {
        let _that = this
        _that.info()
    },
    methods: {
        /*获取用户信息*/
        info () {
            let _that = this
            /*wap 账号密码*/
            const wapName = window.storeWithExpiration.get('user_name')
            const wapPwd = window.storeWithExpiration.get('user_pwd')
            ucEnter(wapName,wapPwd).then(res => {
                _that.UserData = res
                storeWithExpiration.set("ips_balance",res.ips_balance,86400000)
            })
        },
        clickUrl(url){
            var _that = this
            /*未登录*/
            var loginInfo = _that.UserData.user_login_status
            if(loginInfo == undefined){
                var loginInfo = 0
            }
            /*绑定托管信息 0未绑定 1绑定宝付 2绑定富友*/
            var ips_type = _that.UserData.ips_type
            if(url != null){
                if(loginInfo == 0){
                    /*未登录 跳转到登录页面*/
                    _that.$router.push('/login')
                }else if(ips_type == 0){
                    /*显示绑定托管 弹窗*/
                    let confirm = {confirmButtonText:"立即绑定",cancelButtonText:"稍后再说"}
                    let Text = "绑定第三方托管账户，开启理财之旅，是否现在绑定"
                    MessageBox.confirm(Text,"绑定托管账户",confirm).then(action => {
                        _that.$router.push('/uc_binding');
                    })
                }else if(ips_type == 2){
                    /*ips_type = 2 绑定富友  跳转到对应的页面*/
                    _that.$router.push('/'+url)
                }
            }else{
                _that.$router.push('/login')
            }
        },
        /*分享*/
        clickShare(i){
            if(i != undefined){
                if(i == "share"){
                    /*分享信息*/
                    let domain = location.href.split('#')[0];
                    this.shareDataobj = {
                        title:"坚果理财",
                        desc:"坚果理财,你见过的最靠谱理财平台",
                        Url:domain
                    }
                    this.isShow = true
                }
            }
        },
        popuphide(data){
            this.isShow = data
        },
    },
    filters:{
        nameinfo(val){
            if(val != undefined){
                if(val != "未登录"){
                    return val.substr(0,3)+'***'+val.substr(val.length-3)
                }else{
                    return val
                }
            }else{
                return "--"
            }

        },
        NumberMoney(val){
            /*数字格式化为货币格式*/
            function formatMoney(number, places, symbol, thousand, decimal) {
                number = number || 0;
                places = !isNaN(places = Math.abs(places)) ? places : 2;
                /*symbol = symbol !== undefined ? symbol : "$";*/
                symbol = symbol !== undefined ? symbol : "";
                thousand = thousand || ",";
                decimal = decimal || ".";
                var negative = number < 0 ? "-" : "",
                    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
                    j = (j = i.length) > 3 ? j % 3 : 0;
                return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
            }
            return formatMoney(val)
        }
    }
}
</script>

<style scoped lang="less">
@import "../../assets/css/common.less";
h1,h2,h3,h4,h5,h6{font-weight: normal;}
.jg-uc_center{
  width:100%;
  background:white;
  position:absolute;
  left:0%;
  top:0%;
}
/*头部 css*/
.jg-header-top{
  margin:0px 15px;
  padding:10px 0px;
  line-height:30px;
  border-bottom:1px solid #e5e5e5;
  h1{
    font-size:18px;
    color:black;
  }
  .jg-header-portrait{
    width:30px;
    height:30px;
    border-radius:50%;
    overflow: hidden;
    img{
      width:100%;
    }
  }
}
/*资产账户信息 css*/
.jg-account-info{
  padding:10px 15px;
  .jg-assets-info{
    h2{
      font-size:30/2px;
      color:#96A0B7;
    }
    h1{
      font-size:70/2px;
      color:@maincolor;
      margin-top:5px;
    }
  }
  .jg-RechargeAndEnchashment{
    a{
      display:block;
      width:150/2px;
      height:60/2px;
      text-align:center;
      line-height:60/2px;
      font-size:30/2px;
      border-radius:30/2px;
      margin-bottom:10px;
      font-weight:600;
      &:nth-child(1){
        color:#68ADFF;
        border:1px solid #68ADFF;
      }
      &:nth-child(2){
        color:@maincolor;
        border:1px solid @maincolor;
      }
    }
  }
  .jg-assets-account-info{
    div.fl{
      width:33.33333%;
      a{
        display:block;
        padding:28px 12px;
        color:white;
        p{
          font-size:24/2px;
        }
        h3{
          font-size:30/2px;
          margin-top:5px;
        }
      }
      &:nth-child(1){
        a{background:url("../../assets/images/ucenter/red_bg.png") center center /100% 100% no-repeat;}
      }
      &:nth-child(2){
        a{background:url("../../assets/images/ucenter/blue_bg.png") center center /100% 100% no-repeat;}
      }
      &:nth-child(3){
        a{background:url("../../assets/images/ucenter/yllew_bg.png") center center /100% 100% no-repeat;}
      }
    }
  }
}
/*账户设置列表信息 css*/
.jg-list-info{
  padding:5px 15px;
  h3{
    font-size:36/2px;
  }
  ul{
      li{
          border-bottom:1px solid #e5e5e5;
          padding:8px 0px;
          a{
            display: block;
            position:relative;
            line-height:30px;
            padding-top:8px;
            p{
              font-size:30/2px;
              color:#333;
              margin-left:40px;
            }
            span{
              width:30px;
              height:30px;
              position:absolute;
              left:0px;
              top:8px;
              img{width:100%;}
            }
          }
      }
  }
}
/*iphone5手机下面显示css样式*/
@media screen and (min-width: 320px) and (max-width:374px){
  .jg-account-info .jg-assets-info h1{
    font-size:30px;
  }
  .jg-account-info .jg-assets-account-info div.fl a{
    padding:28px 8px;
  }
}
</style>
