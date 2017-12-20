<template>
  <div class="page-loadmore-wrapper Investlist" ref="wrapper">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"
                 @top-status-change="handleTopChange"
                 @bottom-status-change="handleBottomChange" ref="loadmore">
      <ul v-if="DealsList != '' ">
        <li v-for="item in DealsList">
          <div>
            <div class="clear">
              <h3 class="fl">投资<span>{{item.u_load_money}}</span>元</h3>
              <p class="fr">{{message.Name}}</p>
            </div>
            <Row class-name="mt7 f14">
              <Col align="left" span="18">{{item.name}}</Col>
              <Col align="right" span="6">{{item.rate_foramt_w}}</Col>
            </Row>
            <Row class-name="mt10 FontColor">
              <Col align="left" span="12">投资日期:{{item.deal_load_time | time}}</Col>
              <Col align="left" span="12">预期收益:0.00元</Col>
            </Row>
            <Row class-name="mt7 FontColor">
              <Col align="left" span="12">计息日期:{{item.Interest_confirm_time | time}}</Col>
            </Row>
            <Row class-name="mt7 FontColor">
              <Col align="left" span="12">兑付日期:{{item.Repay_date | time}}</Col>
              <Col align="left" span="12">预期到帐:0.00元</Col>
            </Row>
          </div>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
import Vue from 'vue'
import "../assets/css/uc_invest.less"
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
export default {
  props: ['message'],
  name: 'noticeItems',
  data () {
      return {
          DealsList: [],
          topStatus: '',
          allLoaded: false,
          bottomStatus: '',
          status_num:"",
          page: 1,
          pageArr:{}
      }
  },
  mounted () {
      this.$nextTick(function(){
          this.info(1)
      })
  },
  methods: {
      resets () {
          this.page = 1;
          this.allLoaded = false;
          this.DealsList = [];
          this.info(1);
      },
      callBackInfo (obj) {
          if(obj == null || obj == ""){
              this.allLoaded = true;
          }
          this.DealsList = this.DealsList.concat(obj)
      },
      info (num) {
          let Base64 = require('js-base64').Base64;
          let url = '/mapi2/index.php?&act=uc_invest';
          let investData = this.message.status
          let formData = new FormData();
          formData.append("email",this.UserName());
          formData.append("pwd",this.UserPwd());
          formData.append("page",num);
          formData.append("status",investData);
          Indicator.open({ spinnerType: 'fading-circle' })
          this.$http.post(url,formData)
              .then(response => {
                  let res = JSON.parse(Base64.decode(response.data));
                  this.pageArr = res.page;
                  this.allLoaded = false;
                  this.callBackInfo(res.item);
                  if(res.page.page_total < res.page.page){
                      Toast({
                          message: '没有更多数据',
                          position: 'bottom',
                          duration: 5000
                      })
                  }else{
                      Toast({
                          message: '数据加载完成',
                          position: 'bottom',
                          duration: 5000
                      })
                  }
                  Indicator.close();
              },response => {
              })
      },
      handleTopChange(status) {
          this.topStatus = status;
      },
      handleBottomChange(status) {
          this.bottomStatus = status;
      },
      loadTop() {
          setTimeout(() => {//上拉刷新
              this.resets();
              this.$refs.loadmore.onTopLoaded();
          }, 1500);
      },
      loadBottom() {//下拉加载更多
          setTimeout(() => {
              let obj = this.allLoaded;
              if(!obj){
                  this.page++
                  this.info(this.page)
              }
              this.$refs.loadmore.onBottomLoaded();
          }, 1500);
      },
      UserName () {
          return window.storeWithExpiration.get('user_name')
      },
      UserPwd () {
          return window.storeWithExpiration.get('user_pwd')
      }
  },
  filters: {
      time: function (value) {
          if(value != undefined){
              let d = new Date(parseInt(value) * 1000)
              return (d.getFullYear()) + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
          }
      }
  }
}
</script>

<style scoped>

</style>
