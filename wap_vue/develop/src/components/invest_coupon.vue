<template>
  <div class="CouponList">
    <yd-pullrefresh :callback="loadListPull" ref="pullrefreshDemo" v-if="list.length != 0">
      <yd-infinitescroll :callback="loadListScroll" ref="infinitescrollDemo">
        <yd-list theme="1" slot="list">
          <div v-for="item, key in list" :key="key" class="jg-lsitInfo clear jg-notUsed"
               @click="pickCoupon(item.coupon_user_id,item.rate)">
            <div class="fl jg-list-info-left">
              <div class="jg-cp-info-bg">
                <img src="../assets/images/coupon/cou_info.png" alt="">
              </div>
              <div class="jg-cp-info-text">
                <p>{{item.rate}}<span>%</span></p>
              </div>
            </div>
            <div class="fl jg-list-info-center">
              <h1>{{ item.name }}</h1>
              <div class="clear mt5">
                <p class="fl" style="width:20%">产品:</p>
                <span class="fl word" style="width:78%;">{{ item.cate_name }}</span>
              </div>
              <div class="clear mt2">
                <p class="fl" style="width:20%">规则:</p>
                <span class="fl word" style="width:78%;">{{ item.type }}</span>
              </div>
              <div class="clear mt2">
                <p style="width:100%">有效期限至:{{ item.start_time | time }}</p>
              </div>
            </div>
            <div class="fr jg-list-info-right">
              <div class="jg-list-info-right-type">
                <img src="../assets/images/coupon/dhy.png" alt="未使用">
              </div>
              <div class="jg-deals-but">
                <router-link to="#">去投资</router-link>
              </div>
            </div>
          </div>
        </yd-list>
        <!-- 数据全部加载完毕显示 -->
        <span slot="doneTip">没有更多记录~~</span>
        <!-- 加载中提示，不指定，将显示默认加载中图标 -->
        <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading12.svg"/>
      </yd-infinitescroll>
    </yd-pullrefresh>
    <div v-if="list.length == 0" class="NotList">暂无信息</div>
  </div>


</template>
<script>
  import Vue from 'vue'
  import {Indicator} from 'mint-ui'
  import {PullRefresh} from 'vue-ydui/dist/lib.rem/pullrefresh'
  import {ucCouponInvestment} from '../service/getData'

  Vue.component(PullRefresh.name, PullRefresh);
  import {toastInfo} from '../service/toastInfo'
  import {notImgShow} from '../service/toastInfo'

  export default {
    name: 'coupon',
    props: ["cate_id", "repay_time", "repay_time_type"],
    data() {
      return {
        page: 1,
        status: '',
        list: [],
      }
    },
    mounted() {
      this.info(this.page, this.cate_id, this.repay_time, this.repay_time_type)
    },
    methods: {
      /*下拉刷新*/
      loadListPull() {
        setTimeout(() => {
          let _this = this
          _this.page = 1
          _this.list = []
          _this.info(1, this.cate_id, this.repay_time, this.repay_time_type)
          /*刷新完毕*/
          _this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad')
        }, 1000)
      },
      /*滚动加载*/
      loadListScroll() {
        let _this = this
        _this.page++
        if (_this.pages > _this.total) {
          /*滚动加载 所有数据加载完毕 */
          toastInfo("没有更多记录了")
          _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
          return
        }
        /*滚动加载 单次请求数据完毕 */
        _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
        _this.info(_this.page, this.cate_id, this.repay_time, this.repay_time_type)
      },
      /*滚动加载追加数据*/
      callBackInfo(obj) {
        let _this = this
        _this.list = [..._this.list, ...obj]
      },
      /*数据请求接口*/
      info(page, cate_id, repay_time, repay_time_type) {
        let _this = this;
        const wapName = window.storeWithExpiration.get('user_name')
        const wapPwd = window.storeWithExpiration.get('user_pwd')
        ucCouponInvestment(wapName, wapPwd, page, cate_id, repay_time, repay_time_type).then(res => {
          console.log(res)
          _this.total = res.page.page_total
          _this.pages = res.page.page
          _this.unUse = res.item.length;
          _this.$emit('setUnUsed', res.item.length);

          console.log(_this.unUse)
          _this.callBackInfo(res.item)
        })
      },
      pickCoupon(coupon_user_id, rate) {
        if (coupon_user_id == null || coupon_user_id == "") {
        }
        let info = {no_more: 1, coupon_user_id: coupon_user_id, rate: rate}
        info = JSON.stringify(info);
        storeWithExpiration.set('COUPONINFOS', info);
        this.$router.push({path: '/investment/' + this.$route.params.id + '/' + coupon_user_id});
      }
    },
    filters: {
      time: function (value) {
        if (value != undefined) {
          let d = new Date(parseInt(value) * 1000)
          return (d.getFullYear()) + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
        }
      }
    }

  }
</script>
<style scoped lang="less">
  @import "../assets/css/common.less";

  .CouponList {
    padding: 0px 15px 0px 15px;
  }

  .jg-notUsed {
    background: url("../assets/images/coupon/coupon_bg.gif") center center /100% 100% no-repeat;
    .jg-list-info-left {
      background: #faaa2f;
      .jg-cp-info-text {
        p {
          color: @maincolor;
        }
      }
    }
    .jg-list-info-right {
      .jg-deals-but {
        a {
          color: @maincolor;
        }
      }
    }
  }

  .jg-lsitInfo {
    width: 100%;
    /*height:90px;*/
    border-radius: 8px;
    padding: 10px 5px;
    margin-bottom: 10px;
    .jg-list-info-left {
      width: 100px;
      height: 100px;
      border-radius: 5px;
      position: relative;
      .jg-cp-info-bg {
        width: 100%;
        padding: 5px;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        img {
          width: 100%;
        }
      }
      .jg-cp-info-text {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        p {
          display: block;
          font-size: 15px;
          font-weight: bold;
          transform: rotate(-12deg);
          -ms-transform: rotate(-12deg); /*!* IE 9 *!*/
          -moz-transform: rotate(-12deg); /*!* Firefox *!*/
          -webkit-transform: rotate(-12deg); /*!* Safari 和 Chrome *!*/
          -o-transform: rotate(-12deg);
          span {
            font-size: 12px;
          }
        }
      }
    }
    .jg-list-info-center {
      width: 43%;
      padding-left: 5px;
      color: white;
      h1 {
        font-size: 12px;
        font-weight: normal;
      }
      > div.clear {
        font-size: 9px;
        p {
          font-size: 9px;
        }
        span {
          font-size: 9px;
        }
      }
    }
    .jg-list-info-right {
      width: 23%;
      height: 90px;
      position: relative;
      .jg-list-info-right-type {
        img {
          width: 100%;
        }
      }
      .jg-deals-but {
        margin-top: 10px;
        a {
          width: 100%;
          height: 20px;
          background: white;
          display: block;
          border-radius: 20px;
          text-align: center;
          line-height: 20px;
        }
      }
    }
  }

  .NotList {
    text-align: center;
    line-height: 400px;
  }

  @media screen and(max-width: 350px) {
    .jg-lsitInfo .jg-list-info-left {
      width: 80px;
      height: 80px;
    }

    .jg-lsitInfo .jg-list-info-center {
      width: 45%;
    }

    .jg-lsitInfo .jg-list-info-left .jg-cp-info-text p {
      font-size: 13px;
    }
  }
</style>

