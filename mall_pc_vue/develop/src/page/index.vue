<template>
  <div name="index">

    <div class="score-area">
      <div class="score-icon-box">
        <a @click="goRecord()" class="left" href="javascript:void(0);"><img class="line-bar" src="../assets/images/file.png"/><span class="line-bar">兑换记录</span></a>
        <router-link class="right" to="/rule"><img class="line-bar" src="../assets/images/score.png"/><span class="line-bar">关于积分</span></router-link>
      </div>
      <div v-if="isLogin != 0 ">
        <router-link class="big-money" to="/mine">
          {{ integralsList.usable_score }} <i class="icon icon-middel icon-right"></i>
        </router-link>
        <span class="my-score">我的积分</span>
      </div>
      <div class="default-logo-box" v-else>
         <img src="../assets/images/mine.png"/>
         <a @click="seeScore()" href="javascript:void(0);">查看我的积分</a>
      </div>
      <!--<a @click="perfectData()" class="finish-info-btn" href="javascript:void(0);">完成完善资料即送10积分</a>-->
    </div>

    <!-- banner -->
    <Carousel autoplay :autoplay-speed="6000" class="banner-bar">
      <CarouselItem v-for="(item,index) in bannerList" :key="item.id">
        <a @click="goOutUrl(item.href_url)" v-if="item.href_url !='' " class="demo-carousel">
          <img src="../assets/images/banner.jpg"/>
        </a>
        <img v-if="item.href_url =='' " :src="[webUrl+item.adv_imgurl]" alt="">
      </CarouselItem>
    </Carousel>
    <!--/. banner -->


    <div class="main basic-line">

      <!-- 公告 -->
      <div class="up-box">
           <span><i class="icon-24 horn-icon"></i>理财公告:</span>
           <ul class="notice-box" :style="{ top }">
             <li v-for="(item,index) in noticeList.list" :key="item.id">
               <a class="notice-a-item" @click="goNotice(item.id)" href="javascript:void(0);" v-text="item.title"></a>
               <!--<span class="up-right-btn" href="javascript:void(0);"><i class="icon-24 icon-right"></i></span>-->
             </li>
           </ul>

       </div>
      <!--/. 公告 -->

      <!-- 推荐商品 -->
      <div class="recommend-box">
         <div class="recommend-mark">
           <span>推荐商品</span>
         </div>

         <ul class="clear-ul float-ul recommend-list">
           <li v-for="(item,index) in recommendList" v-if="index <= 1"
               :class="{'margin-left-220': index == 0, 'margin-left-120': index == 1 }">
             <a @click="goCommoditys(item.id,item.user_can_buy_number)" href="javascript:void(0);">
               <div class="recommend-pic">
                 <!-- 默认图片 -->
                 <img v-if="item.img == '' || item.img == null " src="../assets/images/image_err.gif"/>
                 <!--/. 默认图片 -->

                 <img :src="item.img | filterUrl">

                 <!-- 已售罄 -->
                 <img v-if="item.user_can_buy_number <= 0" class="sold-out" src="../assets/images/ysq.png"/>
                 <!--/. 已售罄 -->
               </div>
               <div class="recommend-info">
                  <span v-text="item.name"></span>
                  <p v-text="item.score"></p>
                  <span>市场价:{{item.market_price}}元</span>
               </div>
               <label>立即兑换</label>
             </a>
           </li>
         </ul>

      </div>
      <!--/. 推荐商品 -->

      <!-- 商品列表 -->
      <div class="commodity-box">
         <!-- 菜单栏 -->
         <div class="menu-box" id="menu-container">
           <ul class="clear menu-container-box">
             <li>
               <a class="all-item meun-active" href="javascript:void(0);" @click="checkTab($event,null)">
                 <span class="line-bar">全部</span><i class="icon-18 icon-up all-item-icon"></i>
                 <input class="radio-box" name="radioType" type="radio"/>
               </a>
             </li>
             <li v-for="(item,index) in typeList.items">
               <a href="javascript:void(0);" @click="checkTab($event,item.id)">
                 <span class="line-bar" v-text="item.name"></span>
                 <input class="radio-box" :id="'index-'+ index" name="radioType" type="radio" :value="item.name"/>
               </a>
             </li>
           </ul>
         </div>
         <!--/. 菜单栏 -->
         <div class="commodity-list">

           <div style="margin-left: 10px;">
             <!-- 排序 -->
             <div class="order-box">
               <ul>
                 <li><a @click="orderTab('integral',$event)" href="javascript:void(0);">按积分<i name="orderTypeIcon" class="icon order-default-icon"></i></a></li>
                 <li><a @click="orderTab('price',$event)" href="javascript:void(0);">按价格<i name="orderTypeIcon" class="icon order-default-icon"></i></a></li>
                 <li><a @click="orderTab('time',$event)" href="javascript:void(0);">按时间<i name="orderTypeIcon" class="icon order-default-icon"></i></a></li>
               </ul>
             </div>
             <!--/. 排序 -->

             <div class="commodity-info-list">
               <ul>
                 <li v-for="(item,index) in commodityList.items">
                   <a @click="goCommoditys(item.id,item.user_can_buy_number)" href="javascript:void(0)">
                      <figure class="commodity-container">
                         <div class="pic-box-item">

                           <!-- 默认图片 -->
                           <img v-if="item.img == '' || item.img == null " src="../assets/images/image_err.gif"/>
                           <!--/. 默认图片 -->

                           <img :src="item.img | filterUrl">

                           <!-- 已售罄 -->
                           <img v-if="item.user_can_buy_number <= 0" class="sold-out" src="../assets/images/ysq.png"/>
                           <!--/. 已售罄 -->

                         </div>
                        <figcaption class="commodity-title-info"  v-text="item.name">通用0.5%理财加息券</figcaption>
                        <figcaption>{{ item.score }}积分<span class="del-line">市场价:{{ item.market_price }}元</span></figcaption>
                      </figure>
                   </a>
                 </li>
               </ul>
             </div>
           </div>

         </div>
      </div>
      <!--/. 商品列表commodityList.total -->

      <div class="page-bxo" v-if="commodityList.total >=2 ">
        <Page :total="parseInt( _self.commodityList.totalrow)" :pageSize='12' @on-change="page"></Page>
      </div>

      <!-- 提示框 -->
      <Modal
        v-model="modal1"
        class-name="vertical-center-modal"
        :closable="false"
        :mask-closable="false"
        :styles="{height: '300px!important'}">
        <div class="close-container" slot="header">
          温馨提示
          <i @click="closeModal()" class="close-i-box"></i>
        </div>
        <div class="message-content-box">
          {{ message }}
        </div>
        <span @click="closeModal()" class="message-content-btn">继续兑换</span>
      </Modal>
      <!-- 提示框 -->

      <Modal
        v-model="modal2"
        width="500px"
        class="modal-box-mall"
        class-name="vertical-center-modal"
        :closable="false"
        :mask-closable="false"
        :styles="{height: '300px!important'}">
        <div class="close-container" slot="header">
          {{ messageTile }}
          <i @click="closeModal2()" class="close-i-box"></i>
        </div>
        <div class="message-info-box">
          <p class="message-info-title" v-html="messageInfo"></p>
          <span @click="closeModal2()" class="sure-box line-bar">确定</span>
        </div>

      </Modal>


    </div>



  </div>
