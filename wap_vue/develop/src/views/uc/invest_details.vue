<template>
  <div class="invest_hold_details">
      <div class="details_top">
        <ul class="clear">
            <li>投资本金：{{dealInfo.loadMoney}}元</li>
            <li>{{ dealInfo.loadTime | turnTime }}投资</li>
            <li>待收利息：{{Interest}}<span v-if="dealInfo.couponMoney">+{{dealInfo.couponMoney}}</span>元</li>
        </ul>
      </div>
      <div class="details_deal_Info mt10">
          <h3>{{dealsInfo.name}}</h3>
          <ul class="clear">
            <li>预期年化收益率</li>
            <li>
                <span v-if="dealsInfo.rate != null">{{dealsInfo.rate}}%<span v-if="dealInfo.couponRate">+{{dealInfo.couponRate}}</span></span>
                <span v-else>&nbsp;&nbsp;</span>
            </li>
            <li>项目期限</li>
            <li>
                <span v-if="dealsInfo.repay_time != null">{{dealsInfo.repay_time}}天</span>
                <span v-else>&nbsp;&nbsp;</span>
            </li>
          </ul>
      </div>
      <div class="details_deal_time mt10">
        <ul class="clear">
          <li>计息日期</li>
          <li>
              <span v-if="dealInfo.confirmTime != ''">{{ dealInfo.confirmTime }}</span>
              <span v-else>&nbsp;&nbsp;</span>
          </li>
          <li>兑付日期</li>
          <li>
              <span v-if="dealInfo.repayDate != ''">{{ dealInfo.repayDate }}</span>
              <span v-else>&nbsp;&nbsp;</span>
          </li>
        </ul>
      </div>
    <div class="details_deal_time mt10">
        <router-link :to="{ path: '/contract/'+ id + '/' + dealsInfo.deal_sn}" style="display:block;">
          <ul class="clear">
            <li>电子合同</li>
            <li class="pt2"><Icon type="ios-arrow-right" size="20"></Icon></li>
          </ul>
        </router-link>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import "../../assets/css/uc_invest.less"
  import { Indicator } from 'mint-ui'
  import { Toast } from 'mint-ui'
  export default {
      props: {
          deatilInfodata:{},
      },
      data () {
          return {
              dealsInfo:[],
              dealInfo:{},
              Interest:"",
              time1:"",
              time2:"",
              time3:"",
              id:""
          }
      },
      watch:{
          deatilInfodata(val){
              this.dealsInfo = val.deals
              this.dealInfo = val.deal
              let benji = this.dealInfo.loadMoney
              let lv = this.dealsInfo.rate/100
              let time = this.dealsInfo.repay_time
              let money = benji * lv / 360 * time
              let moneys = money.toFixed(2)
              this.Interest = moneys
          }
      },
      mounted () {
          this.$nextTick(function(){
          })
      },
      methods: {

      },
      filters: {
          turnTime: function (time) {
              var date = new Date();
              date.setTime(time * 1000);
              var y = date.getFullYear();
              var m = date.getMonth() + 1;
              m = m < 10 ? ('0' + m) : m;
              var d = date.getDate();
              d = d < 10 ? ('0' + d) : d;
              var h = date.getHours();
              h = h < 10 ? ('0' + h) : h;
              var f = date.getMinutes();
              f = f < 10 ? ('0' + f) : f;
              var s = date.getSeconds();
              s = s < 10 ? ('0' + s) : s;
              var minute = date.getMinutes();
              var second = date.getSeconds();
              minute = minute < 10 ? ('0' + minute) : minute;
              second = second < 10 ? ('0' + second) : second;
              return y + '-' + m + '-' + d;
          },
          moneys (i){
              var money = i
              if(money.toString().indexOf(".") > -1){
                  let lenths = money.toString().split(".")[1].length;
                  return money.toFixed(2)
              }else{
                  return money.toFixed(2)
              }
          }
      }
  }
</script>