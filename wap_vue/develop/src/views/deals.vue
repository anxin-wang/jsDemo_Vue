<template>
  <div class="deals">

    <div class="page-tab-coge-tner">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
        <!-- 分类 -->

        <!--/. 分类 -->
        <!-- 全部 -->
        <mt-tab-container-item id="tab-container2">

          <!-- PopButton 更多产品、期限、收益 -->
          <div class="sub-header">

            <Poptip placement="bottom" v-model="visible">
              <Button type="ghost">{{ morePorName }}</Button>
              <div class="api" slot="content">
                <ul class="pro-box-list">
                  <li @click="choicePro(item.id,item.name)" v-for="(item,index) in moreProList">{{ item.name }}</li>
                </ul>
              </div>
            </Poptip>
            <Poptip placement="bottom" v-model="visible2">
              <Button type="ghost"><label v-if="qxName == '' ">期限</label><label v-if="qxName != '' ">{{ qxName
                }}</label></Button>
              <div class="api" slot="content">
                <ul class="pro-box-list">
                  <li @click="choiceTerm(item.val,item.title)" v-for="(item,index) in term">{{ item.title}}</li>
                </ul>
              </div>
            </Poptip>
            <span @click="profit()" class="last-btn profit-box"
                  :class="[{'profit-box3':profitVal == 4},{'profit-box2':profitVal == 3}]">收益</span>
          </div>
          <!--/. PopButton 更多产品、期限、收益 -->
          <!-- 产品项 -->


          <product-item @refreshList="loadeMore" v-if="bol" v-bind:products="list" v-bind:marks="marks"></product-item>

          <!--/. 产品项 -->
        </mt-tab-container-item>
        <!--/. 全部 -->
      </mt-tab-container>
    </div>

  </div>
</template>

