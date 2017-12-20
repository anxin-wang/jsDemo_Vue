<template>
  <div class="Ucenter">
    <div class="CenHeader">
      <div class="CenHeaderBox">
        <div class="UserName clear">
          <div class="fl"><img src="../../assets/images/ucenter/uc_icon10@1.5x.png" alt=""></div>
          <div class="fl">
            <template v-if="UserData.ips_type != null">
              {{ UserData.user_name }}
            </template>
            <template v-else>
              <router-link class="white" to="/login">未登录</router-link>
            </template>
          </div>
        </div>
        <div class="UserMoney">
          <h1>
            <template v-if="UserData.ips_type != null">
              <template v-if="UserData.total_money != null">
                {{ UserData.total_money }}
              </template>
              <template v-else>
                0.00
              </template>
            </template>
            <template v-else>
              --
            </template>
          </h1>
          <p>账户总资产(元)</p>
          <div class="ShowMoney">
            <img src="../../assets/images/ucenter/eye@1.5x.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="AccountMoney">
      <div class="AccountMoneyBox">
        <div class="AccountMoneyBox1">
          <ul class="dispalyfiex">
            <li>
              <h2>
                <template v-if="UserData.ips_type != null">
                  <template v-if="UserData.ips_balance != null">
                    {{ UserData.ips_balance }}
                  </template>
                  <template v-else>
                    0.00
                  </template>
                </template>
                <template v-else>
                  --
                </template>
              </h2>
              <p>可用余额(元)</p>
            </li>
            <li>
              <h2>
                <template v-if="UserData.ips_type != null">
                  <template v-if="UserData.ips_lock != null">
                    {{ UserData.ips_lock }}
                  </template>
                  <template v-else>
                    0.00
                  </template>
                </template>
                <template v-else>
                  --
                </template>
              </h2>
              <p>冻结金额(元)</p>
            </li>
            <li>
              <h2>
                <template v-if="UserData.ips_type != null">
                  <template v-if="UserData.load_wait_repay_money != null">
                    {{ UserData.load_wait_repay_money }}
                  </template>
                  <template v-else>
                    0.00
                  </template>
                </template>
                <template v-else>
                  --
                </template>
              </h2>
              <p>累计收益(元)</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="CenRecharge">
      <div class="CenRechargeBox">
        <div class="CenRechargeCon dispalyfiex">
          <template v-if="UserData">
            <template v-if="UserData.ips_type != 0">
              <router-link to="/uc_recharge">充值</router-link>
              <router-link to="/uc_money_carry">提现</router-link>
            </template>
            <template v-else>
              <a @click.stop="lcick">充值</a>
              <a @click.stop="lcick">提现</a>
            </template>
          </template>
          <template v-else>
            <router-link to="/login">充值</router-link>
            <router-link to="/login">提现</router-link>
          </template>

        </div>
        <div class="Division"></div>
        <div class="UserMoneyInfo">
          <ul class="clear">
            <li>
              <router-link to="#" class="clear1">
                <div class="fl">
                  <img src="../../assets/images/ucenter/uc_icon12@1.5x.png" alt="">
                </div>
                <div class="fl">
                  <p>邀请好友</p>
                  <span>奖励丰厚</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="/red_packets" class="clear1">
                <div class="fl">
                  <img src="../../assets/images/ucenter/uc_icon13@1.5x.png" alt="">
                </div>
                <div class="fl">
                  <p>红包</p>
                  <span>邀请好友注册得红包</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="/uc_ips_create" class="clear1">
                <div class="fl">
                  <img src="../../assets/images/ucenter/uc_icon03@1.5x.png" alt="">
                </div>
                <div class="fl">
                  <p>资金记录</p>
                  <span>资金明细 一目了然</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="/uc_invest" class="clear1">
                <div class="fl">
                  <img src="../../assets/images/ucenter/uc_icon02@1.5x.png" alt="">
                </div>
                <div class="fl">
                  <p>投资记录</p>
                  <span>投资收益清晰可见</span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="ConList">
          <ul>
            <li v-for="item in ConList"  @click.stop="lcick(item.cliVal)">
              <router-link :to="item.Url" class="clear">
                <div class="fl"><img :src="item.Img" alt=""></div>
                <div class="fl ml10">{{ item.Name }}</div>
                <div class="fr">
                    <span v-if="item.Text != null">
                      <template v-if="UserData.ips_type != null">
                        <template v-if="UserData.ips_type == 2">
                          已绑定富友托管
                        </template>
                        <template v-else>
                          {{ item.Text }}
                        </template>
                      </template>
                      <template v-else>
                        未登录
                      </template>
                    </span>
                  <Icon class="f24" type="ios-arrow-right"></Icon>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="Division"></div>
        <div class="ConList">
          <ul>
            <li v-for="item in ConList1" @click.stop="testclick(item.cli)">
              <router-link :to="item.Url" class="clear">
                <div class="fl"><img :src="item.Img" alt=""></div>
                <div class="fl ml10">{{ item.Name }}</div>
                <div class="fr"><Icon class="f24" type="ios-arrow-right"></Icon></div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisible4" position="bottom" class="mint-popup-4">
      <div class="share_box">
        <h3>分享到</h3>
        <div class="share_list">
          <ul class="clear">
            <li>
              <img src="../../assets/images/ucenter/share_weixin@3x.png" alt="">
              <p class="f14">微信</p>
            </li>
            <li>
              <img src="../../assets/images/ucenter/share_pengyouquan@3x.png" alt="">
              <p class="f14">朋友圈</p>
            </li>
            <li>
              <img src="../../assets/images/ucenter/share_qq@3x.png" alt="">
              <p class="f14">QQ</p>
            </li>
            <li>
              <img src="../../assets/images/ucenter/share_weibo@3x.png" alt="">
              <p class="f14">新浪</p>
            </li>
          </ul>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>

