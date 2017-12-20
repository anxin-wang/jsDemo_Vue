<template>

  <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"
               @top-status-change="handleTopChange"
               @bottom-status-change="handleBottomChange" ref="loadmore">

    <div class="coupon">
      <ul class="conpon">
        <li v-for="(item,index) in couponData">
          <div class="clear coupon_info">{{ item.coupon_user_id }}---{{ cid }}
            <div class="item-box radio-file" :class="{'hidden' : show }"><!--:checked="index == 0 ? true : false"-->
              <input type="radio" name="radio" @click="checkVal(item.coupon_user_id)" :value="item.coupon_user_id"
                     :checked="cid != item.coupon_user_id ? index === 0 : cid === item.coupon_user_id "/>
              <span class="check-icon"></span>
            </div>
            <div class="fl pl10 pt6" :class="{'check' : clear }">
              <h3 class="f18">{{ item.name }}</h3>
              <div class="mt8 f12">
                <p class="rute-box box-1">适用产品：{{ item.cate_name }}</p>
                <p class="rute-box">使用规则：投资总额满{{ item.comment }}元</p>
                <p>有效期：{{ item.end_time | filterTime }}</p>
              </div>
            </div>
            <div class="fr mark-box">
              <p class="mark-state">立即使用</p>
              <h1 class="f35 num-item">{{ item.rate }}<span class="f12">%</span></h1>
            </div>
          </div>
        </li>
      </ul>
    </div>

  </mt-loadmore>
</template>
<script>
  export default {
    name: 'coupon',
    props: ["couponData","show","clear"],
    data () {
      return{
        rate: '',
        topStatus: '',
        allLoaded: false,
        bottomStatus: '',
        page: 1,
        cid: ''
      }
    },
    mounted () {
      this.$nextTick(function(){
          //this.checkVal();
         this.inits ();
      })
    },
    methods: {
      inits () {
        let obj = localStorage.getItem('COUPONINFOS');
        let _self = this;
        if(obj != null && obj != ""){
          obj = JSON.parse(obj);
          let o = JSON.parse(obj.val);
          _self.cid = o.coupon_user_id;
        }
      },
      checkVal (coupon_user_id) {

        if(coupon_user_id == null || coupon_user_id == ""){


          var radio = document.getElementsByName('radio');
          for (let i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
              coupon_user_id = radio[i].value
            }
          }

        }
        this.couponData.forEach(function (value, index, array) {
            if(value.coupon_user_id == coupon_user_id){
              let info = { no_more: 1,coupon_user_id :  value.coupon_user_id, rate: value.rate}
              info = JSON.stringify(info);
              storeWithExpiration.set('COUPONINFOS',info);
              //window.history.go(-1);
            }
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
          this.allLoaded = false;
          this.page = 1;
          this.$emit('refreshList', 1);
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
      },
      loadBottom() {//下拉加载更多
        setTimeout(() => {
          let obj = this.allLoaded;
          if(!obj){
            if(this.totalPages != this.page){
              this.page = this.page + 1;
              this.$emit('refreshList', this.page);
            }
          }else{
            this.allLoaded = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
      }
    },
    filters: {
       filterTime (time) {
         var myDate = new Date(time*1000);
         var year = myDate.getFullYear();
         var month = myDate.getMonth() + 1;
         var day = myDate.getDate();
         return year + '-' + month + '-' + day;
       }
    }
  }
</script>
<style scoped>
  .loading-title{ font-size: 12px;display: block;margin-top: -10px}
  .mint-loadmore-top > span > span {
    margin-left: auto;
    margin-right: auto;
    margin-top: 5px;
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

  .box-1{
    max-height: 38px!important;
    overflow: hidden!important;
  }
  .rute-box{ width: 190px;}
  .hidden{ display: none;}
  .mark-state{
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
  }
  .num-item{ margin-top: 30px!important;text-align: center;}
  .check{
    margin-left: 30px;
  }

  .radio-file, .coupon_info, .mark-box{ position: relative;}
  .radio-file input[type=radio]{
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    filter: alpha(Opacity = 0);
    -moz-opacity: 0;
    opacity: 0;
  }
  .radio-file input:checked ~ span.check-icon{
    background: url("../assets/images/investment/xuanzhong.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    -webkit-transition: all .25s linear;
    -moz-transition: all .25s linear;
    -ms-transition: all .25s linear;
    -o-transition: all .25s linear;
    transition: all .25s linear;
  }
  .radio-file input ~ span.check-icon{
    display: inline-block;
    width: 25px;
    height: 25px;
    position: absolute;
    left: 5px;
    top: 37px;
    background: url("../assets/images/investment/weixuanzhong.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;

  }
  .item-box{
    height: 110px;
    line-height: 110px;
    font-size: 15.5px;font-weight: 600;
    padding-left: 1px;
    color: #333333;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
  .item-box input {
    height: 140px;
    width: 85%;
    margin-top: 0;
    margin-left: 5px;
    border: 0;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding-left: 10px;
  }
  .item-box input:focus{
    outline: none;
    border: 1px solid #f4ad31;
  }
  .conpon{
    padding:8px 10px;
    font-family: 微软雅黑体;
  }
  .conpon li{
    width:100%;
    height: 140px;
    background:white;
    border-radius:8px;
    margin-bottom:10px;
    overflow: hidden;
  }
  .conpon li .coupon_info div.fr{
    background:url("../assets/images/coupon/Slice@1.5x.png") no-repeat center;
    background-size: 100% 100%;
    height: 140px;
    width: 110px;
  }
  .conpon li .coupon_info div.fr h1{
    margin:1px 5px;
    color:white;
  }
  @media screen and (min-width: 320px) and (max-width: 374px) {
    .rute-box{ width: 150px}
    .conpon li, .conpon li .coupon_info div.fr, .item-box input{  height: 110px;}
    .radio-file input ~ span.check-icon{  width: 15px;  height: 15px;  }
    .check{
      margin-left: 15px;
      width: 165px;
      word-wrap: break-word;
      -ms-word-break: break-all;
      word-break: break-all;
    }
  }
</style>
