<template>
    <div class="">
        <div class="MallProvingPhone">
            <ul>
                <li class="clear">
                    <div class="fl" style="width: 42px;">账户</div>
                    <div class="fl"><input readonly="readonly" v-model="Mobile" style="width:180px;" type="number" placeholder="请输入平台注册手机号"></div>
                </li>
                <li class="clear">
                    <div class="fl">验证码</div>
                    <div class="fl"><input  v-model="MobileCode" type="number" placeholder="请输入短信验证码"></div>
                    <TimerBtn :mobilecode="codedata"></TimerBtn>
                </li>
            </ul>
        </div>
        <div class="pl15 pr15 mt75">
            <div class="But" @click.stop="cancelOrdre">确定</div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {Popup} from 'vue-ydui/dist/lib.rem/popup';
    /* 使用px：import {Popup} from 'vue-ydui/dist/lib.px/popup'; */
    Vue.component(Popup.name, Popup);
    export default {
        components:{
            TimerBtn:require('../../../components/TimerBtnGet.vue'),
        },
        data () {
            return{
                money:"100",
                time: 0,
                Mobile:'',
                MobileCode:'',
                ordreId:'',
                CanceCode:'',
                codedata:[],
            }
        },
        mounted () {
            this.Proving()
        },
        methods: {
            /*订单取消*/
            cancelOrdre:function(){
                let _self = this;
                let Base64 = require('js-base64').Base64
                let Url = '/mapi2/index.php'
                _self.$http.get(Url,{params:{
                    act: 'uc_goods_order',
                    act_2: 'order_cancel',
                    id: _self.ordreId,   //订单ID
                    cancel_memo: _self.CanceCode,   //订单ID
                    mobile: _self.Mobile,   //手机号
                    sms_code: _self.MobileCode,   //手机验证码
                    email:_self.userName(),
                    pwd:_self.userPwd(),
                }}).then(function(response){
                    var res = JSON.parse(Base64.decode(response.data));
                    console.log(res)
                    _self.$messagebox.alert(res.show_err);
                });
            },
            Proving(){
                let _self = this;
                _self.ordreId = _self.$route.params.ordreId
                _self.CanceCode = _self.$route.params.CanceCode
                let Base64 = require('js-base64').Base64
                let url = '/mapi2/index.php'
                let formData = new FormData()
                formData.append("act",'uc_center')
                formData.append("email",_self.userName())
                formData.append("pwd",_self.userPwd())
                _self.$http.post(url, formData).then(function (response) {
                    let res = JSON.parse(Base64.decode(response.data));
                    _self.Mobile = res.mobile
                    _self.iphoneCode(_self.Mobile)
                });
            },
            /*手机验证码*/
            iphoneCode(val){
                let formData = {
                    codeUrl:"/index.php?ctl=ajax&act=get_register_verify_code&user_mobile="+val,
                }
                this.codedata = formData
            },
            userName(){ return window.storeWithExpiration.get('MallUserName')},
            userPwd(){return window.storeWithExpiration.get('MallUserPwd')},
        }
    }
</script>
<style lang="less" scoped>
    @import "../../../assets/css/common.less";
    .MallProvingPhone ul li{
        font-size:14px;
        color:black;
        border-bottom:1px solid #e5e5e5;
    }
    .MallProvingPhone ul li:last-child{
        border-bottom:none;
    }
    .MallProvingPhone ul li div{
        line-height:44px;
    }
    .MallProvingPhone ul li input{
        width: 160px;
        height:44px;
        text-indent:1em;
        border:none;
        background:none;
        font-size:14px;
    }
    .MallProvingPhone ul li .ProvingPhone{
        width:80px;
        height:30px;
        background:#F9655A;
        border-radius:30px;
        text-align:center;
        line-height:30px;
        color:white;
        margin-top:9px;
        font-size:12px;
        padding:0px 5px;
        border:none;
    }
    .MallProvingPhone ul li .ProvingPhone[disabled="disabled"]{
        background:#ccc;
    }
    .MallProvingImg,
    .MallProvingPhone{
        padding:5px 15px;
        background:white;
        margin-top:10px;
    }
    .MallProvingImg input{
        width:140px;
        height:44px;
        text-indent:1em;
        border:none;
    }
    .Proving_img{
        width: 85px;
        height: 39px;
        margin-top: 3px;
    }
    .Proving_img img{
        width: 100%;
        height:100%;
    }
    .Tishi{
        padding:5px 15px;
        font-size:12px;
        color:#F9655A;
    }
    .But {
        width: 100%;
        background: @maincolor;
        text-align: center;
        line-height: 45px;
        color: white;
        font-size: 15px;
        border-radius: 3px;
    }
    .But a {
        display: block;
        color: white;
    }
</style>