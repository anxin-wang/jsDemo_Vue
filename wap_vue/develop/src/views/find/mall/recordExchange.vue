<template>
    <div class="RecordExchange">
        <yd-tab :callback="callbackTab">
            <yd-tab-panel label="兑换获得" tabkey="1">
                <record-list :recordInfo="infoVal"></record-list>
            </yd-tab-panel>
            <yd-tab-panel label="活动获得" tabkey="2">
                <record-list :recordInfo="infoVal"></record-list>
            </yd-tab-panel>
        </yd-tab>
    </div>
</template>
<script>
import Vue from 'vue';
 import { Indicator } from 'mint-ui'
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
/* 使用px：import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell'; */
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
export default {
    components:{
        /*列表 组件*/
        recordList:require('./recordList.vue'),
    },
    data () {
        return{
            infoVal:1
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
    width:100%;
    height:100%;
    background:white;
    position:absolute;
    left:0px;
    top:0px;
    padding-top:45px;
}
.ActivityLidt{
    padding:0px 15px;
    a{
        display:block;
        padding:7px 0px;
        border-bottom:1px solid #e5e5e5;
        .ListImg{
            width:85px;
            height:85px;
            background:#e5e5e5;
            margin-right:10px;
            position:relative;
            overflow: hidden;
            img{
                width:85%;
                position:absolute;
                left:50%;
                top:50%;
                -webkit-transform: translate(-50%,-50%);
                -moz-transform: translate(-50%,-50%);
                transform: translate(-50%,-50%);
            }

        }
        .ListInfo{
            width:60%;
            h1{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
            }
        }
        .ListNum{
            margin-top:64px;
        }
    }
}
.NotList{
    text-align: center;
    line-height:300px;
    font-size:20px;
    color:#999;
}
</style>
