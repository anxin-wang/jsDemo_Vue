<template>
  <div class="Index">
    <!--<div class="title">坚果理财</div>-->
    <!-- banner -->

    <div class="banner relative">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item, index) in slideimgArr" :key="index" class="slide1"><!--ser_data.url :to="{ path: '/showPage/'+ item.title + '/' + item.img_url}" -->
          <a href="javascript:void(0);" @click="bannerInfo(item)" ref="index" >
            <img :src="item.img_url" class="auto-img"/>
          </a>
        </mt-swipe-item>
      </mt-swipe>
      <router-link id="activityInfo" to="/activityInfo"></router-link>
    </div>
    <!--/. banner -->



    <subheader :obj="Introduce"></subheader>
    <div style="margin-top: 1px">
        <!-- 公告 -->
        <section class="notice-list">
          <div class="scroll-wrap">

            <span class="notice-l clear-right"></span>
            <ul class="scroll-content" >
              <li v-for="(item,index) in readCountArr" :style="{ top }">
                <!--:to="{ path: '/noticeItemsInfo/' + item.id }"-->
                <a @click="newNotice(item)" class="shuolue-item">
                  {{item.title}}
                </a>
              </li >
            </ul>
          </div>
        </section>
        <!--/. 公告 -->
      </div>


    <!-- 产品 -->
    <!--<div v-if="deal_lists.is_new == 1">-->
    <div>
      <ul class="product-info">
        <li class="all-type-list" >
          <router-link class="clear-li" :to="{ path: '/dealsItemsInfo/' + deal_lists.id }">
            <div class="line-box box-top">
              <img class="new-star" src="../assets/images/Index/new_star.png"/>
              <div class="line-box new-font-list">
                <div class="new-header-title">新手专享标<em class="new-small-title"><!--{{ deal_lists.repay_time }}天-->17天</em></div>
                <div class="new-info-font">仅限新注册用户，专享年化{{ deal_lists.fact_rate == 0 ? deal_lists.rate : deal_lists.fact_rate }}%<span class="float-rate" v-if="deal_lists.float_rate > 0.00">+{{ deal_lists.float_rate }}%</span></div>
              </div>
            </div>
            <div class="line-box box-top">
               <router-link class="new-button" to="/deals">去投资</router-link>
            </div>
            <!--<span class="is-new" v-if="deal_lists.is_new == 1">新手</span>
            <p class="product-title"><span>{{ deal_lists.name }}</span></p>
            <div class="product-box">
              <div class="product-item pr-1">
                <p class="big-num"><label class="num">{{ deal_lists.fact_rate == 0 ? deal_lists.rate : deal_lists.fact_rate }}<span class="small-font">%</span><span class="float-rate" v-if="deal_lists.float_rate > 0.00">+{{ deal_lists.float_rate }}%</span></label>
                </p>
                <p>预期年化</p>
              </div>
              <div class="product-item pr-2">
                <p class="big-num">{{ deal_lists.repay_time }}<span class="small-font">天</span></p>
                <p>期限</p>
              </div>
              <div class="product-item pr-3">
                &lt;!&ndash; 圆形动画加载 &ndash;&gt;
                <i-circle :percent="deal_lists.progress_point > 100 ? 100 : deal_lists.progress_point" :size="80" :stroke-color="color">
                  <span v-if="deal_lists.deal_status != 2" class="demo-i-circle-inner" style="font-size:16px">{{ deal_lists.progress_point }}%</span>
                  <label v-if="deal_lists.deal_status == 2">已成立</label>
                </i-circle>
                &lt;!&ndash;/. 圆形动画加载 &ndash;&gt;
              </div>
            </div>-->
          </router-link>
        </li>
      </ul>
    </div>
    <!--/. 产品 -->

    <!-- 推荐产品 -->
    <section class="notice-list recommend tuiJian-box">
      <div class="notice-l notice-l-2 ">
        <span>推荐标的</span>
       <router-link to="/deals"><span>更多</span></router-link>
      </div>
    </section>

    <div class="pro-box">

      <product-item v-if="bol" v-bind:products="homeData.cate_type_arr"
                    v-bind:show-num="4" v-bind:set-box="true"></product-item>
    </div>

    <!--/. 推荐产品 -->

    <!-- 热门活动 -->
    <!--<section class="notice-list recommend">
      <router-link  class="notice-l" to="/activity">
        <span>热门活动</span>
      </router-link>
    </section>
    <activity-bar :activityData="filterActivity" :mark="0"></activity-bar>-->
    <!--/. 热门活动 -->

    <div class="show-time">
      <router-link to="/deals">
        <img src="../assets/images/Index/hanstate_xiaobanner@3x.png"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import ProductItem from '../components/ProductItem'
