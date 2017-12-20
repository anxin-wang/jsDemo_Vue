<template>
  <div class="jg-coupon-web" :style="'min-height:'+screenHeight+'px'">
    <yd-tab :callback="callbackTab">
      <yd-tab-panel label="未使用" tabkey="0">
          <template v-if="infoVal_2 != null || infoVal_2 != ''">
              <coupon-list :recordInfo="infoVal_1"></coupon-list>
          </template>
      </yd-tab-panel>
      <yd-tab-panel label="已使用" tabkey="1">
          <template v-if="infoVal_2 != null || infoVal_2 != ''">
              <coupon-list :recordInfo="infoVal_2"></coupon-list>
          </template>
      </yd-tab-panel>
      <yd-tab-panel label="已过期" tabkey="2">
          <template v-if="infoVal_3 != null || infoVal_3 != ''">
              <coupon-list :recordInfo="infoVal_3"></coupon-list>
          </template>
      </yd-tab-panel>
    </yd-tab>
  </div>
</template>

<script>
import Vue from 'vue'
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
import { screenHeight } from '../../service/toastInfo'
import { ucCoupon } from '../../service/getData'
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
export default {
    components:{
        /*列表 组件*/
        couponList:require('../../components/uc_coupon_list.vue'),
    },
    data () {
        return {
            screenHeight:screenHeight,
            infoVal_1:1,
            infoVal_2:'',
            infoVal_3:'',
        }
    },
    mounted () {

    },
    methods: {
        callbackTab(val,key){
            if(key == '0'){
                this.infoVal_1 = key
                this.infoVal_2 = ""
                this.infoVal_3 = ""
            }else if(key == '1'){
                this.infoVal_1 = ""
                this.infoVal_2 = key
                this.infoVal_3 = ""
            }else if(key == '2'){
                this.infoVal_1 = ""
                this.infoVal_2 = ""
                this.infoVal_3 = key
            }

        }
    }
}
</script>

<style scoped lang="less">
.jg-coupon-web{
    width:100%;
    background:#F5F5F5;
    position:absolute;
    left:0px;
    top:0px;
    padding-top:100px;
}
</style>