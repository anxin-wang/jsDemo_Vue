<template>
    <div class="verifyCancelOrdre">
        <div class="MallProvingImg clear">
            <div class="fl">
                <div class="clear">
                    <div class="fl f14" style="line-height:44px;">安全码</div>
                    <div class="fl"><input v-model="verifyNum" @input="orderVerify" type="number" placeholder="请输入安全码"></div>
                </div>
            </div>
            <div class="fr Proving_img">
                <img v-if="isShow != false" class="line-bar code-box" title="看不清楚?换一张"
                     src="/verify.php?w=89&h=30&rand=563711845"
                     onclick="this.src='/verify.php?w=89&h=44&rand='+ Math.random();"/>
                <img v-if="isShow == false" class="line-bar code-box" title="看不清楚?换一张"
                     src="http://develop.jianguolicai.cn/verify.php?w=89&h=30&rand=563711845"
                     onclick="this.src='http://develop.jianguolicai.cn/verify.php?w=89&h=44&rand='+ Math.random();"/>
            </div>
        </div>
        <p class="Tishi" v-if="verifyCode == 0">{{verifyText}}</p>
        <p class="Tishi" v-if="verifyCode == 1" style="color:green">{{verifyText}}</p>
        <div class="pl15 pr15 mt20">
            <div class="But" v-if="verifyCode == 0" style="background:#ccc;">
                <router-link to="#">下一步</router-link>
            </div>
            <div class="But" v-if="verifyCode == 1">
                <router-link :to="'/CancelOrdre/'+ordreId+'/'+CanceCode">下一步</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {Popup} from 'vue-ydui/dist/lib.rem/popup';
    /* 使用px：import {Popup} from 'vue-ydui/dist/lib.px/popup'; */
    Vue.component(Popup.name, Popup);
    export default {
        name:"Integral",
        data () {
            return{
                ProvingImg:'',
                ProvingImg2:'',
                APP_ROOT:'',
                ordreId:'',
                CanceCode:'',
                verifyNum:"",
                verifyCode:"",
                verifyText:"",
                isShow:''
            }
        },
        mounted () {
            this.Proving()
        },
        methods: {
            /*订单取消 图形验证码 验证*/
            orderVerify:function(){
                let _self = this;
                const Verif = _self.verifyNum.length
                if(Verif == 4){
                    let Base64 = require('js-base64').Base64
                    let Url = '/mapi2/index.php'
                    _self.$http.get(Url,{params:{
                        act: 'uc_goods_order',
                        act_2: 'order_verify',
                        verify: _self.verifyNum,
                        email:_self.userName(),
                        pwd:_self.userPwd(),
                    }}).then(function(response){
                        let res = JSON.parse(Base64.decode(response.data));
                        console.log(res)
                        _self.verifyCode = res.response_code
                        if(res.response_code == 0){
                            _self.verifyText = res.show_err
                            return false
                        }else{
                            _self.verifyText = '已通过图形验证'
                        }
                    });
                }
            },
            Proving(){
                this.ordreId = this.$route.params.ordreId
                this.CanceCode = this.$route.params.CanceCode
                let host = window.location.host;
                let prot = window.location.protocol;
                if(host == 'localhost:8080'){
                    this.APP_ROOT = "http://develop.jianguolicai.cn"
                    this.isShow = false
                }else{
                    this.APP_ROOT = prot+"//"+host
                    this.isShow = true
                }
            },
            userName(){ return window.storeWithExpiration.get('MallUserName')},
            userPwd(){return window.storeWithExpiration.get('MallUserPwd')},
        }
    }
</script>
<style>
    .yd-popup-content{
        overflow-y: inherit!important;
    }
</style>
<style lang="less" scoped >
    @import "../../../assets/css/common.less";
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