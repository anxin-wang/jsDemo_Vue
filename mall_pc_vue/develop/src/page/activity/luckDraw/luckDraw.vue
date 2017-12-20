<template>
  <div class="luck-draw-container" ref="luckDrawContainer" >

    <div class="luck-draw-bg">
      <div><img src="../../../assets/images/luck-draw-bg/bg_01.jpg"></div>
      <div><img src="../../../assets/images/luck-draw-bg/bg_02.jpg"></div>
      <div><img src="../../../assets/images/luck-draw-bg/bg_03.jpg"></div>
      <div><img src="../../../assets/images/luck-draw-bg/bg_04.jpg"></div>
      <div><img src="../../../assets/images/luck-draw-bg/bg_05.jpg"></div>
      <div><img src="../../../assets/images/luck-draw-bg/bg_06.jpg"></div>
      <div><img src="../../../assets/images/luck-draw-bg/bg_07.jpg"></div>
      <div><img src="../../../assets/images/luck-draw-bg/bg_08.jpg"></div>
      <div><img src="../../../assets/images/luck-draw-bg/bg_09.jpg"></div>
      <div><img src="../../../assets/images/luck-draw-bg/bg_10.jpg"></div>
      <div><img src="../../../assets/images/luck-draw-bg/bg_11.jpg"></div>
    </div>

    <div class="luck-draw"  ref="luckDraw">

      <div class="turntable-box">
        <turntable @pointerInfo="pointerInfo"  @callbackInfo="callbackInfo"  @activityRule="activityRule"></turntable>
      </div>

      <div class="luck-item-1">
        活动期间，坚果理财所有注册绑卡用户皆可参与抽奖。每人仅限抽奖一次，100%中奖。加息券适用于平台除新手标以外的所有标的。加息券使用有效期至2018年6月1日。
      </div>

      <div class="luck-item-2">
        <p>坚果理财成交额已突破一亿!</p>
        <p>感谢新老用户对坚果的支持和信赖,</p>
        <p>坚果送上好礼,一起来狂欢吧!</p>
      </div>


      <div class="bg-new">

        <!-- 投资另有好礼相送 -->
        <div class="box-items">
          <img class="haoli-pic" src="../../../assets/images/luck-draw-bg-news-1.png"/>
          <i class="square-item square-1"></i> <i class="square-item square-2"></i><i
          class="square-item square-3"></i><i class="square-item square-4"></i>
          <div class="box-header">
            活动期间累积年化投资如以下金额,即可获得以下相应奖品。
          </div>
          <ul class="list-box clear">
            <li v-for="item in awards">
              <div class="left-box">
                <img :src="require('../../../assets/images/luck-draw-award-'+item.id+'.png')"/>
              </div>
              <div class="right-box">
                <div class="name-box nowrap">{{ item.name }}</div>
                <span class="price-box">原价<label class="padding-left-5">{{ item.original_price }}元</label></span>
                <router-link class="go-btn" @click.native="toDealsLink" to="#">去投资</router-link>
                <div class="info-box">活动期间累积投资年化≥{{ item.info }}万</div>
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
          <img class="haoli-pic" src="../../../assets/images/luck-draw-bg-news-2.png"/>
          <i class="square-item square-1"></i> <i class="square-item square-2"></i><i
          class="square-item square-3"></i><i class="square-item square-4"></i>
          <div class="info-font-box">
            <div>活动时间：</div>
            <div class="mark-font">
              {{activityInfo.start_time | newDateTime}} -- {{activityInfo.end_time | newDateTime}}
            </div>
            <div>活动规则：</div>
            <div v-html="activityInfo.activity_rule"></div>
          </div>
        </div>
        <!--／. 活动规则 -->

      </div>

      <div  v-show="showBox" class="bg-container" :class="{'none-bg': box == 1}"></div>

      <Modal id="luck-draw" v-model="showBox" class-name="luck-draw-msg">
        <!-- 弹框 -->

          <i @click="closeBox()" v-show="showBox" class="close-box" slot="close"></i>

          <div class="bg-sub-pic" v-if="box == 1"></div>

          <!-- 中奖百分比弹框 -->
          <div class="msg-content bg-msg-pic" v-if="box == 1">
            <span class="bg-msg-num">{{luckInfo}}</span>
          </div>
          <!-- 中奖百分比弹框 -->

          <!-- 没机会 -->
          <div class="msg-content bg-none-pic" v-if="box == 2"></div>
          <!--/. 没机会 -->

          <!-- 去绑定 -->
          <div class="msg-content bg-bind-pic" v-if="box == 3">
            <!--<router-link class="bg-go-btn" to="#"></router-link>-->
          </div>
          <!-- 去绑定 -->

          <!-- 去注册 -->
          <div class="msg-content bg-register-pic" v-if="box == 4">
            <router-link  class="bg-go-register-btn"  @click.native="toLoginLink" to="#"></router-link>
          </div>
          <!--/. 去注册 -->

          <!-- 此时抽奖的人太多，休息一会儿再试试吧 -->
          <div class="msg-content bg-none-much" v-if="box == 5"></div>
          <!--/. 此时抽奖的人太多，休息一会儿再试试吧 -->

          <!-- 活动结束 -->
          <div class="msg-content bg-none-end" v-if="box == 6"></div>
          <!--/. 活动结束 -->

          <!-- 未有活动 -->
          <div class=" msg-content bg-none-NotActivity" v-if="box == 7"></div>
          <!--/. 未有活动 -->

          <!-- 活动未开始 -->
          <div class="msg-content bg-none-notStart" v-if="box == 8"></div>
          <!--/. 活动未开始 -->
      </Modal>
    <!--／. 弹框 -->



    </div>

    <Spin></Spin>
  </div>




