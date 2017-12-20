<template>
    <div class="RecordExchange">
        <yd-tab :callback="callbackTab">
            <yd-tab-panel label="获取" tabkey="0">
                <useIntegral :recordInfo="infoVal"></useIntegral>
            </yd-tab-panel>
            <yd-tab-panel label="使用" tabkey="1">
                <useIntegral :recordInfo="infoVal"></useIntegral>
            </yd-tab-panel>
        </yd-tab>
    </div>
</template>
<script>
import Vue from 'vue';
import { Indicator } from 'mint-ui'
export default {
    components:{
        useIntegral:require('./useIntegral.vue'),
    },
    data () {
        return{
            infoVal:0
        }
    },
    mounted () {
        this.userAg()
    },
    methods: {
        userAg(){
            let ua = navigator.userAgent.toLowerCase();
            let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
            let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
                $(".yd-tab-nav").attr('style','top:45px;')
                $(".RecordExchange").attr('style','top:45px;')
            } else {
                $(".yd-tab-nav").attr('style','top:0px;')
                $(".RecordExchange").attr('style','top:0px;')
            }
        },
        callbackTab(val,key){
            let _this = this
            _this.infoVal = key
        }
    }
}
</script>
<style scoped lang="less">
@import "../../../assets/css/common.less";
.RecordExchange{
    padding-top:45px;
}
.ActivityLidt{
    padding:0px 15px;
    a{
        padding:7px 0px;
        border-bottom:1px solid #e5e5e5;
        display:block;
        .ListInfo{
            width:100%;
            h1{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
            }
        }
    }
}
</style>