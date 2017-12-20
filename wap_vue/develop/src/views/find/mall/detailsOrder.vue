<template>
    <div class="DetailsOdrexBg" :style="'min-height:'+ph+'px'">
        <div class="ml15 mr15 pt35 pb50">
            <div class="DetailsOdreBox">
                <i><img src="../../../assets/images/mall/index/jglc.png" alt=""></i>
                <p v-if="Num != 0">请认真核对信息</p>
                <p v-else></p>
                <h2>{{list.goods_name}}</h2>
                <div class="DetailsList">
                    <p>订单金额</p>
                    <div class="clear">
                        <div class="fl In">积分</div>
                        <div class="fl b">{{list.pay_amt}}</div>
                    </div>
                </div>
                <div class="DetailsList">
                    <p>订单状态</p>
                    <div class="f15 b mt8">{{list.order_status}}</div>
                    <div class="clear">
                        <p>订单日期</p>
                        <div class="f14 b mt8">{{list.ex_time}}</div>
                    </div>
                </div>
                <div class="DetailsList">
                    <p>订单号</p>
                    <div class="f15 b mt8">{{list.order_sn}}</div>
                </div>
                <div class="DetailsList" v-if="list.delivery_addr != ''">
                    <p>收货地址</p>
                    <div class="f15 b mt8">{{list.delivery_addr}}</div>
                    <div class="clear">
                        <div class="fl f15 b">{{list.delivery_name}}</div>
                        <div class="fl ml20 f15 b">{{list.delivery_tel}}</div>
                    </div>
                </div>
                <div class="DetailsOdreBut clear">
                    <router-link to="#" class="fr DownOder b" v-if="Num != 0">立即下单</router-link>
                    <router-link to="#" v-show="show1 = false" @click.native="show1 = true" class="fr CloseOder b">取消订单</router-link>
                </div>
            </div>
        </div>
        <!--弹窗-->
        <yd-popup v-model="show1" position="center" width="80%">
            <span class="ClosePopup" @click.stop="show1 = false"><Icon type="ios-close-empty"></Icon></span>
            <div class="CloseOderTitle">请选择取消订单的原因</div>
            <ul class="CloseOderList mt20">
                <li v-for="(item,index) in RadioList">
                    <input class="hide" v-model="RadioVal" type="radio" :value="(index+1)" name="rad" :id="'Radio'+(index+1)">
                    <label :for="'Radio'+(index+1)" class="clear">
                        <div class="fl">{{item.text}}</div>
                        <div class="fr"></div>
                    </label>
                </li>
            </ul>
            <div class="CloseBut">
                <router-link @click.native="cancelCause" to="#">确定</router-link>
            </div>
        </yd-popup>
    </div>
</template>
<script>
import Vue from 'vue';
import {Popup} from 'vue-ydui/dist/lib.rem/popup';
 import { Indicator } from 'mint-ui'
/* 使用px：import {Popup} from 'vue-ydui/dist/lib.px/popup'; */
Vue.component(Popup.name, Popup);
import {orderDetails} from '../../../service/getData'
export default {
    name:"Integral",
    data () {
        return{
            show1: false,
            RadioVal:1,
            RadioList:[
                {text:'不想兑换了'},
                {text:'信息填写错误'},
                {text:'其他原因'},
            ],
            list:'',
            Num:'',
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
            let id = _that.$route.params.goodsId
            orderDetails(id).then(res => {
                _that.list = res.item
            })
        },
        cancelCause:function(){
            if(this.RadioVal == null || this.RadioVal == ''){
                alert("请选择取消订单原因")
            }else{
                this.$router.push('/verifyCancelOrdre/'+this.$route.params.goodsId+'/'+this.RadioVal)
            }

        }
    }
}
</script>
<style>
.yd-popup-content{
    overflow-y: inherit!important;
}
</style>
<style lang="less" scoped>
@import "../../../assets/css/common.less";
.DetailsOdrexBg{
    width:100%;
    min-height:100%;
    background:@maincolor;
}
/*取消订单 弹窗*/
.ClosePopup{
    width:30px;
    height:30px;
    border:2px solid @maincolor;
    border-radius:30px;
    color:@maincolor;
    text-align:center;
    display:block;
    position:absolute;
    right:20px;
    top:-60px;
    &:before{
        content:'';
        width:3px;
        height:30px;
        background: @maincolor;
        position:absolute;
        left:11px;
        top:28px;
    }
    i{
        font-size:35px;
        font-weight:bold;
        line-height:26px;
    }
}
/*订单详情信息*/
.DetailsOdreBox{
    width:100%;
    background:white;
    padding:20px 0px;
    border-radius:10px;
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
        p{
            font-size:14px;
            color:#999;
        }
        div.clear{
            margin-top:8px;
            border-bottom:2px dashed #ccc;
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