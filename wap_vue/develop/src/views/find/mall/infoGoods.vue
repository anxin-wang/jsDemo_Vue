<template>
    <div class="goods pb60">
        <!--商品图片-->
        <div class="GoodsImg"><img :src="GoodsImg" alt=""></div>
        <!--商品信息-->
        <div class="GoodsInfo">
            <h1>{{list.name}}</h1>
            <div class="articles">重要提示:产品如有质量问题或使用问题</div>
            <div class="articles">请拨打客服热线:{{serviceData.shop_tel}}&nbsp;&nbsp;{{serviceData.online_time}}</div>

            <p><span style="background:none;color:#333;" class="b pl0 pt0 pb0 pr0">原价:</span><span>积分</span>{{list.score}}</p>
            <p v-if="list.discount_core != 0"><span style="background:none;color:#333;" class="b pl0 pt0 pb0 pr0">现价:</span><span>积分</span>{{list.discount_core}}</p>
            <span>市场价:¥{{list.market_price}}</span>
            <!--<h5 class="mt8">原价:¥{{list.market_price}}</h5>-->
        </div>
        <!--商品详情信息-->
        <div class="GoodsDetailInfo">
            <h2>详情信息</h2>
            <div class="DetaiInfi" v-html="list.description"></div>
        </div>
        <!--提交按钮-->
        <div class="SubmitBox clear">
            <div class="fl ml15 pt10">
                <div class="fl lh30 f14 mr10">件数:</div>
                <div class="fl"><yd-spinner max="1000" unit="1" v-model="num"></yd-spinner></div>
            </div>
            <div class="fr SubmitBut" @click.stop="exchange">立即兑换</div>
        </div>
        <div class="InfoPopupBox" v-show="isShowPup">
            <div class="InfoPopupBoxBg" @click.stop="isShowPup = false"></div>
            <div class="InfoPopupBoxCont">
                <h1>您的积分不足</h1>
                <div class="ContInfo1">
                    <span class="c_1" onclick="zichanjiaActivityType()">去赚积分&gt;&gt;</span>
                    <span class="c_2" onclick="window.history.go(-1)">兑换其他商品</span>
                </div>
                <span  @click.stop="isShowPup = false"><Icon type="ios-close-empty"></Icon></span>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
import {Spinner} from 'vue-ydui/dist/lib.rem/spinner';
 import { Indicator } from 'mint-ui'
