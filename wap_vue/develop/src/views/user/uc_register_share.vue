<template>
  <div class="uc_register_share">
    <img width="100%" src="../../assets/images/user/register_bg.png" alt="">
    <div class="reg-wrap">
        <div class="reg-Explain">
        您的好友<span>{{ mobileNum | NameFil }}</span>邀请您投资并为您开启加息通道,您的好友已经安全理财{{number_day}}天,福利就是要分享！
      </div>
        <div class="reg-user-input">
        <div class="reg-input">
          <input type="text" v-model="mobile" value="" v-on:input="mobileInput" placeholder="请输入手机号码">
        </div>
        <div class="reg-input">
            <NECaptcha></NECaptcha>
        </div>
        <div class="reg-input clear">
          <div class="fl" style="width:55%;">
            <input type="text" v-model="CodeNumber" value="" placeholder="请输入验证码">
          </div>
          <div class="fr" style="width:35%;">
            <TimerBtn :mobilecode="codedata"></TimerBtn>
          </div>
        </div>
        <div class="reg-input">
          <input type="password" v-if="ShowPwd == true" v-model="pwd" placeholder="请输入密码">
          <input type="text" v-if="ShowPwd != true" v-model="pwd" placeholder="请输入密码">
          <div class="ShowPwdBut" @click.stop="ShowPwd = !ShowPwd">
            <img v-if="ShowPwd == true" src="../../assets/images/user/slice_h@1.5x.png" alt="">
            <img v-if="ShowPwd != true" src="../../assets/images/user/reg_img_9.png" alt="">
          </div>
        </div>
        <p>邀请码<span class="pl10">{{InvitationNum}}</span></p>
      </div>
        <div class="reg-but" @click.stop="register">注册领取大礼包</div>
        <div class="registerAgreement">
          <input type="radio" checked="true" class="hide" id="Agreement">
          <label for="Agreement">
              <p>我已阅读并同意<span @click.stop="Agree">《坚果理财用户协议》</span></p>
          </label>
      </div>
        <!--新手福利-->
       <!-- <p class="mt20 mb20 pl30 pr30"><img width="100%" src="../../assets/images/user/reg_img_10.png" alt=""></p>
        <div class="welfare">
            <i></i>
            <div class="welfareTitleText">
                <img src="../../assets/images/user/reg_img_5.png" alt="">
            </div>
            <div class="welfareInfo">
                <div class="decorate">
                    <i></i><span></span>
                </div>
                <ul class="clear">
                    <li>
                        <img src="../../assets/images/user/reg_img_3.png" alt="">
                        <p>好友赠送</p>
                    </li>
                    <li>
                        <img src="../../assets/images/user/reg_img_2.png" alt="">
                        <p>注册礼包</p>
                    </li>
                    <li>
                        <img src="../../assets/images/user/reg_img_1.png" alt="">
                        <p>实名认证</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="welfare">
            <i style="right:50%;"></i>
            <div class="welfareTitleText">
                <img style="width:35%;" src="../../assets/images/user/reg_img_4.png" alt="">
            </div>
            <div class="welfareInfo">
                <div class="decorate">
                    <i></i><span></span>
                </div>
                <div class="pl10 pr10 f14 red-lucky-money pb35">
                    <p class="pt50">1.专享20红包：</p>
                    <p class="mt6">好友实名注册,邀请人和好友各得20元现金红包。</p>
                    <p class="pt20">2.投资有礼：</p>
                    <p class="mt6">好友有效投资(投资金额≥500元,投资时间≥30天),邀请人即可获得相应奖励,上不封顶。</p>
                    <p class="mt10">获得奖励:</p>
                    <div class="Hbinfo">
                        <ul>
                            <li class="clear">
                                <div class="fl" style="width:20%;">第1位</div>
                                <div class="fr" style="width:78%;">20元现金红包</div>
                            </li>
                            <li class="clear">
                                <div class="fl" style="width:20%;">第2位</div>
                                <div class="fr" style="width:78%;">20元现金红包</div>
                            </li>
                            <li class="clear">
                                <div class="fl" style="width:20%;">第3位</div>
                                <div class="fr" style="width:78%;">20元现金红包</div>
                            </li>
                            <li class="clear">
                                <div class="fl" style="width:20%;">第n位</div>
                                <div class="fr" style="width:78%;">n*10+10元现金红包</div>
                            </li>
                        </ul>
                    </div>
                    &lt;!&ndash;佣金奖励&ndash;&gt;
                    <p class="pt20 pb20">3.佣金奖励:</p>
                    <div class="rewardView">
                        <img width="100%" src="../../assets/images/user/lc_bg.png" alt="">
                        <div class="UserDeal u-B">获得B级年化投资金额{{Rule1.value}}%</div>
                        <div class="UserDeal u-D">获得D级年化投资金额{{Rule2.value}}%</div>
                        <div class="UserDeal u-C">获得C级年化投资金额{{Rule3.value}}%</div>
                    </div>
                    <p class="pt50">举个例子：</p>
                    <p class="mt6">A邀请B,B邀请C,C邀请D</p>
                    <p class="pt4">A获得佣金=B*(年化投资额*{{Rule1.value}}%)+C*(年化投资额*{{Rule2.value}}%)+D*(年化投资额*{{Rule3.value}}%)</p>
                    <p class="mt6">*所有D级以下层级用户无佣金返利与用户A。</p>
                </div>
            </div>
        </div>
        <div class="welfare">
            <i></i>
            <div class="welfareTitleText">
                <img src="../../assets/images/user/reg_img_8.png" alt="">
            </div>
            <div class="welfareInfo">
                <div class="decorate">
                    <i></i><span></span>
                </div>
                <ul class="clear xzJg">
                    <li class="clear">
                        <div class="fl" style="width:25%">
                            <img src="../../assets/images/user/reg_icon_4.png" alt="">
                        </div>
                        <div class="fl ml20 mt10">
                            <h1>银行存管</h1>
                            <p>恒丰银行</p>
                        </div>
                    </li>
                    <li class="clear">
                        <div class="fl" style="width:25%">
                            <img src="../../assets/images/user/reg_icon_4.png" alt="">
                        </div>
                        <div class="fl ml20 mt10">
                            <h1>国企控股</h1>
                            <p>正部级单位下属公司</p>
                        </div>
                    </li>
                    <li class="clear">
                        <div class="fl" style="width:25%">
                            <img src="../../assets/images/user/reg_icon_4.png" alt="">
                        </div>
                        <div class="fl ml20 mt10">
                            <h1>雄厚实力</h1>
                            <p>2000万注册资金</p>
                        </div>
                    </li>
                    <li class="clear">
                        <div class="fl" style="width:25%">
                            <img src="../../assets/images/user/reg_icon_4.png" alt="">
                        </div>
                        <div class="fl ml20 mt10">
                            <h1>合法合规</h1>
                            <p>电子签章+君伦律师事务所</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <p class="pb20 pt20 pl15 f15" style="color:#77371c">*所有解释权归坚果理财所有</p>-->
    </div>
  </div>