import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import { MessageBox } from 'mint-ui'
export default {
    data () {
        return {
            ConList: [],
            ConList1: [],
            UserData: '',
            popupVisible4:false,
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
                        _that.UserData = response
                        storeWithExpiration.set("ips_balance_format",response.ips_balance_format,86400000)
                        storeWithExpiration.set("ips_balance",response.ips_balance,86400000)
                        _that.listdata()
                    }else{
                        _that.listdata()
                        $.each(_that.ConList,function(key, val){
                            val.Url = "/login"
                        })
                        $.each(_that.ConList1,function(key, val){
                            val.Url = "/login"
                        })
                    }
                    console.log(response)
                    Indicator.close()
                },response => {
                    console.log(response)
                })
        },
        lcick(i){
            console.log(i)
            if(i != null){
                let confirm = {confirmButtonText:"立即绑定",cancelButtonText:"稍后再说"}
                let Text = "绑定第三方托管账户，开启理财之旅，是否现在绑定"
                MessageBox.confirm(Text,"绑定托管账户",confirm).then(action => {
                    window.location.href="/wap_vue/#/uc_binding"
                })
            }
            return false
        },
        listdata(){
            let lineData = this.UserData
            if(lineData != null){
                if(lineData.ips_type == 0){
                    var list_t = [
                        {
                            Name: '实名认证',
                            Img: require('../../assets/images/ucenter/uc_icon01@1.5x.png'),
                            Url: '#',
                            cliVal:1,
                            Text: '未实名'
                        }
                    ]
                }else{
                    var list_t = [
                        {Name: '实名认证', Img: require('../../assets/images/ucenter/uc_icon01@1.5x.png'), Url: '/authentication', Text: '未实名'},
                    ]
                }
            }
            var list_b = [
                {Name: '银行卡', Img: require('../../assets/images/ucenter/uc_icon04@1.5x.png'), Url: '/uc_bank'},
                {Name: '我的卡券', Img: require('../../assets/images/ucenter/uc_icon05@1.5x.png'), Url: '/uc_coupon'},
                {Name: '分享', Img: require('../../assets/images/ucenter/uc_icon08@1.5x.png'), Url: '#',cli:"share"},
                {Name: '账户设置', Img: require('../../assets/images/ucenter/uc_icon07@1.5x.png'), Url: '/uc_account'},
                /*{Name: '版本好1.1.1', Img: require('../../assets/images/ucenter/uc_icon08@1.5x.png'), Url: '#'}*/
            ]
            this.ConList = list_t
            this.ConList1 = list_b

        },
        testclick(i){
            if(i != undefined){
                if(i == "share"){
                    /*this.popupVisible4 = true*/
                }
            }
        }
    }
}
</script>
<style>
  .mint-msgbox-title{
    font-weight:normal;
    color:black;
  }
  .mint-msgbox-message{
    font-weight:normal;
    font-size:14px;
    color:#333;
    line-height:22px;
    padding:20px 0px;
  }
  .mint-msgbox-btns{
    height:50px;
    line-height:50px;
    font-size:14px;
    font-weight:normal;
  }
  .mint-popup{width:100%;}
  .share_box{
    width:100%;
    min-height:200px;
    background:white;
    position:absolute;
    left:0px;
    bottom:0px;
  }
  .share_box h3{
    width:100%;
    line-height:35px;
    padding-left:1.2rem;
    font-size:15px;
    border-bottom:1px solid #E5E5E5;
  }
  .share_box .share_list{
    padding:1rem 1.2rem;
  }
  .share_box .share_list ul li{
    width: 33%;
    text-align: center;
    float:left;
    margin-bottom:20px;
  }
  .share_box .share_list ul li img{
    width:45%;
  }
</style>
<style scoped lang="less">
@import '../../assets/css/ucenter.less';
</style>