import Subheader from '../components/SubHeader'
import ActivityBar from '../components/ActivityBar'
import { Indicator } from 'mint-ui'
import { Lazyload } from 'mint-ui';

export default {
  components: {Subheader,ProductItem,ActivityBar},
  data () {
    return {
      color: '#f4ad31',
      bol: false,
      homeData: [],
      slideimgArr: [],
      activityList: [],
      readCountArr: [],
      activeIndex: 0,
      Introduce: [],
      dealNewObj: [ ],
      deal_lists : {
        id: '',
        name: '',
        fact_rate: '',
        rate: '',
        float_rate: '',
        repay_time: '',
        progress_point: null,
        deal_status: '',
        is_new: ''
      }
    }
  },
  mounted () {
    this.$nextTick(function(){
      this.getHome();
      this.getActivity();
      this.mallUrl();
      this.readerCount();
      //this.upScroll();
    })
  },
  computed: { //计算属性
    filterActivity () {
        return this.activityList.slice(0,1);
    },
    top () {
      return - this.activeIndex * 40 + 'px';
    }
  },
  methods: {
      mallUrl (){
          let user_name = window.storeWithExpiration.get('user_name')
          let user_pwd = window.storeWithExpiration.get('user_pwd')
          let urlmall = '/mall_index/'+user_name+'/'+user_pwd
          let lst = [
              {Img: require('../assets/images/Index/anquan@1.5x.png'), url: '/insurance'},
              {Img: require('../assets/images/Index/gonggao@1.5x.png'), url: '/noticeItems'},
              {Img: require('../assets/images/Index/bangzhu@1.5x.png'), url: '/help'},
              {Img: require('../assets/images/Index/jfsc@1.5x.png'),  url: urlmall},
          ]
          this.Introduce = lst
      },
    newNotice (item) {
      if(item != null && item != ''){
        if(item.link != null && item.link != ''){
          let ob = { state: 1, title: item.title, url: item.link}
          ob = JSON.stringify(ob);
          storeWithExpiration.set("ACTIVITYURL", ob);
          document.getElementById("activityInfo").click();
          return false;
        }else{
          //跳原有公告
          location.href = '/#/noticeItemsInfo/' + item.id
        }
      }
    },
    bannerInfo (obj) {
      if(obj != null && obj != ""){

        if(obj.ser_data != null && obj.ser_data != '' && obj.ser_data != undefined){
          let ob = { state: 1, title: obj.title, url: obj.ser_data.url}
          ob = JSON.stringify(ob);
          storeWithExpiration.set("ACTIVITYURL", ob);
          document.getElementById("activityInfo").click();
          return false;
        }
      }
    },
    upScroll () {
      setInterval(_ => {
        if(this.activeIndex < this.readCountArr.length) {
          this.activeIndex += 1;
        } else {
          this.activeIndex = 0;
        }
      }, 5000);
    },
    readerCount () { //未读公告
      let Base64 = require('js-base64').Base64;
      let url = '/mapi2/index.php?&act=article_list&act_2=announcement&page=1';
      Indicator.open({ spinnerType: 'fading-circle' })
      this.$http.get(url)
        .then(response => {
          let res = JSON.parse(Base64.decode(response.data));
          this.readCountArr = res.list;
          console.log(res.list,"公告");
          Indicator.close()
        },response => {

        })
    },
    getActivity () { //热门活动
      let Base64 = require('js-base64').Base64;
      let Url = '/mapi2/index.php?&act=activity';
      let formData = new FormData();
      formData.append("page",1);
      this.$http.post(Url,formData)
        .then(response => {
          let res = JSON.parse(Base64.decode(response.data));
          if(res.list.length == 0){
            this.activityList = [];
            return false;
          }
          this.activityList = res.list;
        })
    },
    getHome () {
      let _that = this;
      let Base64 = require('js-base64').Base64
      let Url = '/mapi2/index.php?&act=home'
      _that.$http.get(Url)
        .then(response => {
          var response = JSON.parse(Base64.decode(response.data));
          _that.homeData = response;

          _that.deal_lists.id = response.id
          _that.deal_lists.name = response.name
          _that.deal_lists.fact_rate = response.fact_rate
          _that.deal_lists.rate = response.rate
          _that.deal_lists.float_rate = response.float_rate
          _that.deal_lists.repay_time = response.repay_time
          if(response.progress_point == undefined || response.progress_point == null || response.progress_point == ''){
            _that.deal_lists.progress_point = 0.00;
          }else {
            _that.deal_lists.progress_point = Number(response.progress_point.toFixed(2))
          }

          _that.deal_lists.deal_status = response.deal_status
          _that.deal_lists.is_new = response.deal_is_new
          _that.slideimgArr = response.slideimg.list
          _that.bol = true;
      })
    }
  }
}
</script>
<style>
  .mint-swipe-indicators{ bottom: 5px;}
  .mint-swipe-items-wrap{
    border-radius:5px;
    -webkit-border-radius:5px;
  }