<script>
  import ProductItem from '../components/ProductItem'
  import PopButton from '../components/PopButton'
  import {Indicator} from 'mint-ui'


  export default {
    name: 'deals',
    components: {
      ProductItem, PopButton
    },
    data() {
      return {
        bol: false,
        list: [],
        topStatus: '',
        wrapperHeight: 0,
        translate: 0,
        moveTranslate: 0,
        activeColor: 'red',
        fontSize: 30,
        active: 'tab-container2',
        activeSub: 'activeSub1',
        popData: [
          {
            title: '更多产品',
            popArr: [
              {title: '全部', value: '0'},
              {title: '新享加1', value: '1'},
              {title: '小贷通2', value: '2'},
              {title: '丰雅系列3', value: '3'},
              {title: '安心加4', value: '4'},
              {title: '惠票加5', value: '5'}
            ]
          },
          {
            title: '期限',
            popArr: [
              {title: '不限1', value: '0'},
              {title: '3个月以下1', value: '1'},
              {title: '3-6个月', value: '2'},
              {title: '6-9个月', value: '3'},
              {title: '9-12个月', value: '4'},
              {title: '12个月以上', value: '5'}
            ]
          },
          {
            title: '收益'
          }
        ],
        homeData: [],
        moreProList: [],
        visible: false,
        visible2: false,
        morePorName: '更多产品',
        qxName: "",
        term: [
          {title: '不限', val: 0},
          {title: '3个月以下', val: 1},
          {title: '3-6个月', val: 2},
          {title: '6-9个月', val: 3},
          {title: '9-12个月', val: 4},
          {title: '12个月以上', val: 5}
        ],
        profitVal: 0,
        sortType: [
          {title: '最新', val: 0},
          {title: '期限升序', val: 1},
          {title: '期限降序', val: 2},
          {title: '收益升序', val: 3},
          {title: '收益降序', val: 4}
        ],
        page: 1,
        allLoaded: false,
        marks: 0,
        navObj: {
          moreProductId: null,
          termVal: null,
          profitVal: null
        }
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.loadeMore("default");
        this.moreProducts();
        Indicator.open({spinnerType: 'fading-circle'})
      })
    },
    methods: {
      callBackInfo(obj) {
        if (obj == null || obj == "") {
          this.allLoaded = true;
        }
        let num = this.list.length;
        if (this.list.length == 0) {
          this.list = obj;
        } else {
          this.list = this.list.concat(obj)
        }

      },
      loadeMore(num) {
        let _self = this;
        if (num == "default") {
          //调用刷新
          _self.allLoaded = false;
          _self.list = [];
          Indicator.open({spinnerType: 'fading-circle'})
          _self.info(_self.navObj.moreProductId, _self.navObj.termVal, _self.navObj.profitVal, 1);
        } else {
          //加载更多
          _self.info(_self.navObj.moreProductId, _self.navObj.termVal, _self.navObj.profitVal, num);
        }
      },
      animation(val, val2, val3, val4) {
        this.info(val, val2, val3, val4);
      },
      profit() {
        let _self = this;
        _self.list = [];
        if (_self.profitVal == 0) {
          //设置向下 收益降序
          _self.profitVal = 4;
          _self.navObj.profitVal = _self.sortType[4].val;
          _self.marks = _self.sortType[4].val;
          _self.animation(_self.navObj.moreProductId, null, this.sortType[4].val, null);
          return false;
        } else if (_self.profitVal == 4) {
          //设置向上 收益升序
          _self.profitVal = 3;
          _self.navObj.profitVal = _self.sortType[3].val;
          _self.marks = _self.sortType[3].val;
          _self.animation(_self.navObj.moreProductId, null, this.sortType[3].val, null);
          return false;
        } else {
          //设置空白  最新
          _self.profitVal = 0;
          _self.animation(_self.navObj.moreProductId, null, 10, null);
          return false;
        }
      },
      choiceTerm(val, name) {
        let _self = this;
        _self.list = [];
        _self.qxName = name;
        _self.navObj.termVal = val;
        _self.marks = val;
        _self.animation(_self.navObj.moreProductId, val, null, null);
        _self.visible2 = false;
      },
      choicePro(id, name) {
        let _self = this;
        _self.list = [];
        _self.morePorName = name;
        _self.navObj.moreProductId = id;
        //_self.animation(id,null, null,null);
        // _self.resetPage = 1;
        /*storeWithExpiration.set('SEKECTEDDEAKNARK',1);*/
        _self.loadeMore(1);
        _self.marks = id;
        _self.visible = false;
      },
      moreProducts() {
        let Base64 = require('js-base64').Base64
        let url = '/mapi2/index.php?&act=deal_cate'
        this.$http.get(url)
          .then(response => {
            let res = JSON.parse(Base64.decode(response.data));
            this.moreProList = res.cate_type_arr;
          })
      },
      info(id, mark, srot, num) {
        let _self = this;
        let Base64 = require('js-base64').Base64
        let url = '/mapi2/index.php?&act=deals&mode=0'
        if (num != null && num != "") {
          url += '&page=' + num
        } else {
          url += '&page=1'
        }
        if (id != null && id != "") {
          url += "&cid=" + id;
        } else {
          url += "&cid=0";
        }
        if (mark != null && id != "") {
          url += "&months_type=" + mark
        }
        if (srot == 10) {
          url += "&sort_type=" + 0
        }
        if (srot != null && srot != "") {
          if (srot == 10) {
            srot = 0;
          }
          url += "&sort_type=" + srot
        }
        Indicator.open({spinnerType: 'fading-circle'})
        this.$http.get(url)
          .then(response => {
            let res = JSON.parse(Base64.decode(response.data));
            //this.list = res;
            let obj = [];
            res.item.forEach(function (value, index, array) {
              let arr = {name: array[index].name, deal_list: [array[index]]}
              obj.push(arr)
            });
            //this.list = obj;
            this.bol = true;
            this.allLoaded = false;
            //if(num > 1){
            this.callBackInfo(obj);
            //  }
            Indicator.close();
          })
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop() {
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
      }
    }
  }
</script>
<style>
  .sub-header .ivu-poptip-body {
    padding: 0 0
  }

  .sub-header .ivu-poptip:first-child {
    margin-left: 0;
    background-color: #fff;
  }

  .sub-header .ivu-poptip, .sub-header .last-btn {
    border: 0;
    width: 33.33%;
    color: #bcbcbc;
    margin-left: -4px;
    background-color: #fff;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
  }

  .sub-header .ivu-poptip-rel {
    width: 100%;
  }

  /*.ivu-btn, .last-btn{ color: #999;}*/
