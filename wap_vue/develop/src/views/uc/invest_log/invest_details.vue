<template>
  <div class="invest_hold_details">
      <div class="details_top">
        <ul class="clear">
            <li>投资本金：{{dealInfo.load_money | moneys}}元</li>
            <li>{{time1 | turnTime}}投资</li>
            <li>待收利息：{{lx}}元</li>
        </ul>
      </div>
      <div class="details_deal_Info mt10">
          <h3>{{dealInfo.name}}</h3>
          <ul class="clear">
            <li>预期年化收益率</li>
            <li>
                <span v-if="dealInfo.rate != null">{{dealInfo.rate}}%</span>
                <span v-else>&nbsp;&nbsp;</span>
            </li>
            <li>项目期限</li>
            <li>
                <span v-if="dealInfo.repay_time != null">{{dealInfo.repay_time}}天</span>
                <span v-else>&nbsp;&nbsp;</span>
            </li>
          </ul>
      </div>
      <div class="details_deal_time mt10">
        <ul class="clear">
          <li>计息日期</li>
          <li>
              <span v-if="time2 != ''">{{time2}}</span>
              <span v-else>&nbsp;&nbsp;</span>
          </li>
          <li>兑付日期</li>
          <li>
              <span v-if="time3 != ''">{{time3}}</span>
              <span v-else>&nbsp;&nbsp;</span>
          </li>
        </ul>
      </div>
    <div class="details_deal_time mt10">
        <router-link :to="{ path: '/contract/'+ id + '/' + dealInfo.deal_sn}" style="display:block;">
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
  import "../../../assets/css/uc_invest.less"
  import { Indicator } from 'mint-ui'
  import { Toast } from 'mint-ui'
  export default {
      name: 'invest_hold_details',
      data () {
          return {
              dealInfo:[],
              lx:"",
              time1:"",
              time2:"",
              time3:"",
              id:""
          }
      },
      mounted () {
          this.$nextTick(function(){
              this.info()
              this.time1 = window.storeWithExpiration.get('time1')
              this.time2 = window.storeWithExpiration.get('time2')
              this.time3 = window.storeWithExpiration.get('time3')
              this.id = window.storeWithExpiration.get('deals_id')
              console.log(window.storeWithExpiration.get('time3'))
          })
      },
      methods: {
          info () {
              let Base64 = require('js-base64').Base64;
              let id = window.storeWithExpiration.get('deals_id')
              let url = '/mapi2/index.php?';
              let formData = new FormData();
              formData.append("act","deal_mobile");
              formData.append("email",this.UserName());
              formData.append("pwd",this.UserPwd());
              formData.append("id",id);
              Indicator.open({ spinnerType: 'fading-circle' })
              this.$http.post(url,formData)
                  .then(response => {
                      let res = JSON.parse(Base64.decode(response.data));
                      this.dealInfo = res.deal
                      this.Profit()
                      console.log(res.deal.deal_sn)
                      Indicator.close();
                  },response => {
                  })
          },
          deals () {
              let Base64 = require('js-base64').Base64;
              let id = window.storeWithExpiration.get('deals_id')
              let url = '/mapi2/index.php?&act=deal_mobile&id='+id;
              Indicator.open({ spinnerType: 'fading-circle' })
              this.$http.get(url)
                  .then(response => {
                      let res = JSON.parse(Base64.decode(response.data));
                      console.log(res)
                      Indicator.close();
                  },response => {
                  })
          },
          Profit(){
              let benji = this.dealInfo.load_money
              let lv = this.dealInfo.rate/100
              let time = this.dealInfo.repay_time
              let money = benji * lv / 360 * time
              let moneys = money.toFixed(2)
              this.lx = moneys
          },
          UserName () {
              return window.storeWithExpiration.get('user_name')
          },
          UserPwd () {
              return window.storeWithExpiration.get('user_pwd')
          }
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