<template>
  <div class="page-loadmore">
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">
        <router-link to="/uc_coupon">未使用</router-link>
      </mt-tab-item>
      <mt-tab-item id="2">
        <router-link to="/uc_coupon_used">已使用</router-link>
      </mt-tab-item>
      <mt-tab-item id="3">
        <router-link to="/uc_coupon_overdue">已过期</router-link>
      </mt-tab-item>
    </mt-navbar>
    <div class="page-loadmore-wrapper Investlist" ref="wrapper">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"
                   @top-status-change="handleTopChange"
                   @bottom-status-change="handleBottomChange" ref="loadmore">
        <ul v-if="DealsList != '' " class="CouPonConList">
          <li v-for="item in DealsList">
            <div class="ListLeft">
              <h3>{{item.name}}</h3>
              <Row class="">
                <Col span="16" push="8"><span style="font-size:1.2rem;">{{item.cate_name}}</span></Col>
                <Col span="8" pull="16">适用产品：</Col>
              </Row>
              <Row class="">
                <Col span="16" push="8">{{item.repay_time}}</Col>
                <Col span="8" pull="16">使用规则：</Col>
              </Row>
              <Row class="">
                <Col span="16" push="8">{{item.end_time | time}}</Col>
                <Col span="8" pull="16">有效期限：</Col>
              </Row>
            </div>
            <div class="ListRight">
              <div class="CouponRight not_used">
                <a href="#">立即使用</a>
                <p>{{item.rate}}<span>%</span></p>
              </div>
            </div>
          </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import "../../../assets/css/coupon.less"
    import { Indicator } from 'mint-ui'
    import { Toast } from 'mint-ui'
    export default {
        name: 'noticeItems',
        data () {
            return {
                selected:"1",
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
                let url = '/mapi2/index.php?&act=uc_coupon';
                let formData = new FormData();
                formData.append("email",this.UserName());
                formData.append("pwd",this.UserPwd());
                formData.append("page",num);
                formData.append("coupon_user_status",0);
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
<style>
</style>
<style scoped>
  .CouPonConList{
    padding:10px 12px;
  }
  .CouPonConList li{
    position:relative;
    width:100%;
    background:white;
    margin-bottom:10px;
  }
  .ListLeft{
    width:70%;
    padding:10px;
  }
  .ListRight{
    width:27%;
    height:100%;
    background:url("../../../assets/images/coupon/Slice@1.5x.png") no-repeat;
    background-size:100% 100%;
    position:absolute;
    right:0px;
    top:0px;
  }
  .ListRight > div > p{
    font-size:30px;
    font-weight:600;
    color:white;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
  .ListRight > div > p span{
    font-size:20px;
  }
  .ListRight a{
    float:right;
    font-size:15px;
    padding:5px 5px 0px 0px;
    color:white;
  }
</style>