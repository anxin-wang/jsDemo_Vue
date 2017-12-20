<template>
    <div class="DetailsOdrexBg" :style="'min-height:'+ph+'px'">
        <div class="ml15 mr15">
            <div class="DetailsOdreBox">
                <i><img src="../../../assets/images/mall/index/jglc.png" alt=""></i>
                <p>请认真核对信息</p>
                <h2>{{GoodsList.name}}</h2>
                <div class="DetailsList">
                    <p>订单金额</p>
                    <div class="clear">
                        <div class="fl In">积分</div>
                        <div class="fl b f15">{{ GoodsList.discount_core == 0 || GoodsList.discount_core == null ? GoodsList.score : GoodsList.discount_core }}</div>
                    </div>
                    <p class="mt15">市场价格</p>
                    <div class="b mt5 f15">¥{{GoodsList.market_price}}元</div>
                    <p class="mt15">兑换数量</p>
                    <div class="b mt5 f15">{{Num}}</div>
                </div>
                <div class="UserAddress">
                    <h3>收货地址</h3>
                    <router-link :to="'/addressList/'+goodes_id+'/'+Num">
                        <div class="UserAddressInfo" v-if="AddressList != null && AddressList != ''">
                            <h2>{{AddressList.provinces_cities}}{{AddressList.address}}</h2>
                            <p>{{AddressList.name}}<span class="ml40">{{AddressList.phone}}</span></p>
                            <Icon type="ios-arrow-right"></Icon>
                        </div>
                        <div class="UserAddressInfo" v-else>添加地址</div>
                    </router-link>
                </div>
                <div class="DetailsOdreBut clear">
                    <div class="fl">
                        <p class="f12" style="color:#999">待支付</p>
                        <p class="f15 mt4">{{unPay}}积分</p>
                    </div>
                    <router-link to="#" @click.native="SubmitOrder" class="fr DownOder b">立即下单</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import {Popup} from 'vue-ydui/dist/lib.rem/popup';
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
 import { Indicator } from 'mint-ui'
Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
};
Vue.component(Popup.name, Popup);
import { goodsExchange } from '../../../service/getData'
import { orderSubmit } from '../../../service/getData'
export default {
    data () {
        return{
            GoodsList:[],
            AddressList:[],
            Num:'',
            goodes_id:'',
            unPay:'',
            ph:''
        }
    },
    mounted () {
        this.info()
        this.ph = window.screen.height
    },
    methods: {
        info(){
            let _that = this;
            let Base64 = require('js-base64').Base64
            let Url = '/mapi2/index.php?'
            if(_that.$route.params.goodsId != undefined){
                _that.goodes_id = _that.$route.params.goodsId
            }else{
                _that.goodes_id = ' '
            }
            /*修改返回连接*/
            this.$route.meta.RtuenUrl = '/infoGoods/'+_that.goodes_id
            if(_that.$route.params.adr !=undefined){
                var addressId = _that.$route.params.adr
            }else{
                var addressId = ''
            }
            let num = _that.$route.params.num
            goodsExchange(_that.goodes_id,num,addressId).then(res => {
                if(res.response_code == 0){
                    _that.$dialog.alert({mes: res.show_err});
                }
                _that.GoodsList = res.goods
                _that.AddressList = res.user_address
                _that.Num = res.number
                let nums = 0
                if(res.goods.discount_core == 0 || res.goods.discount_core == null){
                    nums = res.goods.score
                }else{
                    nums = res.goods.discount_core;
                }
                _that.unPay = _that.Num * nums;
            })
        },
        SubmitOrder(){
            let _that = this;
            let goodsId = _that.$route.params.goodsId
            let num = _that.$route.params.num
            let id = _that.AddressList.id
            orderSubmit(goodsId,num,id).then(res => {
                _that.$dialog.confirm({
                    title: '提示!',
                    mes: res.show_err,
                    opts: [
                        {
                            txt: '去查看',
                            color: false,
                            callback: () => {
                                _that.$router.push('/recordExchange')
                            }
                        },
                        {
                            txt: '继续兑换',
                            color: true,
                            callback: () => {
                                window.location.href= '/wap_vue/#/mall_index/'+ _that.userName() + '/' +_that.userPwd()
                            }
                        }
                    ]
                });
            })
        },
        DialogAlert(meg,call){
            this.$dialog.alert({
                title:'提示！',
                mes: meg,
                callback:() => {
                   // window.location.href= '/wap_vue/#/mall_index/'
                }
            });
        },
        userName(){ return window.storeWithExpiration.get('MallUserName')},
        userPwd(){return window.storeWithExpiration.get('MallUserPwd')},
    }
}
</script>
<style>
.yd-confirm-ft>a.primary{ color: #F4AC31;}
.yd-popup-content{
    overflow-y: inherit!important;
}
.yd-confirm-hd{
    text-align: center!important;
}
.yd-confirm-bd{
    text-align: center!important;
}
</style>
<style lang="less" scoped>
@import "../../../assets/css/common.less";
.DetailsOdrexBg{
    width:100%;
    background:#465775;
    padding-top:80px;
    padding-bottom:20px;
    position:absolute;
    left:0px;
    top:0px;
}
.DetailsOdreBox{
    width:100%;
    background:white;
    border-radius:10px;
    padding-bottom:30px;
    position:relative;
    >i{
        display:block;
        width:52px;
        height:52px;
        position:absolute;
        left:50%;
        top:0%;
        transform: translate(-50%,-50%);
        padding:10px;
        background:white;
        border-radius:50%;
        img{
            width:100%;
        }
    }
    >p{
        text-align:center;
        padding-top:30px;
        font-size:14px;
    }
    h2{
        font-size:18px;
        text-align: left;
        padding:0px 30px;
        margin-top:10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .DetailsList{
        margin:15px;
        padding-bottom:15px;
        border-bottom:2px dashed #ccc;
        p{
            font-size:14px;
            color:#999;
        }
        div.clear{
            margin-top:8px;
            padding-bottom:10px;
            color:#666;
            div.In{
                width:30px;
                height:20px;
                background:@maincolor;
                color:white;
                text-align:center;
                line-height:20px;
                border-radius:3px;
                margin-right:8px;

            }
        }
    }
    .UserAddress{
        margin:0px 15px;
        border:1px solid #e5e5e5;
        h3{
            width:100%;
            height:30px;
            background:#f5f5f5;
            line-height:30px;
            font-size:12px;
            text-indent: 1em;
            font-weight:normal;
            color:#666;
            border-bottom:1px solid #e5e5e5;
        }
        a{display:block;}
        .UserAddressInfo{
            display:block;
            padding:10px;
            position:relative;
            font-size:14px;
            >i{
                color:#666;
                font-size:20px;
                position:absolute;
                right:2%;
                top:50%;
                transform: translate(-50%,-50%);
            }
            h2{
                font-size:14px;
                font-weight:normal;
                padding:0px 24px 0px 0px;
                margin-top:0px;
            }
            p{
                color:#666;
                margin-top:4px;
            }
        }
    }
}
.DetailsOdreBut{
    padding:0px 15px;
    margin-top:40px;
    .DownOder,
    .CloseOder{
        display:block;
        width:100px;
        font-size:15px;
        color:white;
        background:@maincolor;
        text-align:center;
        line-height:40px;
        border-radius:6px;
        margin:0px 12px;
    }
    .CloseOder{
        background:none;
        border:1px solid @maincolor;
        color: @maincolor;
    }
}
.CloseOderTitle{
    width:100%;
    height:75px;
    background:url('../../../assets/images/mall/index/bg.png') no-repeat;
    background-size:100% 100%;
    font-size:24px;
    font-weight:bold;
    text-align:center;
    line-height:75px;
    color:white;
}
.CloseOderList{
    li{
        padding:10px 15px;
        label{
            padding:3px 0px;
            display:block;
            div.fl{}
            div.fr{
                width:35px;
                height:16px;
                background:url("../../../assets/images/mall/index/close.png") no-repeat;
                background-size:100% 100%;
            }
        }
        input[type='radio']:checked + label div.fr{
            background:url("../../../assets/images/mall/index/open.png") no-repeat;
            background-size:100% 100%;
        }
    }
}
.CloseBut{
    width:60%;
    line-height:40px;
    background:@maincolor;
    text-align:center;
    margin:30px auto;
    color:white;
    font-size:15px;
    border-radius:40px;
}
</style>