</template>

<script>
import NECaptcha from '../../components/NECaptcha.vue'
import TimerBtn from '../../components/TimerBtn.vue'
import {dakd} from '../../assets/js/registerAgreement'
import { MessageBox } from 'mint-ui'
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
export default {
    components: { TimerBtn, NECaptcha },
    data () {
        return {
          ShowPwd:true,
          InvitationNum:'',
          mobileNum:'',
          CodeNumber:'',
          codedata:[],
          mobile:'',
          pwd:'',
          Rule1:[],
          Rule2:[],
          Rule3:[],
          number_day:''
        }
    },
    mounted(){
        /*获取邀请码*/
        this.Invitation_code()
        //this.financingRule()
        this.iphoneCode('')
        this.GetInviteLoad('')
    },
    methods: {
        /*获取邀请码*/
        Invitation_code (){
            if(this.$route.params.code == undefined){
                var code = '0'
            }else{
                var code = this.$route.params.code
            }
            if(this.$route.params.mobile == undefined){
                var mobile = '0'
            }else{
                var mobile = this.$route.params.mobile
            }
            this.mobileNum = mobile
            this.InvitationNum = code
        },
        mobileInput (){
            let mobile = this.mobile
            console.log(mobile)
            this.iphoneCode(mobile)
        },
        /*手机验证码*/
        iphoneCode(val){
            let formData = {
                codeUrl:"send_register_code_verify",
                codeinfo:[
                    {
                        field:"mobile",iphone:val
                    }
                ]
            }
            this.codedata = formData
        },
        /*注册协议*/
        Agree(){
            var addhtml = ''
            $.each(dakd,function(i,v){
                if(v.title == ''){
                    addhtml += '<p>'+v.text+'</p>'
                }else{
                    if(v.text == ''){
                        addhtml += '<h3>'+v.title+'</h3>'
                    }else{
                        addhtml += '<h3>'+v.title+'</h3><p>'+v.text+'</p>'
                    }
                }

            })
            MessageBox('坚果理财用户协议', addhtml)
        },
        /*注册*/
        register(){
            let _that = this
            let Base64 = require('js-base64').Base64
            let Url = '/mapi2/index.php?&act=register'
            let formData = new FormData()
            formData.append("mobile",_that.mobile)
            formData.append("user_name",_that.mobile)
            formData.append("mobile_code",_that.CodeNumber)
            formData.append("user_pwd",_that.pwd)
            formData.append("user_pwd_confirm",_that.pwd)
            formData.append("referer",_that.InvitationNum)// 20170915_meiyan for external recommendation
            Indicator.open({ spinnerType: 'fading-circle' })
            _that.$http.post(Url,formData)
                .then(response => {
                    var response = JSON.parse(Base64.decode(response.data))
                    if(response.response_code == 1){
                        _that.MintUiToast(response.show_err)
                        /*let loginuser = new FormData()
                        loginuser.append("email",response.mobile)
                        loginuser.append("pwd",response.user_pwd)
                        _that.userLogin(loginuser)*/
                        window.location.href="https://www.jianguolicai.cn/appdown/index.html"
                    }else{
                        _that.MintUiToast(response.show_err)
                    }
                    console.log(response)
                    Indicator.close()
                },response => {
                    console.log(response)
                })
        },
        /*登录*/
        userLogin(loginuser){
            let _that = this
            let Base64 = require('js-base64').Base64
            let Url = '/mapi2/index.php?&act=login'
            Indicator.open({ spinnerType: 'fading-circle' })
            _that.$http.post(Url,loginuser)
                .then(response => {
                    var response = JSON.parse(Base64.decode(response.data))
                    console.log(response)
                    if(response.response_code == 1){
                        storeWithExpiration.set("userinfo",response,86400000)
                        _that.MintUiToast(response.show_err)
                        _that.$router.push('/uc_center');
                    }else{
                        _that.MintUiToast(response.show_err)
                    }
                    Indicator.close()
                },response => {
                    console.log(response)
                })
        },
        /*邀请人理财天数接口*/
        GetInviteLoad(){
            let _that = this
            let Base64 = require('js-base64').Base64
            let Url = '/mapi2/index.php?&act=invite_load_date'
            let formData = new FormData()
            formData.append('mobile',this.mobileNum)
            _that.$http.post(Url,formData)
                .then(response => {
                    var response = JSON.parse(Base64.decode(response.data))
                    _that.number_day = response.load_number_day
                    console.log(response)
                },response => {
                    console.log(response)
                })
        },
        /*理财师规则*/
        financingRule(){
            let _that = this
            let Base64 = require('js-base64').Base64
            let Url = '/mapi2/index.php?&act=financial_planner_rule'
            let user_name = window.storeWithExpiration.get('user_name')
            let user_pwd = window.storeWithExpiration.get('user_pwd')
            let formData = new FormData()
            formData.append("user_name",user_name)
            formData.append("user_pwd",user_pwd)
            Indicator.open({ spinnerType: 'fading-circle' })
            _that.$http.post(Url,formData)
                .then(response => {
                    var response = JSON.parse(Base64.decode(response.data))
                    _that.Rule1 = response.list
                    _that.Rule2 = response.list
                    _that.Rule3 = response.list
                    console.log(response)
                    Indicator.close()
                },response => {
                    console.log(response)
                })
        },
        MintUiToast(value){
            Toast({
                message: value,
                position: 'bottom',
                duration: 5000
            })
        },
    },
    filters:{
        NameFil(val){
            if(val != 0){
                let rs = val.substr(0,3)+'****'+val.substr(val.length-4)
                return rs
            }else{
                return '0'
            }

        }
    }
}
</script>
<style>
body{background:#fbf6e2;}
.mint-header.is-fixed{
    z-index: inherit!important;
}
.mint-msgbox-message p{
    text-indent: 2em;
    margin-top:10px;
    text-align: left;
    font-size:12px;
}
.mint-msgbox-message h3{
    text-align: left;
    padding:10px 0px;
    font-size:14px;
}
.mint-msgbox-message p span{
    color:red;
}
.mint-msgbox-message{
    word-wrap:break-word;
    overflow: scroll;
    color:#333;
    line-height:23px;
    font-size:14px;
}
.mint-msgbox-title{
    font-weight:normal;
}
@media screen and (max-height:480px) {
    .mint-msgbox-message{
        max-height: 220px;
    }
}
@media screen and (min-height: 480px) and (max-height:568px) {
    .mint-msgbox-message{
        max-height: 320px;
    }
}
@media screen and (min-height: 568px) and (max-height:667px) {
    .mint-msgbox-message{
        max-height: 400px;
    }
}
@media screen and (min-height: 667px) and (max-height:736px) {
    .mint-msgbox-message{
        max-height: 480px;
    }
}
</style>
<style scoped lang="less">
@import "../../assets/css/uc_register_share";
</style>