</template>

<script>
  import turntable from './turntable.vue';
  import { uc_center } from  '../../../service/getData';
  export default {
    data() {
      return {
        awards: [
          {
            id: 1,
            name: 'iPhoneX 256G',
            original_price: 9688,
            info: '70'
          }, {
            id: 2,
            name: 'iPhoneX 256G',
            original_price: 6688,
            info: '50'
          }, {
            id: 3,
            name: 'iPhoneX 256G',
            original_price: 5888,
            info: '45'
          }, {
            id: 4,
            name: 'iPhoneX 256G',
            original_price: 3488,
            info: '25'
          }, {
            id: 5,
            name: 'Apple watch series 3 GPS',
            original_price: 2588,
            info: '20'
          }
        ],
        showBox: false, //显示弹框(默认false 不显示)
        box: "1", //(1:显示抽中弹框,2:没机会弹框,3:绑定弹框,4:去注册弹框,5:抽奖人太多,6：活动结束,7.未有活动,8:活动未开始)
        LoginInfo:false,
        luckInfo:"",
        activityInfo:[]
      }
    },
    components: {
      turntable
    },
    computed: {
      baseUrl: function () {
        return window.location.origin
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

      console.log(window.location.origin)
    },
    updated () {
      let height = this.$refs.luckDraw.offsetHeight;
      this.$refs.luckDrawContainer.style.height= height+'px';
    },
    methods: {
      /*获取用户信息*/
      info () {

        uc_center("uc_center").then(res => {

          if(res.response_code == 0){
            this.LoginInfo = false
          }else{
            this.LoginInfo = true
          }
        })
      },
      toDealsLink () {
        window.location.href=window.location.origin+'/index.php?ctl=deals';
      },
      toLoginLink () {
        window.location.href=window.location.origin+'/index.php?ctl=user&act=login';
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



      /*抽奖返回 抽奖信息的name和value*/
      callbackInfo(data){
        this.luckInfo = data.name
        this.showBox = true
      },

      /*抽奖返回 抽奖信息*/
      pointerInfo(data){
        console.log(data)
        if(data.show_err_code == undefined){
          this.box = 1
        }
        //活动未开始
        if(data.show_err_code == 1){
          this.showBox = true
          this.box = 8
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
      }
    },

    filters:{
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
<style>

  .luck-draw-msg .ivu-modal {
    background: none;
    top: 50%;
    left: 32%;
    transform: translate(0%,-50%);
  }
  .luck-draw-msg .ivu-modal-content{
    background: none;
  }
  .luck-draw-msg .ivu-modal-close{
    position:relative;
    right: -580px;
  }



</style>
<style scoped lang="less">

  @primary-color: #df4400;

  .luck-draw-container {
    background-color: #ff6924;
  }

  .luck-draw {
    position: absolute;
    width: 1200px;
    top: 0px;
    left: 50%;
    -webkit-transform: translate(-50%, 0%);
    -moz-transform: translate(-50%, 0%);
    transform: translate(-50%, 0%);
  }

  .turntable {
    width: 500px;
    height: 780px;
  }

  .luck-draw-bg {
    width: 100%;
    height: 100%;
  }

  .luck-draw-bg img {
    width: 100%;
  }

  .luck-item-1 {
    background: url("../../../assets/images/luck-draw-item-bg.png") no-repeat;
    background-size: cover;
    padding: 50px;
    color: #fff;
  }

  .luck-item-2 {
    background: url("../../../assets/images/luck-draw-item-bg-2.png") no-repeat;
    background-size: cover;
    text-indent: -9999px;
    padding: 58px;
    margin-top: 100px;
  }

  .bg-new {
    background-color: #ff6724;
    padding-bottom: 50px;
  }

  .box-items {

    height: auto;
    border: 5px solid @primary-color;
    -webkit-border-radius: 35px;
    -moz-border-radius: 35px;
    border-radius: 35px;
    margin-top: 100px;
    background-color: #fff;
    position: relative;
    padding: 0 45px;
  }

  .haoli-pic {
    width: 380px;
    position: absolute;
    top: -58px;
    left: 50%;
    margin: 0 0 0 -190px;
  }

  .square-item {
    display: inline-block;
    vertical-align: middle;
    width: 8px;
    height: 8px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
    background-color: @primary-color;
  }

  .square-1 {
    position: absolute;
    top: 30px;
    left: 30px;
  }

  .square-2 {
    position: absolute;
    top: 30px;
    right: 30px;
  }

  .square-3 {
    position: absolute;
    bottom: 30px;
    left: 30px;
  }

  .square-4 {
    position: absolute;
    bottom: 30px;
    right: 30px;
  }

  .box-header {
    width: 100%;
    color: @primary-color;
    margin-top: 60px;
    font-size: 16px;
  }

  .list-box {
    width: 100%;
    margin-top: 40px;
    list-style: none;
    li {
      margin-bottom: 20px;
      float: left;
      width: 50%;
    }
  }

  .right-box {
    display: inline-block;
    vertical-align: top;
    width: 80%;
    height: 80px;
    font-size: 15px;
    position: relative;
    padding-left: 5px;
  }

  .left-box {
    display: inline-block;
    vertical-align: top;
    width: 70px;
    height: 70px;
    background-color: @primary-color;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    overflow: hidden;
  }

  .left-box img {
    max-width: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
  }

  .name-box {
    color: #4f4f4f;
  }

  .price-box {
    display: inline-block;
    position: relative;
    margin: 5px 0;
    font-size: 12px;
    :before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 8px;
      left: 0;
      width: 62px;
      border: 1px solid @primary-color;
      -webkit-transform: rotate(8deg);
      -moz-transform: rotate(8deg);
      -ms-transform: rotate(8deg);
      -o-transform: rotate(8deg);
      transform: rotate(8deg);
    }
  }

  .go-btn {
    display: inline-block;
    width: 80px;
    height: 28px;
    line-height: 25px;
    text-align: center;
    color: #df4400;
    border: 2px solid #df4400;
    border-radius: 20px;
    position: absolute;
    right: -2px;
    top: 22px;
    font-weight: bold;
  }

  .info-box {
    color: @primary-color;
    font-size: 13px;
  }

  .mark-box {
    font-size: 14px;
    width: 100%;
    padding-bottom: 50px;
  }

  .turntable-box {
    margin-top: 500px;
  }

  .msg-content {
    width: 400px;
    height: 433px;
    position: absolute;
    top: 9%;
    left: 50%;
    -webkit-background-size: 100%;
    background-size: 100%;
    background-repeat: no-repeat;
    margin: 0 0 125px -125px;
  }

  .bg-msg-pic{
    background-image: url("../../../assets/images/luck-draw-msg/4.png");

  }
  .bg-sub-pic{
    background-image: url("../../../assets/images/luck-draw-msg/5.png") ;
  }
  .bg-none-NotActivity{
    background-image: url("../../../assets/images/luck-draw-msg/NotActivity.png") ;
  }
  .bg-none-notStart{
    background-image: url("../../../assets/images/luck-draw-msg/13.png") ;
  }
  .bg-none-end{
    background-image: url("../../../assets/images/luck-draw-msg/activityEnd.png") ;
  }
  .bg-none-much{
    background-image: url("../../../assets/images/luck-draw-msg/activitymuch.png") ;
  }
  .bg-none-pic{
    background-image: url("../../../assets/images/luck-draw-msg/7.png") ;
  }
  .bg-bind-pic{
    background-image: url("../../../assets/images/luck-draw-msg/9.png") ;
  }
  .bg-register-pic{
    background-image: url("../../../assets/images/luck-draw-msg/11.png") ;
  }
  .none-bg{
    background: url("../../../assets/images/luck-draw-msg/bgpng.png") 10px 30px no-repeat;
    -webkit-background-size:100%;
    background-size: 100%;
  }

  .bg-go-register-btn{
    display: inline-block;
    background: url("../../../assets/images/luck-draw-msg/12.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    width: 140px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 40px 0 70px -60px;
  }

  .close-box{
    display: block;
    width: 25px;
    height: 25px;
    background: url("../../../assets/images/luck-draw-msg/6.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    cursor: pointer;
    position: absolute;
    right: 40px;
    top: 120px;
    z-index: 33333;
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

  .bg-msg-num{
    display: inline-block;
    color: #ff6a29;
    font-size: 21px;
    position: absolute;
    bottom: 31%;
    left: 38%;
  }

  .info-font-box{
    color: #333333;
    width: 96%;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    font-size: 14px;
    padding-bottom: 39px;
  }

  .mark-font{ color: #df4400;margin-bottom: 18px;}


</style>