</template>
<script>
  if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0"
    || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0"
    || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0"
    || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE9.0") {
    var mymessage=confirm("版本过低,为了更好的体验本网站请更换IE10+或者其他浏览!");
    if(mymessage==true){
      parent.location.href = '/index.php?ctl=integralmall';
    }else if(mymessage==false){
     parent.location.href = '/index.php?ctl=integralmall';
    }
  }

  window.onload = function (){
    var iframe = parent.document.getElementById("iframe");
    if (iframe) {
      var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
      if (iframeWin.document.body) {
        if(iframeWin.document.documentElement.scrollHeight >= 1710 || iframeWin.document.body.scrollHeight >= 1710){
          iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
        }else{
          iframe.height = 1710;
        }
      }
    }
  }

import myUtil from '../util/prots'

export default {
  name: 'index',
  data () {
    return {
      messageInfo: '',
      messageTile: '',
      modal2: false,
      modal3: true,
      serviceData: {},
      webUrl: '',
      bannerList: [],
      typeList: [],
      recommendList: [],
      commodityList: [],
      orderType: {
        integral: false, //按积分
        price: false, //按价格
        time: false, //按时间
        id: '' //分类id
      },
      noticeList: [],
      activeIndex: 0,
      modal1: false,
      message: '',
      isLogin: 0, //0未登录
      integralsList: [],
      usable_score: 0, //存储 可用积分
      orderStatus: {
        orderScore: null,
        orderPrice: null,
        orderTime: null
      }
    }
  },
  /*beforeCreate () {
    this.$nextTick(function () {
      this.handleSpinCustom();
    })
  },*/
  mounted:function() {
    this.$nextTick(function () {
      this.bannerInfo();//banner
      this.typeInfo();//产品类型
      this.recommend();//推荐商品
      this.list(null,null,1,null,null,null); //商品列表
      this.notice();//公告
      this.integrals();//可使用积分
      //myUtil.iframeResize();//调整父页面iframe的高度
    })
  },
  computed: {
    top () {
      return - this.activeIndex * 50 + 'px';
    }
  },
  methods: {
    closeMarks () {
      parent.document.getElementById("ScrollTopLogoNav").style = "z-index: normal;" ;
      if(parent.document.getElementById('mask')){
        parent.document.getElementById('mask').style.display="none";
      }
    },
    setScrollTop () {
      var iframe = parent.document.getElementById("iframe");
      iframe.contentWindow.window.scrollTo(0,0);
      iframe.contentWindow.document.documentElement.scrollTop = 0;
      iframe.contentWindow.document.body.scrollTop = 0;
    },
    goOutUrl (url) {
      if(url != null && url != ""){
        parent.location.href = url;
      }
    },
    closeModal2 () {
      let _self = this;
      _self.modal2 = false;
      parent.document.getElementById("ScrollTopLogoNav").style = "z-index: normal;" ;
      _self.setScrollTop();
      if(parent.document.getElementById('mask')){
        parent.document.getElementById('mask').style.display="none";
      }
    },
    seeScore () {
      let _self = this;
      _self.isLogin != 0 ?  _self.$router.push({ name: 'mine'}) : parent.location.href = '/index.php?ctl=user&act=login';
    },
    sigin () {//签到接口
      let _self = this;
      let url = '/mapi2/index.php'
      this.$http.get(url, {
        params: {
          act: 'signin',
          r_type: '1'
        }
      }).then(function (response) {
        let res = response.data;
        if(res.response_code == 1){
          _self.$Notice.open({title: '温馨提示',desc: res.show_err,duration: 6 });
        }else if(res.response_code == 106){
          _self.$Notice.open({title: '温馨提示',desc: res.show_err,duration: 6 });
        }
        console.log(response,'签到')
      });
    },
    /*handleSpinCustom  (){ //loading效果
      if(parent.document.getElementById('mask')){
        parent.document.getElementById('mask').style.display="block";
      }
      parent.document.getElementById("ScrollTopLogoNav").style = "z-index: 890!important;position: absolute;" ;
      this.$Spin.show({
        render: (h) => {
          return h('div', [
            h('Icon', {
              'class': 'demo-spin-icon-load',
              props: {
                type: 'load-c',
                size: 18
              }
            }),
            h('div', 'Loading')
          ])
        }
      });
    },*/
    goNotice (id) { //去公告详情
      parent.location.href = '/index.php?ctl=mall_notice_info&id=' + id;
    },
    perfectData () {
      let _self = this;
      if(_self.isLogin == 0){
        parent.location.href = '/index.php?ctl=user&act=login';
        return false;
      }
      parent.location.href = '/member.php?ctl=uc_account'
    },
    goRecord () { //去兑换记录
      let _self = this;
      _self.isLogin != 0 ?  _self.$router.push({ name: 'record'}) : parent.location.href = '/index.php?ctl=user&act=login';
    },
    closeModal () {
       let _self = this;
       _self.modal1 = false;
      parent.document.getElementById('iframe').style = "margin-top:0;";
      parent.document.getElementById("ScrollTopLogoNav").style = "z-index: normal;" ;
       _self.message = '';
      if(parent.document.getElementById('mask')){
        parent.document.getElementById('mask').style.display="none";
      }
    },
    goCommoditys (id,sq) {
      let _self = this;
      console.log(sq,'是否售罄')
      if(sq <= 0 || sq == null || sq == '' || sq == 'undefined'){
        //已售罄
        if(parent.document.getElementById('mask')){
          parent.document.getElementById('mask').style.display="block";
          //z-index: 890!important;
        }

        _self.setScrollTop();
        _self.modal1 = true;
        parent.document.getElementById('iframe').style = "margin-top:170px!important;";

        parent.document.body.scrollTop = 0;
        parent.document.documentElement.scrollTop = 0;
        parent.document.getElementById("ScrollTopLogoNav").style = "z-index: 890!important;position: absolute;" ;
        _self.message = '此商品已售罄，请选购其他商品！';
        return false;
      }

      var number = 0
       if(_self.usable_score == 0){
         number = 0;
       }else {
         number = _self.usable_score;
       }

      _self.$router.push({ name: 'details', params: { id: id }});

    },
    integrals () { //可用积分
      let _self = this;

      let Url = '/mapi2/index.php'
      let formData = new FormData();
      formData.append("act", "uc_score");
      /*formData.append("email", '15221355211');
      formData.append("pwd", '123456');*/
      formData.append("r_type", "1");

      this.$http.post(Url, formData)
        .then(function (response) {
          _self.integralsList = response.data;
          _self.usable_score = response.data.usable_score;
          let obj = response.data;
          _self.isLogin = obj.response_code;
          //_self.sigin();//调用签到接口
          console.log(response,'可用积分')
        }).catch(function (error) {
        _self.$Notice.open({title: '温馨提示',desc: error });
      });
    },
    noticeUp () { //向上滚动
      setInterval(_ => {
        if(this.activeIndex < this.noticeList.list.length) {
          this.activeIndex += 1;
        } else {
          this.activeIndex = 0;
        }
      }, 2000);
    },
    notice (){ //公告
      let _self = this;
      let url = '/mapi2/index.php'
      this.$http.get(url, {
        params: {
          act: 'notify_list',
          act_2: 'announcement',
          r_type: '1'
        }
      }).then(function (response) {
        _self.noticeList = response.data;
        _self.noticeUp();
         console.log(response,'公告')
      });
    },
    page (num) { //分页
      let _self = this;
      _self.list(_self.orderType.id,null,num,_self.orderStatus.orderScore,_self.orderStatus.orderPrice,_self.orderStatus.orderTime);
    },
    orderTab (mark,el) { //切换分类
      let _self = this;
      let els = el.target;
      let orderTypeIcon = document.getElementsByName("orderTypeIcon");

      for(let i = 0; i < orderTypeIcon.length; i++){
        orderTypeIcon[i].classList.remove( 'orderl-down-icon');
        orderTypeIcon[i].classList.remove( 'orderl-up-icon');
      }
       if(mark == 'integral'){ //按积分
         _self.orderType.integral = !_self.orderType.integral;

         if(_self.orderType.integral){ //降序
           console.log("true")
           els.childNodes[1].classList.add('orderl-down-icon');

           _self.orderStatus.orderScore = 'desc';
           _self.list(_self.orderType.id,null,1,'desc',null,null);

         }else{ //升序
           console.log("false")
           els.childNodes[1].classList.add('orderl-up-icon');
           _self.orderStatus.orderScore = 'asc';
           _self.list(_self.orderType.id,null,1,'asc',null,null);
         }

       }else if(mark == 'price'){ //按价格

         _self.orderType.price = !_self.orderType.price;

         if(_self.orderType.price){ //降序
           console.log("true")
           els.childNodes[1].classList.add('orderl-down-icon');
           _self.orderStatus.orderPrice = 'desc';
           _self.list(_self.orderType.id,null,1,null,'desc',null);
         }else{ //升序
           console.log("false")
           els.childNodes[1].classList.add('orderl-up-icon');
           _self.orderStatus.orderPrice = 'asc';
           _self.list(_self.orderType.id,null,1,null,'asc',null);
         }

       }else if(mark == 'time'){ //按时间
         _self.orderType.time = !_self.orderType.time;

         if(_self.orderType.time){ //降序
           console.log("true")
           els.childNodes[1].classList.add('orderl-down-icon');
           _self.orderStatus.orderTime = 'desc';
           _self.list(_self.orderType.id,null,1,null,null,'desc');
         }else{ //升序
           console.log("false")
           els.childNodes[1].classList.add('orderl-up-icon');
           _self.orderStatus.orderTime = 'asc';
           _self.list(_self.orderType.id,null,1,null,null,'asc');
         }

       }
    },
    list (num, mark, page, score, market_price, add_time) { //商品类别
      let _self = this;
      let url = '/mapi2/index.php'
      this.$http.get(url, {
        params: {
          act: 'goodslists',
          cate_id: num,
          is_recommend: mark,
          page: page,
          score: score,
          market_price: market_price,
          add_time: add_time,
          limit: 12,
          r_type: '1'
        }
      }).then(function (response) {
         _self.commodityList = response.data;
         _self.closeMarks();
        //_self.$Spin.hide();
         console.log(response,'商品列表')
        console.log( _self.commodityList.total,'---------------' + _self.commodityList.totalrow)
      });
    },
    recommend () { //推荐商品
      let _self = this;
      let url = '/mapi2/index.php'
      this.$http.get(url, {
        params: {
          act: 'goodslists',
          is_recommend: 1,
          r_type: '1',
          limit: 12
        }
      }).then(function (response) {
        _self.recommendList = response.data.items;
        console.log(response,'推荐商品')
      });
    },
    checkTab (el,id){ //产品类型切换

      let _self = this;
      console.log(id,'类型编号');

      let cate_id = null;
      if(id != null && id != ''){
        cate_id = id;
        _self.orderType.id = id;
      }else {
        _self.orderType.id = null;
      }


      this.list(cate_id,null,1,null,null,null);

      _self.orderType.integral = false; //按积分
      _self.orderType.price = false;//按价格
      _self.orderType.time = false;//按时间



      let val ="";
      let radioType = document.getElementsByName("radioType");
      let ulObj = document.getElementById('menu-container');
      let aList = ulObj.getElementsByTagName('a');

      let orderTypeIcon = document.getElementsByName("orderTypeIcon");

      for(let i = 0; i < orderTypeIcon.length; i++){
        orderTypeIcon[i].classList.remove( 'orderl-down-icon');
        orderTypeIcon[i].classList.remove( 'orderl-up-icon');
      }

      for(let i = 0; i < aList.length; i++){
        aList[i].classList.remove( 'meun-active')
      }

      for(let i= 0; i<radioType.length; i++){
        if(radioType[i].checked){
          val = radioType[i].value;
        }
      }
      if(val != null && val != ''){
        el.target.parentNode.classList.add( 'meun-active');
      }
    },
    typeInfo () { //产品类型
      let _self = this
      let url = '/mapi2/index.php'
      this.$http.get(url, {
        params: {
          act: 'goodslists',
          act_2: 'get_goods_cate',
          r_type: '1'
        }
      }).then(function (response) {
        _self.typeList = response.data;
        console.log(response,'产品类型')
      });
    },
    bannerInfo () { //banner
      let _self = this;
      let url = '/mapi2/index.php'
      this.$http.get(url, {
        params: {
          act: 'IntegralAdvactivity',
          r_type: '1',
          style:3
        }
      }).then(function (response) {
        let res = response.data
        let prot = window.location.protocol;
        let host = window.location.host;
        console.log(res)
        _self.webUrl = prot+"//"+host
        if(res.list != null){
          _self.bannerList = res.list;
        }
      });
    },
  },
  filters: {
    filterUrl (url) { //过略图片路径
      if(url.indexOf("./") > -1){
        var newUrl = url.substr(1, url.length);
        let str = myUtil.baseProts();
        if(str.indexOf(':8080') > -1){
           str = "https://www.jianguolicai.cn" + newUrl;
           return str;
        }
        return str + newUrl;
      }else{
        return url;
      }
    }
  }
}
</script>
<style>
  .sigin-box div.ivu-modal-header{
    background-color: #fff;
  }
  .demo-carousel img{
    width: 100%;
  }
  .vertical-center-modal{ display: flex; align-items: center;justify-content: center;}
  .vertical-center-modal .ivu-modal{ top: 0;}

  .modal-box-mall .ivu-modal-content,
  .modal-box-mall .ivu-modal-body,
  .modal-box-mall .ivu-modal{ height: 267px;}
  .ivu-modal{
    width:771px;
    height: 267px;
    background: #FFFFFF;
    -webkit-border-radius: 4px!important;
    -moz-border-radius: 4px!important;
    border-radius: 4px!important;
  }
  .ivu-modal-content{ height: 267px;}
  .ivu-modal-body{ height: 267px;}
  .ivu-modal-footer{ display: none;}
  .ivu-modal-header p, .ivu-modal-header-inner{
    font-size: 18px;
    color: #666666;
  }
  .ivu-modal-header{
    background: #F3F3F3;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
</style>
<style scoped>
  .notice-a-item:after{
    content: '';
    width: 10px;
    height: 10px;
    border-right: 2px solid #6F6F6F;
    border-bottom: 2px solid #6F6F6F;
    position: absolute;
    right: 15px;
    top: 20px;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .notice-a-item{ position: relative; }
  .sure-box{
    width: 120px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background: #FDB75A;
    font-weight: 600;
    font-size: 14px;
    color: #FFFFFF;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    margin-top: 38px;
    cursor: pointer;
  }
  .message-info-box{
    margin-top: 40px;
    text-align: center;
  }
  .message-info-title{
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #333333;
  }
.default-logo-box a{
  display: block;
  font-size: 14px;
  color: #666666;
}
.default-logo-box{
  margin-top: 58px;
}
.message-content-btn{
  display: block;
  width: 150px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  cursor: pointer;
  background: #FDB75A;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  font-size: 14px;
  color: #FFFFFF;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}
.message-content-box{
  font-size: 18px;
  color: #333333;
  text-align: center;
  padding: 30px;
}
.menu-container-box{
  position: absolute;
  top: 0;
  width: 100%;
}
.margin-left-120{ margin-left: 120px;}
.margin-left-220{ margin-left: 220px!important;}
.radio-box{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
}
  .about-us{ margin-right: 100px;}
  .code-pic-box img{
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
  .code-pic-box{
    width: 133px;
    height: 133px;
  }

/**               商品列表开始                  */
.del-line{
  text-decoration: line-through;
  opacity: 0.99;
  font-size: 12px;
  color: #909192;
  letter-spacing: 0;
  font-weight: normal;
  margin-left: 10px;
}

.commodity-info-list a{
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
}
.commodity-container figcaption{ padding-left: 10px;}
.commodity-container figcaption:last-child{
  font-size: 14px;
  color: #F25F5C;
  font-weight: 600;
  letter-spacing: 0;
}
.commodity-title-info{
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
  display: block;
  max-width: 100%;
  _width: 100%;
  overflow: hidden;
  text-align: left;
  height: 32px;
  line-height: 16px;
  word-wrap: break-word;
  word-break: break-all;
}
.commodity-container{ overflow: hidden;}
.pic-box-item img{
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}
.pic-box-item{
  width: 170px;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 35px;
  margin-bottom: 10px;
  text-align: center;
  position: relative;
}
.commodity-info-list ul li a{
  display: block;
  width: 248px;
  height: 262px;
  background-color: #fff;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
.commodity-info-list ul li{
  float: left;
  margin-left: 5px;
  border-bottom: 5px solid #f7f7f7;
}
.commodity-info-list ul li:nth-last-of-type(0),
.commodity-info-list ul li:nth-last-of-type(1),
.commodity-info-list ul li:nth-last-of-type(2),
.commodity-info-list ul li:nth-last-of-type(3),
.commodity-info-list ul li:nth-last-of-type(4){
  border-bottom: 5px solid #fff;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
}
.commodity-info-list ul{
  list-style: none;
  overflow: hidden;
  margin-left: -5px;
  margin-top: 7px;
}

.order-box{
  width: 100%;
  height: 50px;
  background-color: #fff;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  margin-bottom: 7px;
}
.orderl-up-icon{
  background: url("../assets/images/icon.png") no-repeat!important;
  background-position: -3px -231px!important;
  margin-right: 12px;
}
.orderl-down-icon{
  background: url("../assets/images/icon.png") no-repeat!important;
  background-position: -3px -253px!important;
  margin-right: 12px;
}
.order-default-icon{
  background: url("../assets/images/icon.png") no-repeat;
  background-position: -3px -210px;
  margin-right: 12px;
}
.order-box ul li a{ color: #999999;font-size: 14px;}
.order-box ul li{ float: left;}
.order-box ul{
  position: absolute;
  top: 10px;
  right: 0;
}
.all-item{ position: relative;}
.all-item-icon{
  position: absolute;
  right: 10px;
  top: 15px;
}
.icon-up{
  background: url("../assets/images/icon.png") no-repeat;
  background-position: -26px -15px;
  margin-right: 12px;
}
.icon-18{
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 18px;
}
.meun-active{
  background: #FFFFFF;
  border-left: 3px solid #FFC156;
  border-top: 1px solid rgba(234,235,237,0.30);
  box-shadow: 0 5px 10px 1px rgba(203,203,203,0.26);
  border-radius: 2px;
  color: #FFC156!important;
  font-weight: 600;
  -webkit-transition: box-shadow .35s ease-in;
  -moz-transition: box-shadow .35s ease-in;
  -ms-transition: box-shadow .35s ease-in;
  -o-transition: box-shadow .35s ease-in;
  transition: box-shadow .35s ease-in;
}
.menu-box a:hover{
  background: #FFFFFF;
  border-top: 1px solid rgba(234,235,237,0.30);
  box-shadow: 0 5px 10px 1px rgba(203,203,203,0.26);
  border-radius: 2px;
  color: #FFC156;
  -webkit-transition: box-shadow .35s ease-in;
  -moz-transition: box-shadow .35s ease-in;
  -ms-transition: box-shadow .35s ease-in;
  -o-transition: box-shadow .35s ease-in;
  transition: box-shadow .35s ease-in;
}
.menu-box li, .menu-box a{
  display: block;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #666666;
  position: relative;
}
.menu-box a span{
  padding-left: 24px;
}
.commodity-list{
 /* position: absolute;
  left: 192px;
  top: 0;*/
  /*width: 1009px;*/
 /* min-height: 578px;
  height: auto;*/
  width: 1018px;
  display:table-cell;
}
.menu-box{
  position: relative;
  width: 180px;
  /*min-height: 578px;
  height: auto;*/
  background-color: #fff;
  display:table-cell;
}
.commodity-box{
  margin-top: 20px;
  position: relative;
  min-height: 582px;
  display:table;
  border-collapse:collapse;
}
/**               商品列表结束                  */
.recommend-list label{
  display: block;
  position: absolute;
  bottom: 28px;
  right: 53px;
  width: 115px;
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  text-align: center;
  color: #FFC156;
  letter-spacing: 0;
  border: 1px solid #FFC156;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  cursor: pointer;
}
.recommend-info p{
  font-size: 16px;
  color: #F25F5C;
  font-weight: 600;
  letter-spacing: 0;
}
.recommend-info span:last-child{
  opacity: 0.99;
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
  text-decoration: line-through;
}
.recommend-info span:first-child{
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
  display: block;
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  text-align: left;
  height: 32px;
  padding-right: 10px;
  line-height: 16px;
  word-wrap: break-word;
  word-break: break-all;
}
.recommend-info{
  position: absolute;
  top: 20px;
  left: 200px;
}
.sold-out{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 33;
}
.recommend-pic{
  width: 160px;
  height: 150px;
  position: absolute;
  top: 20px;
  left: 20px;
  text-align: center;
}
.recommend-pic img{
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}
.recommend-list{ margin-top: 32px;}
.recommend-list > li:first-child{ margin-left: 38px;}
.recommend-list li a{
  display: block;
  width: 373px;
  height: 202px;
  border: 0;
  color: #666666;
  position: relative;
}
.recommend-list li a:hover > label{
  background-color: #FFC156;
  color: #fff;
  -webkit-transition: all .35s ease-in;
  -moz-transition: all .35s ease-in;
  -ms-transition: all .35s ease-in;
  -o-transition: all .35s ease-in;
  transition: all .35s ease-in;
}
.recommend-list li a:hover{
  background: #FFFFFF;
  border-top: 1px solid rgba(234,235,237,0.30);
  box-shadow: 0 10px 20px 1px rgba(203,203,203,0.26);
  border-radius: 2px;
  -webkit-transition: box-shadow .35s ease-in;
  -moz-transition: box-shadow .35s ease-in;
  -ms-transition: box-shadow .35s ease-in;
  -o-transition: box-shadow .35s ease-in;
  transition: box-shadow .35s ease-in;
}
.recommend-mark{ overflow: hidden}
.recommend-mark span{
  display: block;
  width: 110px;
  height: 34px;
  line-height: 34px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  margin-top: 19px;
  background: url("../assets/images/long.png") no-repeat;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
}
.recommend-box{
  height: 364px;
  background-color: #fff;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
.notice-box{
  display: inline-block;
  vertical-align: middle;
  position: relative;
  transition: top 0.5s;
  width: 1080px;
  margin-left: 110px;
}
.notice-box li{
  line-height: 50px;
}
  .icon-24{
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 24px;
  }
div[name='index']{ width: 100%;}
.finish-info-btn{
  display: block;
  width: 277px;
  height: 43px;
  line-height: 43px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  font-size: 14px;
  color: #ffffff;
  background: url("../assets/images/btn.png") no-repeat;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
}
.my-score{ font-size: 14px;color: #999999;}
.icon-middel{ width: 16px;height: 16px;}
.horn-icon{
  background: url("../assets/images/icon.png") no-repeat;
  background-position: 1px -67px;
  margin-right: 12px;
}
.icon-right{
  background: url("../assets/images/icon.png") no-repeat;
  background-position: -30px -72px;
}
.big-money{
  display: block;
  font-size: 24px;
  color: #333333;
  font-family: PingFangSC-Regular;
  font-weight: 600;
  margin-top: 49px;
}
.score-icon-box img{
  margin-left: 20px;
  margin-right: 10px;
}
.score-icon-box span:last-child{ margin-right: 30px}
.score-icon-box a{
  color: #FF7527;
  font-size: 14px;
}
.score-icon-box{
  margin-top: 20px;
  overflow: hidden;
}
.score-area{
  width: 300px;
  height: 248px;
  margin-left: auto;
  margin-right: auto;
  margin-top:0;
  background-color: #fff;
  position: relative;
  right: -340px;
  top: 50px;
  overflow: hidden;
  text-align: center;
  z-index: 88;
}
.up-box{
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0.85px;
  position: relative;
  overflow: hidden;
}
.up-box span{
  display: inline-block;
  position: absolute;
  top: 0;
  margin-right: 100px;
}
.up-right-btn{
  position: absolute;
  top: 5px;
  right: 0;
}
.up-box a{ color: #666666;display: block;}
.banner-bar img{
  max-width: 100%;
  max-height: 350px;
  width: auto;
  height: 100%;
  margin: 0 auto;
}
.banner-bar{
  width: 100%;
  height: 350px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -248px;
}
@media screen and (min-width: 1921px) {
  .banner-bar{ text-align: center; }
}
</style>