Vue.component(Spinner.name, Spinner);
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
};
import { ucScore } from '../../../service/getData'
import { goodsDetails } from '../../../service/getData'
import { servicePhone } from '../../../service/getData'
export default {
    data() {
        return {
            num: 1,
            list:[],
            GoodsImg:'',
            InregralInfo:'',
            serviceData:'',
            isShowPup:false,
            isShowName:"",
        }
    },
    mounted () {
        this.commodityInfo()
        this.InregralMe()
        this.servicePhone()
    },
    methods: {
        /*我的积分信息*/
        InregralMe(){
            let _self = this
            ucScore().then(res => {
                console.log(res)
                _self.InregralInfo = res
            })
        },
        /*获取商品列表 接口*/
        commodityInfo () {
            let _self = this;
            let goodsId = _self.$route.params.goodsId
            goodsDetails(goodsId).then(res => {
                _self.list = res.goods
                _self.GoodsImg = res.img
            })
        },
        /*客服电话*/
        servicePhone () {
            servicePhone().then(res => {
                this.serviceData = res.data;
            })
        },
        exchange(){
            let _self = this;
            if(_self.list.discount_core != 0 && _self.list.discount_core != null){
                var score = _self.list.discount_core
            }else{
                var score = _self.list.score
            }
            let shuliang = _self.num*score
            let usable_score = _self.InregralInfo.usable_score
            if(_self.InregralInfo.response_code == 0){
              _self.DialogAlert('未登录,请登录再兑换！')
            }else if(usable_score < score){
                /*积分不足*/
                _self.isShowPup = true
            }else if(_self.list.max_bought <= 0){
                //this.DialogAlert('该商品库存不足，请兑换其他商品');
                //继续兑换按钮 跳转商城首页
              _self.$dialog.confirm({
                title: '提示!',
                mes: '该商品库存不足，请兑换其他商品',
                opts: [
                  {
                    txt: '继续兑换',
                    color: true,
                    callback: () => {
                        _self.$router.push('/mall_index/'+ _self.userName() + '/' +_self.userPwd());
                    }
                  }
                ]
              });
            }else if(_self.list.user_can_buy_number <= 0){
                //this.DialogAlert('此商品已售罄，请选购其他商品！');
              //继续兑换按钮 跳转商城首页
              _self.$dialog.confirm({
                title: '提示!',
                mes: '此商品已售罄，请选购其他商品！',
                opts: [
                  {
                    txt: '继续兑换',
                    color: true,
                    callback: () => {
                        _self.$router.push('/mall_index/'+ _self.userName() + '/' +_self.userPwd());
                    }
                  }
                ]
              });
            }else if(_self.num > _self.list.max_bought_format){
              _self.DialogAlert('超出你所能兑换的数量')
            }else if(shuliang > usable_score){
                /*积分不足*/
                _self.isShowPup = true
            }else{
                _self.$router.push('/orderSubmit/'+this.list.id+'/'+this.num);
            }
        },
        zichanjiaActivityType(){
            var obj = {type: "0", cate_id: "123",borrow_id: "234"}
            zichanjia_app_android.activity(JSON.stringify(obj));
        },
        DialogAlert(meg){
            this.$dialog.alert({
                title:'提示！',
                mes: meg,
                callback:() => {
                    //window.history.back()
                }
            });
        },
    }
}
</script>
<style>
.yd-confirm-ft>a.primary{
    color:#F4AC31!important;
}
</style>
<style>
  .DetaiInfi img{
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
</style>
<style lang="less" scoped>
@import "../../../assets/css/common.less";
.goods{
    background:white;
}
.goods .GoodsImg{
    padding:2% 10%;
    background:#e5e5e5;
    img{
        width:100%;
    }
}
.goods .GoodsInfo{
    background:white;
    padding:10px 15px 10px 15px;
    div{
        display:block;
        font-size:14px;
        color:red;
    }
    >h1{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size:15px;
    }
    >span{
        display: block;
        margin-top:10px;
        color:#ccc;
    }
    >p{
        margin-top:7px;
        color:red;
        >span{
            width:20px;
            height:10px;
            color:white;
            background:@maincolor;
            padding:3px 5px;
            margin-right:5px;
        }
    }
    >h5{
        text-decoration: line-through;
        color:#999;
    }
}
.goods .GoodsDetailInfo{
    background:white;
    margin-top:50px;
    >h2{
        font-size:15px;
        border-bottom:1px solid #ccc;
        padding:15px;
    }
    >div.DetaiInfi{
        padding:10px 15px;
        img{
            max-width: 100%;
        }
    }
}
.goods .SubmitBox{
    width:100%;
    height:50px;
    border-top:1px solid #e5e5e5;
    background:white;
    position:fixed;
    left:0px;
    bottom:0px;
    >div.SubmitBut{
        width:40%;
        line-height:50px;
        background:@maincolor;
        color:white;
        text-align: center;
        font-size:16px;
    }
}
.InfoPopupBox{
    .InfoPopupBoxBg{
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.5);
        position:fixed;
        left:0px;
        top:0px;
        z-index: 999;
    }
    .InfoPopupBoxCont{
        width:80%;
        min-height:100px;
        background:white;
        border-radius:10px;
        margin:0px auto;
        position:fixed;
        left:50%;
        top:50%;
        z-index: 9999;
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        >span{
            width:30px;
            height:30px;
            display:block;
            font-size:30px;
            color:@maincolor;
            border:2px solid @maincolor;
            border-radius:30px;
            line-height:30px;
            font-weight:bold;
            text-align: center;
            position:absolute;
            right:20px;
            top:-60px;
            &:after{
                content:"";
                width:2px;
                height:30px;
                background: @maincolor;
                position:absolute;
                left:11.8px;
                top:28px;
            }
        }
        h1{
            width:100%;
            line-height:50px;
            background: url("../../../assets/images/mall/bg_01.gif") no-repeat;
            background-size:100% 100%;
            color:white;
            text-align:center;
            font-size:18px;
            -webkit-text-shadow: 0px 3px 3px rgba(0,0,0,0.3);
            -moz-text-shadow: 0px 3px 3px rgba(0,0,0,0.3);
            text-shadow: 0px 3px 3px rgba(0,0,0,0.3);
            border-top-left-radius: 10px;
            border-top-right-radius: 12px;
        }
        .ContInfo1{
            span{
                display:block;
                text-align:center;
                line-height:40px;
            }
            .c_1{
                width:40%;
                background:@maincolor;
                color:white;
                border-radius:40px;
                font-size:14px;
                margin:20px auto 0px auto;
            }
            .c_2{
                color:#999;
                display:block;
                text-align:center;
                line-height:40px;
                font-size:15px;
            }
        }
    }

}
</style>
