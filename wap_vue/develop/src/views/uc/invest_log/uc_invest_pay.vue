<template>
  <div class="page-loadmore">
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">
        <router-link to="/uc_invest">投资中</router-link>
      </mt-tab-item>
      <mt-tab-item id="2">
        <router-link to="/invest_hold">持有中</router-link>
      </mt-tab-item>
      <mt-tab-item id="3">
        <router-link to="/invest_pay">已兑付</router-link>
      </mt-tab-item>
    </mt-navbar>
    <div class="page-loadmore-wrapper Investlist" ref="wrapper">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"
                   @top-status-change="handleTopChange"
                   @bottom-status-change="handleBottomChange" ref="loadmore">
        <ul v-if="DealsList != '' ">
          <li v-for="item in DealsList">
            <div @click.stop="details(item.id,item.deal_load_time,item.interest_confirm_time,item.repay_date)">
              <div class="clear">
                <h3 class="fl">投资<span>{{item.u_load_money}}</span>元</h3>
                <p class="fr">已兑付</p>
              </div>
              <Row class-name="mt10 FontColor">
                <Col align="left" span="12">投资日期:{{item.deal_load_time | time}}</Col>
                <Col align="left" span="12">预期收益:
                <span id="Pref">{{Profit(item.u_load_money,item.rate,item.repay_time)}}</span>
                元</Col>
              </Row>
              <Row class-name="mt7 FontColor">
                <Col align="left" span="12">计息日期:{{item.interest_confirm_time}}</Col>
              </Row>
              <Row class-name="mt7 FontColor">
                <Col align="left" span="12">兑付日期:{{item.repay_date}}</Col>
                <Col align="left" span="12">预期到帐:{{accounts(item.u_load_money,Profit(item.u_load_money,item.rate,item.repay_time))}}元</Col>
              </Row>
            </div>
          </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import "../../../assets/css/uc_invest.less"
    import { Indicator } from 'mint-ui'
    import { Toast } from 'mint-ui'
    export default {
        name: 'noticeItems',
        data () {
            return {
                selected:'3',
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
            Profit(m,w,t){
                //m:本金  w:利率  t:期数
                let money = m * w /100 /360 * t
                return money.toFixed(2)
            },
            details(id,time1,time2,time3){
                storeWithExpiration.set("deals_id",id,86400000)
                storeWithExpiration.set("time1",time1,86400000)
                storeWithExpiration.set("time2",time2,86400000)
                storeWithExpiration.set("time3",time3,86400000)
                window.location.href="/wap_vue/#/invest_details"
            },
            accounts(m,s){
                let _that = this
                var money = Number(m) + Number(s)
                if(money.toString().indexOf(".") > -1){
                    let lenths = money.toString().split(".")[1].length;
                    return money.toFixed(2)
                }else{
                    return money.toFixed(2)
                }
            },
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
                let formData = new FormData();
                formData.append("email",this.UserName());
                formData.append("pwd",this.UserPwd());
                formData.append("page",num);
                formData.append("status",3);
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