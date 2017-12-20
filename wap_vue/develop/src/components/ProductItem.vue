<template>
<div class="page-loadmore-wrapper" ref="wrapper">
  <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"
               @top-status-change="handleTopChange"
               @bottom-status-change="handleBottomChange" ref="loadmore">
    <ul class="product-info">
      <li :class="[{'set-box': setBox,'set-box': showNum == 4}]" v-for="(item,index) in filteredItems"  class="all-type-list"  data-class="className = " >
        <router-link class="clear-li" v-for="i,key in item.deal_list" :key="key" :to="{ path: '/dealsItemsInfo/' + i.id }">




          <i v-if="i.is_new==1" class="new_logo"></i>
          <div>
            <p class="new-header-name biaode-name biao-bar">



              {{ i.name }}
            </p>
          </div>
          <div class="flex-box">
            <div class="flex-item-1 item-border new-text-left">
               <div class="new-big-num biaode-name">{{ i.fact_rate == 0 ? i.rate : i.fact_rate }}%<span class="new-small-num" v-if="i.float_rate > 0.00">+{{ i.float_rate }}%</span></div>
               <div class="new-year-num biaode-name">预期年化</div>
            </div>
            <div class="flex-item-2 item-border">
              <div class="new-day"><em>{{ i.repay_time }}</em>天</div>
               <div class="new-year-num right">理财期限</div>
            </div>
            <div class="flex-item-3 item-border new-text-right">
              <!--<Progress class="new-progress" :percent="i.progress_point/100 > 1 ? 100 : i.progress_point">-->
                <!--<div slot>{{ i.progress_point > 100 ? 100 : i.progress_point }}%</div>-->
              <!--</Progress>-->
              <yd-progressbar
                :progress="i.progress_point/100 > 1 ? 1 : i.progress_point/100 "
                trail-width="4"
                stroke-width="4"
                stroke-color="#e8e8e8"
                trail-color="#ffbd58"
                fill-color="#fff"
              >{{ i.progress_point > 100 ? 100 : i.progress_point }}%</yd-progressbar>

            </div>
         </div>
        </router-link>
      </li>
      <!--<li :class="[{'set-box': setBox,'set-box': showNum == 4}]" v-for="(item,index) in filteredItems"  class="all-type-list" data-class="className = " >
        <router-link class="clear-li" v-for="i in item.deal_list" :to="{ path: '/dealsItemsInfo/' + i.id }">
          <span class="is-new" v-if="i.is_new == 1">新手</span>
          <p class="product-title"><span>{{ i.name }}</span></p>
          <div class="product-box">
            <div class="product-item pr-1">
              <p class="big-num"><label class="num">{{ i.fact_rate == 0 ? i.rate : i.fact_rate }}<span class="small-font">%</span><span class="float-rate" v-if="i.float_rate > 0.00">+{{ i.float_rate }}%</span></label>
              </p>
              <p>预期年化</p>
            </div>
            <div class="product-item pr-2">
              <p class="big-num">{{ i.repay_time }}<span class="small-font">天</span></p>
              <p>期限</p>
            </div>
            <div class="product-item pr-3">
              &lt;!&ndash; 圆形动画加载 &ndash;&gt;
              <i-circle :percent="i.progress_point > 100 ? 100 : i.progress_point" :size="80" :stroke-color="color">
                <span v-if="i.deal_status == 1" class="demo-i-circle-inner" style="font-size:20px">{{ i.progress_point.toFixed(2) }}%</span>
                <label v-if="i.deal_status == 2">满标</label>
                <label v-if="i.deal_status == 0">等待材料</label>
                <label v-if="i.deal_status == 3">流标</label>
                <label v-if="i.deal_status == 4">已成立</label>
                <label v-if="i.deal_status == 5">已兑付</label>
              </i-circle>
              &lt;!&ndash;/. 圆形动画加载 &ndash;&gt;
            </div>
          </div>
        </router-link>
      </li>-->
    </ul>
  </mt-loadmore>
</div>
</template>