</style>
<style scoped>
  .gate-box {
    display: inline-block;
    width: 25px;
    height: 10px;
  }

  .profit-box {
    position: relative;
    background-color: #fff;
    margin-left: -4px !important;
  }

  .profit-box2:after {
    content: "";
    background-image: url('../assets/images/investment/up.png') !important;
  }

  .profit-box3:after {
    content: "";
    background-image: url('../assets/images/investment/down.png') !important;
  }

  .profit-box:after {
    content: "";
    background-image: url('../assets/images/investment/up.png');
    background-repeat: no-repeat;
    background-size: contain;
    display: block;
    width: 16px;
    height: 19px;
    position: absolute;
    top: 13px;
    right: 10px;
  }

  .pro-box-list li {
    border-bottom: 1px solid #e5e5e5;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .ivu-btn-ghost {
    position: relative
  }

  .ivu-btn-ghost:after, .ivu-btn-ghost:hover:after {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    position: absolute;
    right: 11px;
    top: 20px;
    border-top: 2px solid #424242;
    border-right: 2px solid #424242;
    border-bottom: 0;
    border-left: 0;
    -webkit-transform: rotate(135deg);
    -moz-transform: rotate(135deg);
    -ms-transform: rotate(135deg);
    -o-transform: rotate(135deg);
    transform: rotate(135deg);
  }

  .ivu-btn-ghost:hover {
    background-color: #e8e8e8;
    color: #383838;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    position: relative;
  }

  /*.ivu-btn-ghost:hover:after{*/
  /*content: "";*/
  /*background-image:url('../assets/images/investment/dian1.png');*/
  /*background-repeat: no-repeat;*/
  /*background-size: 100% 100%;*/
  /*display: block;*/
  /*width: 35px;*/
  /*height: 13.5px;*/
  /*position: absolute;*/
  /*top: 7px;*/
  /*right: 15px;*/
  /*}*/

  .last-btn {
    display: inline-block;
    width: 33% !important;
    /*margin-left: -4px;*/

    line-height: 45px;
    text-align: center;
    /*border-top: 1px solid #e5e5e5!important;*/
    /*border-bottom: 1px solid #e5e5e5!important;*/
  }

  .deals {
    background-color: #F5F5F5 !important;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-bottom: 55px;

  }

  .mint-tab-container {
    z-index: 0;
  }

  .page-tab-coge-tner {
    margin-top: 50px;;
  }

  .mint-loadmore-top > span > span {
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
    display: block;
    width: 30px;
  }

  .sub-btn .ivu-poptip:first-child {
    margin-left: 0;
  }

  .sub-btn .ivu-poptip:last-child {
    margin-left: -2px;
  }

  .sub-btn .ivu-poptip {
    width: 33.33%;
    background-color: #fff;
    margin-left: -4px;
    border: 1px solid red;
    text-align: center;
  }

  .ivu-btn, .last-btn {
    border-color: transparent;
    width: 100%;
    height: 53px;
    font-size: 18px;
    color: #424242;
  }

  .ivu-btn:first-child {
    margin-left: 0 !important;
  }

  .container-info li {
    margin: 12.5px 0;
    background-color: #fff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .all-btn-list button {
    background-color: #fff;
    box-shadow: none;
    border: 1px solid #e5e5e5;
  }

  .all-btn-list button:first-child {
    border-right: 0;
    margin-left: 1px;
  }

  .all-btn-list button:nth-child(2) {
    border-left: 0;
    border-right: 0;
  }

  .all-btn-list button:last-child {
    border-left: 0;
  }

  .mint-popup-1 {
    width: 200px;
    border-radius: 8px;
    padding: 10px;
    transform: translate(-50%, 0);
  }

  .mint-popup-1 h1 {
    font-size: 20px;
    color: #26a2ff;
  }

  .mint-popup-1 p {
    margin-bottom: 10px;
  }

  .mint-popup-1::before {
    triangle: 10px top #fff;
    content: '';
    position: absolute;
    top: -20px;
    right: 50px;
  }

  .type-item-r-title {
    font-size: 14px;
    color: #C9CACE;
  }

  .type-item-r-logo {
    width: 35px;
    height: 35px;
    margin-left: 8px;
    margin-right: 8px;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .type-item-r-header {
    font-size: 24px;
    color: #F9655A;
    text-align: left;
    padding-left: 12.5px;
  }

  .type-title {
    font-size: 20px;
    color: #333;
    padding-top: 15px;
    padding-bottom: 10px;
  }

  .type-sub-title {
    font-size: 14px;
    color: #999;
  }

  .full-img {
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .type-item-logo {
    width: 55px;
    height: 55px;
    margin: 0 auto;
  }

  .container-a {
    display: block;
    position: relative;
    width: 100%;
    height: 180px;
  }

  .type-item-l {
    text-align: center;
    position: absolute;
    top: 25px;
    left: 0;
    width: 130px !important;
  }

  .type-item-l:after {
    content: "";
    display: inline-block;
    width: 0;
    height: 108.5px;
    border-right: 1px solid #ececec;
    position: absolute;
    top: 11px;
    right: 15px;
  }

  .type-item-r {
    position: absolute;
    top: 25px;
    right: 0px;
    width: 220px;
  }

  .type-item-r figure {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    width: 70px !important;
  }

  .type-item {
    display: inline-block;
    vertical-align: middle;
  }

  .mint-cell {
    margin: 12.5px 0;
  }

  .active-btn {
    font-size: 17.5px;
  }

  .deals-btn-list button::after {
    background-color: transparent !important;
  }

  .deals-btn-list {
    margin-right: 60px;
  }

  .deals-tab-btn {
    background-color: transparent;
  }

  .item {
    display: inline-block;
  }

  .mint-header {
    background-color: #f4ac31;
    height: 48px;
  }

  .nav {
    height: 40px;
    background-color: #f4ac31;
    font-size: 15px;
    text-align: right
  }

  .mint-button--default {
    color: #fff
  }

  .mint-button--small {
    padding: 0 3px;
  }

  .move-m {
    margin-right: 90px !important;
  }

  .move-l {
    margin-right: 120px !important;
  }

  @media screen and (min-width: 320px) and (max-width: 373px) {
    .active-btn {
      font-size: 15.5px;
    }

    .mint-tab-container-item {
      margin: 0 10px
    }

    .type-item-l {
      width: 100px;
      margin-left: -75px;
    }

    .type-item-r {
      right: 0;
    }

    .type-title {
      font-size: 18px;
    }

    .type-item-r-header {
      font-size: 18px;
    }

    .type-item-r-logo {
      margin-left: auto;
      margin-right: auto;
    }

    .type-item-l:after {
      right: 1px;
      height: 105px;
    }

    .container-a {
      display: block;
      width: 100%;
      height: 140px;
    }

    .type-item-l, .type-item-r {
      top: 15px;
    }

    .type-item-r figure {
      width: 52px;
    }

    .mint-tab-container-item {
      width: 98%;
      margin: 0 2.5px;
    }

    .mint-cell {
      margin: 5px 0;
    }

    .type-item-r-header {
      padding-left: 5px;
    }

    .move-m {
      margin-right: 50px;
    }

    .move-l {
      margin-right: 95px;
    }
  }

  /**iPhone6 plus*/
  @media screen and (min-width: 413px) {
    .type-item-l {
      width: 120px;
    }

    .type-item-r {
      width: 240px;
      text-align: center;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }

    .type-item-r figure {
      margin: 0 7px;
    }

    .type-item-l:after {
      right: -10px;
    }

    .type-item-r-header {
      text-align: left;
      padding-left: 25px;
    }

    .move-m {
      margin-right: 116px !important;
    }

    .move-l {
      margin-right: 140px !important;
    }

    .deals-btn-list {
      margin-right: 78px;
    }

    .type-item-r figure {
      width: 60px !important;
    }
  }
</style>
