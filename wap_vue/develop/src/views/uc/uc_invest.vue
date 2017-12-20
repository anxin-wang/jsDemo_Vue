<template>
  <div class="jg-invest">

    <yd-tab :callback="callbackTab">
      <yd-tab-panel label="投标中" tabkey="1">
          <invest-list :recordInfo="infoVal_1" v-on:ucdetailshow="ucdetailshow" v-on:detailinfo="detailinfo" v-if="infoVal_1 != null"></invest-list>
      </yd-tab-panel>
      <yd-tab-panel label="持有中" tabkey="4">
          <invest-list :recordInfo="infoVal_2" v-on:ucdetailshow="ucdetailshow" v-on:detailinfo="detailinfo" v-if="infoVal_2 != null"></invest-list>
      </yd-tab-panel>
      <yd-tab-panel label="已兑付" tabkey="3">
          <invest-list :recordInfo="infoVal_3" v-on:ucdetailshow="ucdetailshow" v-on:detailinfo="detailinfo" v-if="infoVal_3 != null"></invest-list>
      </yd-tab-panel>
    </yd-tab>
    <div class="dealDetailBox" v-show="detailShow">
        <div class="DetailHeader dispalyfiex">
            <div class="flex1 pageReturn" @click.stop="detailclose">
                <Icon size="25" type="android-arrow-back"></Icon>
            </div>
            <div class="flex5 pageTitle">投资详情</div>
        </div>
        <div class="DetailCon">
            <invest-detail :deatilInfodata="deatilInfodata"></invest-detail>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import "../../assets/css/uc_invest.less"
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
import { ucDealMobile } from '../../service/getData'
export default {
    components:{
        /*列表 组件*/
        investList:require('../../components/uc_invest_list.vue'),
        investDetail:require('../../views/uc/invest_details.vue'),
    },
    data () {
        return {
            infoVal_1:1,
            infoVal_2:'',
            infoVal_3:'',
            detailShow:false,
            deatilInfodata:{}
        }
    },
    mounted () {

    },
    methods: {
        callbackTab(val,key){
            if(key == '1'){
                this.infoVal_1 = key
                this.infoVal_2 = ""
                this.infoVal_3 = ""
            }else if(key == '4'){
                this.infoVal_1 = ""
                this.infoVal_2 = key
                this.infoVal_3 = ""
            }else if(key == '3'){
                this.infoVal_1 = ""
                this.infoVal_2 = ""
                this.infoVal_3 = key
            }
        },
        ucdetailshow(data){
            this.detailShow = data
        },
        detailinfo(data){
            const wapName = this.UserName()
            const wapPwd = this.UserPwd()
            ucDealMobile(wapName,wapPwd,data.dealsId).then(res => {
                this.deatilInfodata = {
                    deal:data,
                    deals:res.deal
                }
            })
        },
        detailclose(){
            this.detailShow = false
        },
        UserName () {
            return window.storeWithExpiration.get('user_name')
        },
        UserPwd () {
            return window.storeWithExpiration.get('user_pwd')
        }
    }
}
</script>
<style scoped lang="less">
.dealDetailBox{
    width:100%;
    height:100%;
    background:#f5f5f5;
    position:fixed;
    left:0px;
    top:0px;
    z-index: 9999;
    .DetailHeader{
        padding:7px 15px;
        background:white;
        border-bottom:1px solid #e5e5e5;
        div.pageReturn{
            text-align: left;
        }
        div.pageTitle{
            text-align: left;
            font-size:18px;
            line-height:30px;
        }
    }
    .DetailCon{
        width: 100%;
        position:absolute;
        left:0px;
        top:45px;
    }
}
</style>