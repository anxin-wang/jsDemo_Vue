<template>
    <div class="IntegralMe">
        <!--我的积分-->
        <div class="IntegralTopInfo">
            <div class="IntegralTop">
                <p>可用积分</p>
                <h1 v-if="IntegralInfo.usable_score != null || IntegralInfo.usable_score != ''">{{IntegralInfo.usable_score}}</h1>
                <h1 v-else>0</h1>
            </div>
            <div class="IntegralInfo clear">
                <div class="fl ml15">累计积分：<span>{{IntegralInfo.total_score}}</span></div>
                <div class="fr mr15">已使用积分：
                    <span v-if="IntegralInfo.used_score != null || IntegralInfo.used_score != ''">{{IntegralInfo.used_score}}</span>
                    <span v-else>0</span>
                </div>
            </div>
        </div>
        <!--我的积分详情-->
        <div class="IntegralDetails">
            <router-link to="/detailsIntegral" class="clear">
                <p class="fl b">我的积分详情</p>
                <p class="fr"><Icon type="ios-arrow-right"></Icon></p>
            </router-link>
        </div>
        <!--如何赚取积分-->
        <div class="IntegralEarn">
            <p>如何赚取积分</p>
            <div class="IntegralEarnInfo">
                <ul>
                    <li class="clear" v-for="item in EarnInfo" :onclick="item.onclk+'()'">
                        <div class="fl EarnInfoIcon"><img :src="item.Icon" alt=""></div>
                        <div class="fl ml10 EarnInfoText" style="width:58%">
                            <h3>{{item.name}}</h3>
                            <p>{{item.text}}</p>
                        </div>
                        <div class="fr EarnInfoBut">
                            <router-link :to="item.url">{{item.urlText}}</router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--积分用途-->
        <div class="PurposeIntegral">
            <p>积分用途</p>
            <div class="PurposeIntegralInfo">
                <p>积分可用于兑换各种积分商城的商品。更多积分用途请期待后续版本</p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
/* 使用px：import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.px/dialog'; */
import { Indicator } from 'mint-ui'
Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
};
import { ucEnter } from '../../../service/getData'
import { ucScore } from '../../../service/getData'
export default {
    data() {
        return {
            UserId:'',
            EarnInfo:[],
            IntegralInfo:''
        }
    },
    mounted(){
        this.info()
        this.user()

    },
    methods: {
        info(){
            let _self = this;
            ucScore().then(res => {
                if(res.response_code != 0){
                    _self.IntegralInfo = res
                }else{
                    this.$dialog.alert({
                        title:'提示！',
                        mes: '您没有登录',
                        callback:() => {
                            console.log('回调')
                        }
                    });
                }
            })
        },
        user(){
            let _self = this;
            ucEnter().then(res => {
                _self.UserId = res.id
                _self.EarnInfo = _self.HrmlArrty()
            })
        },
        zichanjiaActivityType(){
            var obj = {type: "0", cate_id: "123",borrow_id: "234"}
            zichanjia_app_android.activity(JSON.stringify(obj));
        },
        shareMsg(){
            zichanjia_app_android.sharemsg();
        },
        HrmlArrty(){
            let obj = [
                {
                    name:'投资赚积分',
                    text:'每次投资都将获得积分',
                    Icon:require('../../../assets/images/mall/img_03.png'),
                    urlText:'赚积分',
                    url:'#',
                    onclk:'zichanjiaActivityType'
                },
                {
                    name:'完善个人信息',
                    text:'完善您的个人信息将大幅提升您积分',
                    Icon:require('../../../assets/images/mall/img_02.png'),
                    urlText:'去完善',
                    url:'/infoPer/'+this.UserId,
                    onclk:''
                },
                {
                    name:'去分享',
                    text:'分享坚果理财跟好友共赢',
                    Icon:require('../../../assets/images/mall/img_01.png'),
                    urlText:'去分享',
                    url:'#',
                    onclk:'shareMsg'
                }
            ]
            return obj
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/common.less";
/*我的积分*/
.IntegralTopInfo{
    width:100%;
    height:120px;
    background:@maincolor;
    position:relative;
    color:white;
    .IntegralTop{
        text-align:center;
        p{
            font-size:14px;
            padding-top:10px;
        }
        h1{font-size:30px;}
    }
    .IntegralInfo{
        width:100%;
        height:40px;
        background:rgba(255,255,255,0.5);
        position:absolute;
        bottom:0px;
        left:0px;
        line-height:40px;
        font-size:15px;
        span{
            font-weight:600;
        }
    }
}
/*我的积分详情*/
.IntegralDetails{
    margin-top:10px;
    width:100%;
    height:60px;
    background:white;
    line-height:60px;
    font-size:15px;
    a{
        padding:0px 15px;
        display:block;
        p.fr{
            font-size:24px;
        }
    }

}
/*如何赚取积分*/
.IntegralEarn{
    >p{
        padding:0px 15px;
        line-height:40px;
        color:#ccc;
        font-size:14px;
    }
    .IntegralEarnInfo{
        padding:5px 15px;
        background:white;
        ul{
            li{
                padding:10px 0px;
                border-bottom:1px solid #e5e5e5;
                h3{
                    font-size:15px;
                    font-weight:500;
                    color:#333;
                }
                p{
                    font-size:12px;
                    color:#999;
                    margin-top:5px;
                }
                .EarnInfoIcon{
                    width:40px;
                    img{width:100%}
                }
                .EarnInfoBut{
                    width:60px;
                    height:35px;
                    line-height:35px;
                    border:1px solid #ff5d50;
                    text-align:center;

                    border-radius:5px;
                    margin-top:10px;
                    a{
                        display:block;
                        color:#ff5d50;
                    }
                }
            }
        }
    }
}
/*积分用途*/
.PurposeIntegral{
    p{
        line-height:40px;
        color:#ccc;
        font-size:14px;
        padding:0px 15px;
    }
    .PurposeIntegralInfo{
        width:100%;
        background:white;
        padding:10px;
        p{
            line-height:22px;
            padding:0px 15px;
            color:#333;
        }
    }
}
</style>