<script>
export default {
    name: 'productItem',
    props: ["products","className","showNum","setBox","marks"],
    data () {
        return {
          list: [],
          color: '#f4ad31',
          topStatus: '',
          allLoaded: false,
          bottomStatus: '',
          page: 1,
          pageArr:{}
        }
    },
    computed: {
      filteredItems () {
          let obj = [];
          let _self = this;
          console.log(_self.products)
          _self.products.forEach(function (value, index, array) {
            if(array != null && array != ''){
                if(array[index].deal_list != null && array[index].deal_list != ''){
                  array[index].deal_list = array[index].deal_list.slice(0,1)
                  obj.push(array[index]);//组装新数组
                }
            }
          })
        if(_self.showNum == 4){
          return obj.slice(0,4);
        }else{
          return obj;
        }
      }
    },
    mounted () {
      this.$nextTick(function(){

      })
    },
    watch: {
      marks (curVal, oldVal) {
         if(curVal != oldVal){
            this.page = 1;
         }
      }
    },
    methods: {
      handleTopChange(status) {
        this.topStatus = status;
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadTop() {
        setTimeout(() => {//上拉刷新
          //this.resets();
          this.page = 1;
          this.$emit('refreshList', 'default');
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
      },
      loadBottom() {//下拉加载更多

       if(this.showNum == 4){
         return false;
       }else{
         setTimeout(() => {
           let _self = this;
           let obj = this.allLoaded;

       /*    let mark = storeWithExpiration.get('SEKECTEDDEAKNARK');
           if(mark != 0){
             this.page = 1;
           }*/

           if(!obj){
             this.page = this.page + 1;
             this.$emit('refreshList', this.page);
           }else{
             this.allLoaded = true;
           }
           this.$refs.loadmore.onBottomLoaded();
         }, 1500);
       }
      }
    }
}
</script>
<style>
  *{ font-family: PingFangSC-Medium,sans-serif;}
  .ivu-progress-success .ivu-progress-text{ color: #000000;}
  .ivu-progress-text-inner{ display: none;}
  .ivu-progress-show-info .ivu-progress-outer{
    margin-right: 0;
  }
  .ivu-progress-text{ margin-left: 0;margin-top: -37px;color: #000000!important;font-size: 14px}
  .ivu-progress-text-inner{ color: #000000;font-size: 14px;}
  .ivu-progress-bg{
    height: 5px!important;
    -webkit-border-radius: 2.5px;
    -moz-border-radius: 2.5px;
    border-radius: 2.5px;
  }
  .ivu-progress-bg{
    background-color: transparent;
    background-image:-webkit-linear-gradient(to left, #fbaf01, #f67c00);
    background-image:linear-gradient(to left,#fbaf01,#f67c00);
  }
  .mint-swipe-indicator.is-active{
    background: #fff;
  }
  .mint-swipe-indicator{
    width: 30px;
    height: 2px;
    margin: 0 0;
    opacity: 1;
    -webkit-border-radius: 30%;
    -moz-border-radius: 30%;
    border-radius: 30%;
    background: rgba(255,255,255,.5);
  }
  demo-i-circle-inner{
    font-size: 14px!important;
  }
  .product-info li{
    -webkit-border-radius: 0!important;
    -moz-border-radius: 0!important;
    border-radius: 0!important;
  }
  .yd-progressbar-content {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: .3rem;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    color:#999;
    font-size: 12px;
  }
  .yd-progressbar {
    position: relative;
    color: #333;
    width: 65%;
  }
</style>
<style scoped>
  .biao-bar{
    min-width: 200px;
  }
  .new_logo{
    background:url("../assets/images/investment/special_newer.png") no-repeat;
    position: absolute;
    top:0px;
    right:0px;
    width:80px;
    height:80px;
    background-size: contain;
    -webkit-background-size: contain;
  }
  .small_biao{
    width: 14px;
    display: inline-block;
    vertical-align: top;
  }
  .biaode-name{
    margin-left: -3.5px;
  }
  .new-day{
   font-size:14px;
    color: #000000;
  }
  .new-day em{
    font-size:24px;
  }
  .new-progress{
    width: 100%;
    height: 20px;
    top: 20px;
    margin-bottom: 19px;
  }
  .new-text-left{
    padding-left: 20px;
    position: relative;
  }
  .border-right-bar{ position: relative}
  .border-right-bar:after{
    content: "";
    display: block;
    position: absolute;
    top: 12px;
    right: 15px;
    width: 1px;
    height: 60px;
    border-right: 1px solid #DCDCDC;
  }
  .new-text-right{ text-align: right;padding-right: 20px}
  .new-year-num{
    color: #96A0B7;
    font-size: 14px;
    padding-top: 0px;
  }
  .new-year-num.right{

    padding-top: 10px;
  }

  .new-small-num{
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
    padding-left: 2.5px;
  }
  .new-big-num{
    display: block;
    color: #f4ad31;
    font-size: 24px;
    padding: 5px 0;
  }
  .new-header-name{
    color: #2f333a;
    font-size: 20px;
    margin-left:20px;
    margin-top:20px;
  }
  .item-border{
    margin: 7px 0;
  }
  .flex-item-1{
    width: 41%;
  }
  .flex-item-2{ width: 33%;text-align: center;}
  .flex-item-3{ width: 26%;margin-top: 14px;}
  .flex-box{
    display: -webkit-flex;
    display: flex;

  }
  .float-rate{
    font-size: 15px;
    margin-left: 5.5px;
  }
  .is-new{
    background-color: #f4ac31;
    color: #fff;
    position: absolute;
    top: 0;
    right: -20px;
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
  .demo-i-circle-inner{ font-size: 14px!important;}
  .loading-title{ font-size: 12px;display: block;margin-top: -10px}
  .mint-loadmore-top{
    margin-top:-55px;
  }
  .mint-loadmore-top > span > span {
    margin-left: auto;
    margin-right: auto;
    margin-top: -15px;
    display:block;
    width:30px;
    transform: rotate(180deg);
  }
  .mint-loadmore-bottom > span > span  {
    margin-left: auto;
    margin-right: auto;
    margin-top: -30px;
    display:block;
    width:30px;
  }
  .loadmore-bottom-title{
    display: inline-block;
    margin-bottom: 0;
    height: 25px;
  }


  .set-box{
    margin-bottom: 15px!important;
    border: 0!important;
    -webkit-border-radius: 0!important;
    -moz-border-radius: 0!important;
    border-radius: 0!important;
  }
  .product-info{ font-family: "微软雅黑体";}
  .product-info a{
    display: block;
    height: 140px;
    position: relative;
    overflow: hidden;
  }
  a:hover{ color: #666666;}
  .num{
    display: inline-block;
    width: 60px;
    margin-left: 16px;
  }
  .pro-box{
    margin: 20px;
    width: 51px;
    height: 51px;
    position: relative;
    top: -2px;
    right: -15px;
  }
  .product-title{
    font-size: 15.5px;
    color: #666!important;
    padding-left: 18.5px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .product-title span{
    display: inline-block;
    vertical-align: middle;
    /*padding: 0 .5rem;*/
  }
  .big-num{
    font-size: 27.5px;
  }
  .small-font{
    font-size: 14px;
    padding-left: 5px;
  }
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
    padding-left: 15px;
  }
  .pr-2{
    width: 40%;
    left: 27%;
    top: 0;
    text-align: right;
  }
  .pr-2 p:last-child{
    color: #999;
    font-size:14px;
    padding-right: 2px;
  }
  .pr-3{ width: 30%; right: 0;line-height: 72px;}

  .product-info{ list-style: none;}
  .product-info a li, .sub-btn{ margin: 12.5px 0;}
/*  .product-info a li{
    border: 1px solid #e5e5e5;
    -webkit-border-radius: .85rem;
    -moz-border-radius: .85rem;
    border-radius: .85rem;
  }*/
  .all-type-list li{
    -webkit-border-radius: 8.5px!important;
    -moz-border-radius: 8.5px!important;
    border-radius: 8.5px!important;
  }
  .product-info li{
    margin-top: 10px;
    background-color: #fff;
    height: 140px;
    margin-bottom: 1.15px;
    -webkit-border-radius: 8.5px;
    -moz-border-radius: 8.5px;
    border-radius: 8.5px;
  }
  .product-info li:first-child{ margin-top: 10px;}
  .recommend-l span{ font-size: 15.5px!important;color: #333!important;font-weight: bold;}

  .product-list img{
    width: 100%;
    height: auto;
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
  .ivu-icon-android-volume-up{
    margin-top:6px;
    margin-right:10px;
  }
  .mint-swipe{
    height: 170px;
  }
  .mint-swipe img{
    height: auto;
  }
  @media screen and (min-width: 414px){
    .border-right-bar:after{
      content: "";
      right: 20px;
    }
  }
  @media screen and (max-width: 374px){
    .mint-swipe{  height:140px;  }
    .recommend-l span{ font-size: 15.5px;}
    .num{  margin-left: 0;  }
    .pro-box{  right: 0px;  }
    .product-title{ padding-left: 5px;}
    .new-header-name{ font-size: 13px;}
    .new-year-num{ font-size: 12px}
    .product-info li{ height: 110px;}
  }

</style>
