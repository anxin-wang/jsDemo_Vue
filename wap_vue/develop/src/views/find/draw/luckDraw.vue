<template>
  <div class="LuckDraw">

    <div class="bg-box">
      <!--<div class="font-title">&lt;!&ndash;人人有礼100%中奖&ndash;&gt;1</div>-->
      <router-link class="share-box" to="#" onclick="sharedraw()">
        <label>分</label><label>享</label>
      </router-link>
      <!-- 大转盘 -->
      <div class="turntable-box">
        <turntable v-on:pointerInfo="pointerInfo" v-on:callbackInfo="callbackInfo" v-on:activityRule="activityRule"></turntable>
      </div>
      <!--/. 大转盘 -->

      <div class="luck-font">
        活动期间，坚果理财所有注册绑卡用户皆可参与抽奖。每人
        仅限抽奖一次，100%中奖。加息券适用于平台除新手标以外
        的所有标的。加息券使用有效期至2018年6月1日。
      </div>

      <div class="luck-dracue">
        <p>坚果理财成交额已突破一亿!</p>
        <p>感谢新老用户对坚果的支持和信赖,</p>
        <p>坚果送上好礼,一起来狂欢吧!</p>
      </div>

      <!-- 投资另有好礼相送 -->
      <div class="bg-new">
        <div class="box-items">
          <img class="haoli-pic" src="../../../assets/images/mall/bg02.png"/>
          <i class="square-item square-1"></i> <i class="square-item square-2"></i><i class="square-item square-3"></i><i class="square-item square-4"></i>
          <div class="box-header">
            活动期间累积年化投资如以下金额,即可获得以下相应奖品。
          </div>
          <ul class="list-box">
            <li>
              <div class="left-box">
                <img src="../../../assets/images/mall/shou1.png"/>
              </div>
              <div class="right-box">
                <div class="name-box">iPhoneX 256G </div>
                <span class="price-box">原价<label class="padding-left-5">9688元</label></span><router-link onclick="zichanjiaActivityType()" class="go-btn" to="#">去投资</router-link>
                <div class="info-box">活动期间累积投资年化≥70万</div>
              </div>
            </li>
            <li>
              <div class="left-box">
                <img src="../../../assets/images/mall/shou2.png"/>
              </div>
              <div class="right-box">
                <div class="name-box">iPhone8Plus 64G</div>
                <span class="price-box">原价<label class="padding-left-5">6688元</label></span><router-link onclick="zichanjiaActivityType()" class="go-btn" to="#">去投资</router-link>
                <div class="info-box">活动期间累积投资年化≥50万</div>
              </div>
            </li>
            <li>
              <div class="left-box">
                <img src="../../../assets/images/mall/shou3.png"/>
              </div>
              <div class="right-box">
                <div class="name-box">iPhone8 64G</div>
                <span class="price-box">原价<label class="padding-left-5">5888元</label></span><router-link onclick="zichanjiaActivityType()" class="go-btn" to="#">去投资</router-link>
                <div class="info-box">活动期间累积投资年化≥45万</div>
              </div>
            </li>
            <li>
              <div class="left-box">
                <img src="../../../assets/images/mall/shou4.png"/>
              </div>
              <div class="right-box">
                <div class="name-box">Apple watch series 3 GPS +蜂窝</div>
                <span class="price-box">原价<label class="padding-left-5">3488元</label></span><router-link onclick="zichanjiaActivityType()" class="go-btn" to="#">去投资</router-link>
                <div class="info-box">活动期间累积投资年化≥25万</div>
              </div>
            </li>
            <li>
              <div class="left-box">
                <img src="../../../assets/images/mall/shou5.png"/>
              </div>
              <div class="right-box">
                <div class="name-box">Apple watch series 3 GPS</div>
                <span class="price-box">原价<label class="padding-left-5">2588元</label></span><router-link onclick="zichanjiaActivityType()" class="go-btn" to="#">去投资</router-link>
                <div class="info-box">活动期间累积投资年化≥20万</div>
              </div>
            </li>
          </ul>
          <div class="mark-box">
            *注：实物奖励将于活动结束后10个工作日内寄出(iPhoneX 由于采购周期较长，
            具体寄送日期根据苹果官方实际出货时间为准，需要您耐心等待哦。)
          </div>
        </div>
        <!--/. 投资另有好礼相送 -->


        <!-- 活动规则 -->
        <div class="box-items margin-bottom">
          <img class="haoli-pic" src="../../../assets/images/mall/bg03.png"/>
          <i class="square-item square-1"></i> <i class="square-item square-2"></i><i class="square-item square-3"></i><i class="square-item square-4"></i>
          <div class="info-font-box">
            <div>活动时间：</div>
            <div class="mark-font">
              {{activityInfo.start_time | newDateTime}} -- {{activityInfo.end_time | newDateTime}}</div>
            <div>活动规则：</div>
            <div v-html="activityInfo.activity_rule"></div>
          </div>
        </div>
        <!--／. 活动规则 -->

      </div>
      <!-- 弹框 -->
      <div v-show="showBox" class="bg-container" :class="{'none-bg': box == 1}">
        <i @click="closeBox()" v-show="showBox" class="close-box"></i>
        <div class="bg-sub-pic" v-if="box == 1"></div>

        <!-- 中奖百分比弹框 -->
        <div class="bg-msg-pic" v-if="box == 1">
          <span class="bg-msg-num">{{luckInfo}}</span>
        </div>
        <!-- 中奖百分比弹框 -->

        <!-- 没机会 -->
        <div class="bg-none-pic" v-if="box == 2"></div>
        <!--/. 没机会 -->

        <!-- 此时抽奖的人太多，休息一会儿再试试吧 -->
        <div class="bg-none-much" v-if="box == 5"></div>
        <!--/. 此时抽奖的人太多，休息一会儿再试试吧 -->

        <!-- 活动结束 -->
        <div class="bg-none-end" v-if="box == 6"></div>
        <!--/. 活动结束 -->

        <!-- 未有活动 -->
        <div class="bg-none-NotActivity" v-if="box == 7"></div>
        <!--/. 未有活动 -->

        <!-- 活动未开始 -->
        <div class="bg-none-notStart" v-if="box == 8"></div>
        <!--/. 活动未开始 -->

        <!-- 去绑定 -->
        <div class="bg-bind-pic" v-if="box == 3">
          <!--<router-link class="bg-go-btn" to="#"></router-link>-->
        </div>
        <!-- 去绑定 -->

        <!-- 去注册 -->
        <div class="bg-register-pic" v-if="box == 4">
          <router-link onclick="applogin()" v-if="LoginInfo == false" class="bg-go-register-btn" to="#"></router-link>
          <router-link @click.native="applogin()" v-if="LoginInfo == true" class="bg-go-register-btn" to="#"></router-link>
        </div>
        <!--/. 去注册 -->
      </div>
      <!--／. 弹框 -->
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
/* 使用px：import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.px/dialog'; */
Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
};
export default {
    components:{
        /*转盘 组件*/
        turntable:require('./turntable2.vue'),
    },
    data () {
        return{
            showBox: false, //显示弹框(默认false 不显示)
            box: "", //(1:显示抽中弹框,2:没机会弹框,3:绑定弹框,4:去注册弹框,5:抽奖人太多,6：活动结束,7.未有活动,8:活动未开始)
            LoginInfo:false,
            luckInfo:"",
            activityInfo:[]
        }
    },
    watch:{
        showBox(val){
            if(val == true){
                $('html,body').css({"overflow-y":"hidden","height":"100%"})
            }else{
                $('html,body').removeAttr("style")
            }
        }
    },
    mounted () {
        this.$nextTick(function () {
            /*1:活动无效,
            2:您好像没有绑定银行卡,
            3:对不起，您没有抽奖机会了。,
            4:积分不足,
            5:此时抽奖的人太多，休息一会儿再试试吧,
            6:您没有注册*/
            this.info()
        })
    },
    methods: {
        /*获取用户信息*/
        info () {
            let _that = this
            let Base64 = require('js-base64').Base64
            let Url = '/mapi2/index.php?'
            let formData = new FormData();
            formData.append("act","uc_center")
            _that.$http.post(Url,formData)
                .then(response => {
                    var response = JSON.parse(Base64.decode(response.data));
                    if(response.response_code == 0){
                        _that.LoginInfo = false
                    }else{
                        _that.LoginInfo = true
                    }
                })
        },
        /*抽奖返回 抽奖信息*/
        pointerInfo(data){
            if(data.show_err_code == undefined){
                this.box = 1
            }
            if(data.show_err_code == 1){
                this.showBox = true
                this.box = 6
            }
            if(data.show_err_code == 2){
                this.showBox = true
                this.box = 3
            }
            if(data.show_err_code == 3){
                this.showBox = true
                this.box = 2
            }
            if(data.show_err_code == 4){
                this.showBox = true
                alert('积分不足')
            }
            if(data.show_err_code == 5){
                this.showBox = true
                this.box = 5
            }
            if(data.show_err_code == 6){
                this.showBox = true
                this.box = 4
            }
        },
        /*抽奖返回 抽奖信息的name和value*/
        callbackInfo(data){
            this.luckInfo = data.name
            this.showBox = true
        },
        /*子组件返回活动数据*/
        activityRule(data){
            if(data.response_code == 0){
                /*0:失败(未登录)*/
                this.showBox = true
                this.box = 4
            }else if(data.response_code ==2){
                /*2:未有活动*/
                this.showBox = true
                this.box = 7
            }else if(data.response_code ==3){
                /*3:活动未开始*/
                this.showBox = true
                this.box = 8
            }else if(data.response_code ==4){
                /*4:活动已结束*/
                this.showBox = true
                this.box = 6
            }
            if(data.activity != null){
                this.activityInfo = data.activity
            }
        },
        closeBox () {
            this.showBox = false;
        },
        applogin(){ //登录
            zichanjia_app_android.applogin();
        },
        sharedraw(){
            zichanjia_app_android.sharedraw();
        },
        zichanjiaActivityType(){ //去投资
            var obj = {type: "0", cate_id: "123",borrow_id: "234"}
            zichanjia_app_android.activity(JSON.stringify(obj));
        },
        openType(){
            var browser = {
                versions: function() {
                    var u = navigator.userAgent,
                        app = navigator.appVersion;
                    return { //移动终端浏览器版本信息
                        trident: u.indexOf('Trident') > -1, //IE内核
                        presto: u.indexOf('Presto') > -1, //opera内核
                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
            }

            if (browser.versions.mobile) { //判断是否是移动设备打开。browser代码在下面
                var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
                if (browser.versions.ios) {
                    alert("ios")
                }
                if (browser.versions.android) {
                    alert("android")
                }
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    alert("MicroMessenger")
                }
                if (ua.match(/\sQQ/i) == "qq") {
                    alert("qq")
                }
            } else {
                //否则就是PC浏览器打开
                alert("PC")
            }
        },
        userName(){ return window.storeWithExpiration.get('MallUserName')},
        userPwd(){return window.storeWithExpiration.get('MallUserPwd')},
    },
    filters:{
        bannerimgurl (url){
            let _self = this
            if(url != null && url != ""){

                //获取完整路径 为: http://localhost:6981/InspectionData/TEST.html
                var fullPath=window.document.location.href;

                //获取主机地址之后的路径 为: /InspectionData/TEST.html
                var pathName=window.document.location.pathname;

                //获取主机地址之后的路径长度 为: /InspectionData/TEST.html的长度为25
                var pos=fullPath.indexOf(pathName);

                //获取主机地址 为: http://localhost:6981
                var localhostPath=fullPath.substring(0,pos);

                if(url.indexOf("./") > -1){
                    var l = url.substr(1, url.length);
                    if(localhostPath != 'http://localhost:8080'){
                        return localhostPath + l;
                    }else{
                        return 'http://develop.jianguolicai.cn/' + l;
                    }

                }else{
                    return url;
                }
            }else {
                return require('../../../assets/images/goods_bg.gif')
            }
        },
        newDateTime(timeStamp){
            var date = new Date();
            date.setTime(timeStamp * 1000);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
        }
    }
}

</script>
<style scoped>
  .bg-new{
    background-color: #ff6724;padding-bottom: 50px;
  }
  .none-bg{
    background-image: url("../../../assets/images/mall/bgpng.png");
    background-repeat: no-repeat;
    background-position: 10px 30px;
    -webkit-background-size:100%;
    background-size: 100%;
  }
  .close-box{
    display: block;
    width: 25px;
    height: 25px;
    background: url("../../../assets/images/mall/6.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    cursor: pointer;
    position: absolute;
    right: 40px;
    top: 120px;
    z-index: 33333;
  }
  .bg-go-register-btn{
    display: inline-block;
    background: url("../../../assets/images/mall/12.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    width: 140px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 40px 0 70px -60px;
  }
  .bg-go-btn{
    display: inline-block;
    background: url("../../../assets/images/mall/10.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    width: 140px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 40px 0 70px -60px;
  }
  .bg-msg-num{
    display: inline-block;
    color: #ff6a29;
    font-size: 21px;
    position: absolute;
    bottom: 84px;
    left: 38%;
  }
  .bg-register-pic{
    width: 260px;
    height: 280px;
    background: url("../../../assets/images/mall/11.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    position: absolute;
    top: 25%;
    left: 50%;
    margin: 0 0 125px -125px;
  }
  .bg-bind-pic{
    width: 260px;
    height: 280px;
    background: url("../../../assets/images/mall/9.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    position: absolute;
    top: 25%;
    left: 50%;
    margin: 0 0 125px -125px;
  }
  .bg-none-pic{
    width: 260px;
    height: 280px;
    background: url("../../../assets/images/mall/7.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    position: absolute;
    top: 25%;
    left: 50%;
    margin: 0 0 125px -125px;
  }
  .bg-none-much{
    width: 260px;
    height: 280px;
    background: url("../../../assets/images/mall/activitymuch.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    position: absolute;
    top: 25%;
    left: 50%;
    margin: 0 0 125px -125px;
  }
  .bg-none-end{
    width: 260px;
    height: 280px;
    background: url("../../../assets/images/mall/activityEnd.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    position: absolute;
    top: 25%;
    left: 50%;
    margin: 0 0 125px -125px;
  }
  .bg-none-notStart{
    width: 260px;
    height: 280px;
    background: url("../../../assets/images/mall/13.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    position: absolute;
    top: 25%;
    left: 50%;
    margin: 0 0 125px -125px;
  }
  .bg-none-NotActivity{
    width: 260px;
    height: 280px;
    background: url("../../../assets/images/mall/NotActivity.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    position: absolute;
    top: 25%;
    left: 50%;
    margin: 0 0 125px -125px;
  }
  .bg-msg-pic{
    width: 260px;
    height: 280px;
    background: url("../../../assets/images/mall/4.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    position: absolute;
    top: 25%;
    left: 50%;
    margin: 0 0 125px -125px;
  }
  .bg-sub-pic{
    width: 260px;
    height: 260px;
    background: url("../../../assets/images/mall/5.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    position: absolute;
    top: 16%;
    left: 50%;
    margin: 0 0 135px -135px;
  }
  .bg-container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(111,111,111,.7);
    z-index: 99999;
  }
  .margin-bottom{ }
  .mark-font{ color: #df4400;margin-bottom: 18px;}
  .info-font-box{
    color: #333333;
    width: 96%;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    font-size: 14px;
    padding-bottom: 39px;
  }
  .mark-box{
    color: #989898;
    font-size: 14px;
    width: 96%;
    margin: 0 auto;
    padding-bottom: 50px;
  }
  .list-box li{
    margin-bottom: 20px;
  }
  .price-box:before{
    content: '';
    display: inline-block;
    position: absolute;
    top: 10px;
    left: 0;
    width: 90px;
    border: 1px solid #df4400;
    -webkit-transform: rotate(5deg);
    -moz-transform: rotate(5deg);
    -ms-transform: rotate(5deg);
    -o-transform: rotate(5deg);
    transform: rotate(5deg);
  }
  .price-box{
    display: inline-block;
    position: relative;margin: 5px 0;
  }
  .padding-left-5{ padding-left: 5px}
  .go-btn{
    display: inline-block;
    width: 80px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #df4400;
    border: 1px solid #df4400;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    position: absolute;
    right: -2px;
    top: 22px;
  }
  .info-box{
    color: #df4400;
  }
  .name-box{
    color: #4f4f4f;
    display:block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .right-box{
    display: inline-block;
    vertical-align: top;
    width: 74%;
    height: 80px;
    font-size: 15px;
    position: relative;
    padding-left: 5px;
  }
  .left-box{
    display: inline-block;
    vertical-align: top;
    width: 70px;
    height: 70px;
    background-color: #df4400;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    overflow: hidden;
  }
  .left-box img{
    max-width: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
  }
  .list-box{
    width: 96%;
    margin: 0 auto;
  }
  .list-box{ list-style: none}
  .square-item{
    display: inline-block;
    vertical-align: middle;
    width: 8px;
    height: 8px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
    background-color: #df4400;
  }
  .square-1{
    position: absolute;
    top: 20px;
    left: 10px;
  }
  .square-2{
    position: absolute;
    top: 20px;
    right: 10px;
  }
  .square-3{
    position: absolute;
    bottom: 20px;
    left: 10px;
  }
  .square-4{
    position: absolute;
    bottom: 20px;
    right: 10px;
  }
  .haoli-pic{
    width: 230px;
    position: absolute;
    top: -35px;
    left: 50%;
    margin: 0 0 110px -110px;
  }
  .box-header{
    width: 96%;
    color: #df4400;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    font-size: 15px;
  }
  .box-items{
    width: 90%;
    min-height: 400px;
    height: auto;
    border: 5px solid #df4400;
    -webkit-border-radius: 35px;
    -moz-border-radius: 35px;
    border-radius: 35px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    background-color: #fff;
    position: relative;
  }
  .luck-dracue p{
    font-size: 14px;
    color:#ff6724;
    font-weight:600;
    line-height:25px;
    padding-left:20px;
  }
  .luck-font{
    width: 91%;
    margin: 0 auto;
    font-size: 12px;
    color: #fff;
    background: url("../../../assets/images/mall/1.png") no-repeat;
    background-size: 100% 100%;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 25px;
    padding-bottom: 15px;
  }
  .luck-dracue{
    width:91%;
    margin:30px auto;
    height: 125px;
    background:url("../../../assets/images/mall/2.png") no-repeat;
    background-size:100% 100%;
    padding:30px 20px 20px 20px;
  }
  .turntable-box{
    width: 90%;
    height: 330px;
    margin-top: 190px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50px;
  }
  .font-title{
    margin-top: 183px;
    text-align: center;
    color: #ffd15b;
    font-size: 18px;
  }
  .share-box label:last-child{ padding-top: 0;margin-top: -5px;}
  .share-box label{
    display: block;
    padding-top: 12px;
  }
  .share-box{
    display: inline-block;
    position: fixed;
    top: 53px;
    right: 6px;
    z-index: 8;
    background-color: #FFE52A;
    color: #F26E31;
    width: 26px;
    height: 62px;
    line-height: 25px;
    text-align: center;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
  }
  .bg-box{
    background:url("../../../assets/images/mall/3.gif") no-repeat;
    width: 100%;
    height: 1132px;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    padding-top: 1px;
  }
  .LuckDraw{
    /*width: 100%;
    height: 100%;*/
  }
  a{
    text-decoration: none;
  }
  *{
    padding: 0;
    margin: 0;
  }

  @media screen and (min-width: 414px) {
    .luck-dracue{ width: 93%;}
    .left-box{
      width: 80px;
      height: 80px;
    }
  }

  /*iphone 5*/
  @media screen and (min-width: 320px) and (max-width: 374px) {
    .share-box{ width: 21px}
    .price-box{ margin: 1px 0;}
    .info-box{
      font-size: 14px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .left-box{
      width: 50px;
      height: 50px;
    }
    .right-box{ width: 80%;font-size: 12px}
    .go-btn{ top: 16px}
    .box-items{
      width: 94%;
    }
    .luck-font{
      padding-bottom: 8px;
    }
    .luck-dracue{
      width: 95%;
      height: 120px;
      padding: 20px 0px 0px;
      margin: 20px auto;
    }
  }
</style>