</style>
<style scoped>
  .new-font-list{ padding-left: 5px;}
  .show-time img{ width: 100%;}
  .show-time{
     width: 100%;
     height: 90px;
     margin-top: 10px;
  }
  .box-top{
    margin-top: 15px;
  }
  .title{
    font-size:26px;
    background-color: #fff;
    padding:8px;
    color:#000;
    border-bottom:1px solid #f5f5f5;

  }
  .banner{
    padding:8px;
    background-color: #fff;
  }

  .new-button{
    display: inline-block;
    padding: 2px 8px;
    color: #fff;
    font-size: 15px;
    background-image:url(../assets/images/touzi_btn.png);
    text-indent: -9999px;
    position: absolute;
    right: 15px;
    top: 30px;
    width: 75px;
    height: 30px;
    background-size: contain;
    -webkit-background-size: contain;

  }
  .new-small-title{
    font-size: 16px;
    padding-left: 10px;
  }
  .new-info-font{
    color: #b4bdcb;
    font-size: 14px;
    padding-top: 12px;
  }
  .new-header-title{
    font-size: 24px;
    color: #000000;
    font-weight: 500;
  }
  .new-star{
    width: 48px;
    margin: 0 10px;
  }
  .line-box{
    display: inline-block;
    vertical-align: top;
  }
  .line-box:last-child{
    margin-left: -4px;
  }
  .shuolue-item{
    width: 90%;
    color: #666;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .num{ padding-left: 10px;}
  .product-box{ position: relative;}
  .product-item{ position: absolute;width:100%;height: 72px;text-align: center}
  .pr-1{
    width: 53%;
    left: 0;
    top: 0;
    text-align: left;
    padding-right: 18px;
  }
  .pr-1 p:first-child{
    color: #f4ad31;
  }
  .pr-1 p:last-child{
    color: #999;
    font-size: 14px;
    padding-left: 40px;
  }
  .pr-2{
    width: 40%;
    left: 27%;
    top: 0;
    text-align: right;
  }
  .pr-2 p:last-child{
    color: #999;
    font-size: 14px;
    padding-right: 20px;
  }
  .pr-3{ width: 30%; right: 0;line-height: 72px;}

  .product-info{ list-style: none;}
  .product-info a li, .sub-btn{ margin: 12.5px 0;}
  .product-info li{
    margin-top: 1.8px;
    background-color: #fff;
    height: 110px;
    margin-bottom: 0;
    /*border: 1px solid #e5e5e5;*/
    -webkit-border-radius: 0!important;
    -moz-border-radius: 0!important;
    border-radius: 0!important;
    position: relative;
    overflow: hidden;
  }
  .product-info li:first-child{ margin-top: 15px;}
  .recommend-l span{ font-size: 15.5px!important;color: #333!important;font-weight: bold;}

  .product-list img{
    width: 100%;
    height: auto;
  }
  .big-num{
    font-size: 27.5px;
  }
  .small-font{
     font-size: 14px;
     padding-left: 5px;
   }
  .float-rate{
    display: inline-block;
    vertical-align: top;
    font-size: 15px;
    margin-top: -5.5px;
  }
  .is-new{
    background-color: #f4ac31;
    color: #fff;
    position: absolute;
    top: -2px;
    right: -22px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    -webkit-transform: rotate(50deg);
    -moz-transform: rotate(50deg);
    -ms-transform: rotate(50deg);
    -o-transform: rotate(50deg);
    transform: rotate(50deg);
  }


  .auto-img{ height: 170px!important;}
  .scroll-wrap{
    width: 90%;
    height: 40px;
    line-height: 40px;
    margin-left: 5px;
  }

  .scroll-content {
    font-size: 14px;
    width: 90.25%;
    height: 40px;
    line-height: 40px;
    margin-left: 45px;
 /*   margin-top: -37px;*/
    overflow: hidden;
  }
  .scroll-content li{
    height: 40px;
    line-height: 40px;
    position: relative;
    transition: top 0.5s;
    top: 0;
  }

  .bg-item{
    height: 160px;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
*{ padding: 0;margin: 0;font-family: "微软雅黑体";}
.Index{
  background-color: #F5F5F5;
  padding-bottom: 0;
}
.pro-box{ margin-top: -10px;}
/*.tuiJian-box{
  margin-bottom: 25px;
}*/
  .product-title{
    font-size: 15.5px;
    color: #666!important;
    padding-left: 12.5px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .product-title span{
    display: inline-block;
    vertical-align: middle;
    /*padding: 0 .5rem;*/
  }
  .recommend{
    height: 40px!important;
    line-height: 40px!important;
    margin-top: 10px!important;
  }
  .product-list{
    display: block;
    height: 78px;
    line-height: 78px;
    background-color: #fff;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .product-list img{
    width: 100%;
    height: auto;
  }
  .notice-list{
    position: relative;
    height: 34px;
    line-height: 30px;
    background-color: #fff;
  }
.notice-item{
  display: inline-block;
  vertical-align: middle;
  position: absolute;
}
.notice-l{
  left: 0;
  font-size: 14px;
}
/*.notice-l:before{
  content: "";
  display: inline-block;
  vertical-align: middle;
  width: .6rem;
  height: 2rem;
  margin-top: -2.35rem;
  margin-left: 1.25rem;
  background-color: #f4ad31;
  border-top-left-radius: .35rem;
  border-top-right-radius: .35rem;
  border-bottom-left-radius: .35rem;
  border-bottom-right-radius: .35rem;
}*/
.none:after{
  content: "";
  background: url('')!important;
}
.clear-right:after{
  content: ""!important;
  border-top: 0!important;
  border-right: 0!important;
  border-bottom: 0!important;
  border-left: 0!important;
}
.notice-l:after{
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  position: absolute;
  right: 20px;
  top: 20px;
  border-top: 2px solid #CDCBCA;
  border-right: 2px solid #CDCBCA;
  border-bottom: 0;
  border-left: 0;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}
  .notice-l span{
    display: inline-block;
    font-size: 14px;
    color: #999;
    margin-left: 10px;
    margin-top: 2px;
    width: 190px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
.notice-r{
  right: 0;
}
.notice-r img{
  padding-top: 2.5px;
  width: 10px;
  margin-right: 12.5px;
}
.mint-swipe {
  height:150px;
  color: #fff;
  font-size: 30px;
  text-align: center;
}
.mint-swipe img{
   width: 100%;
}
  .mint-swipe{
    height: 170px;
  }
  .mint-swipe img{
    height: auto;
  }
.recommend{
  height: 45px!important;
  line-height: 45px!important;
  margin-top: 10px!important;
}
.product-list{
  display: block;
  height: 78px;
  line-height: 78px;
  background-color: #fff;
  margin-top: 10px;
}
.notice-list{
  position: relative;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.notice-item{
  display: inline-block;
  vertical-align: middle;
  position: absolute;
}
.notice-l{
  left: 0;
}
.notice-l-2{
  padding-left: 8px;
}
.notice-l-2 span{ font-size: 24px;color: #000;}


.notice-l-2 a>span{
    font-size:16px;
  text-align:right;
  width:156px;
  color:#999;
  font-weight: bold;
}
.notice-l:before{
  content: "";
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  margin-top: 0px;
  margin-left: 12.5px;
  position: absolute;
  top: 10px;
  left: 1.5px;
  background: url("../assets/images/Index/gonggao_icon.png") no-repeat;
  background-size: 100% 100%;
}
  .notice-l-2:before{
    width: 0px;
    height:0px;
  }
@media screen and (max-width: 374px){
  .auto-img{ height: 150px!important;}
  .mint-swipe{ height:140px;}
  .recommend-l span{ font-size: 15.5px;}
  .notice-l:after{
    content: "";
    top: 15px;
  }
  .new-star{ width: 20px;}
  .new-header-title{ font-size: 13.5px;}
  .line-box:last-child{ margin-left: -10px;padding-top: 0;}
  .new-info-font{ font-size: 10px;}
  .new-button{ right: 10px;}
  .notice-l:before{
    width: 13px;
    height: 13px;
  }
  .notice-l-2 span{ font-size: 12px;margin-top: 0;}
  .show-time{ height: 65px;}
}
@media screen and (min-width: 414px) {
  .yybg-list li{ height: 180px;}
}
</style>
