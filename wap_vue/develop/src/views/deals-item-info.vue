<template>
  <div class="deals-item-info" v-show="showPage">
    <!-- 预期年化收益 -->
    <section class="section-1">
      <div class="section-1-item">
        <p>预期年化收益<em class="is-new-small" v-if="is_new == 1">新手专享</em></p>
        <p>{{ fact_rate == 0 ? rate : fact_rate }}<span>%</span><span class="float-rate">+{{ float_rate }}%</span></p>
      </div>

      <div class="section-1-item">
        <p>期限</p>
        <p>{{ repay_time }}<i>天</i></p>
      </div>
    </section>

    <!--/. 预期年化收益 -->

    <section class="section-2">
      <div class="section-2-item rule-info">


        <div class="CirclePercent">

          <p>
            <canvas></canvas>
          </p>

        </div>


      </div>
      <div class="section-2-item rule-info">
        <p><em>{{ need_money }}</em>/{{ borrow_amount | filterMoney }}</p>
        <p>可投金额/项目总额</p>
      </div>


    </section>

    <!-- 进度条 -->
    <!--<div class="line-progress">-->

    <!--<div class="line-progress-item">-->
    <!--<mt-progress :value="progress_point">-->
    <!--<div slot="start">已投 {{ progress_point }}%</div>-->
    <!--<div slot="end">剩余可投<span>{{ need_money }}</span>元</div>-->
    <!--</mt-progress>-->
    <!--</div>-->

    <!--</div>-->
    <!--/. 进度条 -->
    <div class="progress-title">投资状态</div>
    <section class="progressbar-box">
      <ul id="progressbar">
        <li :class="[{'active': deal_status == 1 || deal_status == 2 || deal_status == 5}]">

          <p>{{ min_loan_money | filterMoney }}起投</p>
        </li>
        <li :class="[{'active': deal_status == 2 || deal_status == 5}]">
          <p>成立</p>

        </li>
        <li :class="[{'active': deal_status == 5}]">

          <p>还本付息</p>
        </li>
      </ul>
    </section>

    <div class="timebox">
      <div class="timebox-l">起始日期:{{ create_time_format }}</div>
      <div class="timebox-r">剩余时间: {{ remain_time_format }}</div>
    </div>

    <!-- 项目列表 -->
    <section class="item-list">
      <ul>
        <li>
          <router-link :to="{ path: '/contract/'+ id + '/' + deal_sn}">
            <div><span>电子合同</span><span>真实合法有效</span></div>
            <div><img src="../assets/images/investment/column-1.png"/></div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ path: '/investors/' + id }">
            <div><span>投资人数</span><span>{{ buy_count }}人已投资</span></div>
            <div><img src="../assets/images/investment/column-2.png"/></div>
          </router-link>
        </li>
        <li @click="description()">
          <router-link to="/proIntroduceDetail">


            <div><span>产品详情</span><span>产品详细资料</span></div>
            <div><img src="../assets/images/investment/column-3.png"/></div>
          </router-link>
        </li>
        <li @click="description()">
          <router-link to="/proIntroduceRisk">


            <div><span>风险控制</span><span>安全稳健</span></div>
            <div><img src="../assets/images/investment/column-4.png"/></div>
          </router-link>
        </li>
        <li @click="description()">
          <router-link to="/proIntroduceInfo">


            <div><span>相关资料</span><span>相关合同等</span></div>
            <div><img src="../assets/images/investment/column-5.png"/></div>
          </router-link>
        </li>
        <li @click="description()">
          <router-link to="/proIntroduceStructure">


            <div><span>交易结构</span><span>产品结构流程</span></div>
            <div><img src="../assets/images/investment/column-6.png"/></div>
          </router-link>
        </li>
        <!--<li><a href="javascript:void(0);" @click="saveUrl(fresUrl)">免责声明</a></li>-->
        <router-link id="disclaimer" to="/disclaimer"></router-link>
      </ul>
      <!--<div>-->
      <!--<div>-->
      <!--<span></span>-->
      <!--<span></span>-->
      <!--</div>-->
      <!--<div></div>-->
      <!--<div></div>-->
      <!--</div>-->
    </section>
    <!--/. 项目列表 -->

    <!-- <p class="copy-box">
       <span class="copy-logo line"></span>
       <span>平台账户资金由富友托管</span>
     </p>-->

    <template v-if="progress_point >= 100 ">
      <section class="footer" style="background-color: #D9D9D9">
        <span class="jisuanqi line"></span>
        <span class="btn-box">已成立</span>
      </section>
    </template>
    <template v-if="progress_point < 100 ">
      <!-- 底部 -->
      <section class="footer">
        <span class="jisuanqi line" @click="calculator()"></span>
        <span class="btn-box" @click="investments()"><!--<router-link to="/investment">-->立即投资
          <!--</router-link>--></span>
        <router-link id="subInvestment" :to="{ path: forUrl }"></router-link>
      </section>
      <!--/. 底部 -->

      <!-- 计算器 -->
      <div class="bg-box" :class="{'hidde': jisuan}" @click.stop="closeCalculator()"></div>
      <section class="jisuanqi-box" :class="{'hidde': jisuan}">
        <div class="jisuanqi-header">
          <h4>计算器</h4>
          <span @click="closeCalculator()"><i class="ivu-icon ivu-icon-close-round"></i></span>
        </div>
        <div class="jisuanqi-center">
          <div class="input-field">
            <label for="money">投资金额</label>
            <input id="money" placeholder="请输入投资金额" v-model="shouyi"/>
            <span class="yuan">元</span>
            <span class="close-icon" :class="[{'hide': shouyi == 0 }]" @click="clearYqsy()">
            <i class="ivu-icon ivu-icon-close-circled"></i>
          </span>
          </div>
          <div class="jisuanqi-c-1">
            <div class="line">投资期限 <span>{{ repay_time }}天</span></div>
            <div class="line">预期年化收益 <span>{{ rate }}%</span></div>
          </div>
          <p class="jisuanqi-c-2">到期自动转入可用余额</p>
        </div>
        <div class="jisuanqi-footer">
          <div class="line">预计收益</div>
          <div class="line">{{ yqsy }}<span>元</span></div>
        </div>
      </section>
      <!--/. 计算器 -->
    </template>


  </div>
</template>
<script>
  export default {
    name: 'dealsItemInfo',


    computed: { //计算属性
      yqsy() { //收益
        let money = Number(this.shouyi) * (Number(this.rate) / 100) / 360 * Number(this.repay_time);
        if (money.toString().indexOf(".") > -1) {
          let lenth = money.toString().split(".")[1].length;
          if (lenth >= 4) {
            return money.toFixed(4)
          }
        } else {
          return money.toFixed(2)
        }
      }
    },
    data() {
      return {
        forUrl: '/investment',
        progess: 50,
        jisuan: true,
        list: [],
        rate: '',
        borrow_amount: '',
        borrow_amount_format: '',
        is_new: '',
        repay_time: '',
        min_loan_money: '',
        progress_point: 0,
        need_money: '',
        buy_count: 0,
        deal_status: 0, //0:待审中 1:融资中 2:满标 3:流畅 4:还款中 5:已兑付
        app_description: '',//产品详情
        risk_security: '',//风险控制
        app_deal_structure: '',//交易结构
        datadisclosure: '',//资料纰漏
        shouyi: 0.00,
        remain_time_format: null,
        create_time_format: null,
        id: 0,
        deal_sn: '',
        fact_rate: '',
        float_rate: '',
        fresUrl: '/wap/index.php?ctl=apphtml/disclaimer',
        showPage: false
      }
    },
    mounted() {
     this.$nextTick(function () {
        this.info();
      })




    },
    methods: {
      saveUrl(url) {
        storeWithExpiration.set("DISCLAIMER", url);
        document.getElementById("disclaimer").click();
      },
      investments() {
        let _that = this
        let Base64 = require('js-base64').Base64
        let Url = '/mapi2/index.php?&act=uc_center'
        let formData = new FormData();
        formData.append("email", storeWithExpiration.get('user_name'));
        formData.append("pwd", storeWithExpiration.get('user_pwd'));
        _that.$http.post(Url, formData)
          .then(response => {
            var response = JSON.parse(Base64.decode(response.data));
            if (response.response_code == 1) {
              let info = JSON.stringify(this.list);
              storeWithExpiration.set('DEALIST', info);
              this.forUrl = this.forUrl + '/' + this.id;
              setTimeout(function () {
                document.getElementById("subInvestment").click();
              }, 50)
            } else {
              this.forUrl = "/login";
              setTimeout(function () {
                document.getElementById("subInvestment").click();
              }, 50)
            }
          }, response => {

          })
      },
      clearYqsy() {
        this.shouyi = 0;
      },


      waveball(progress_point) {
        $(".CirclePercent p").each(function (key) {
          // 定义canvasID
          $(this).children().attr("id", "me-skill" + key)


          // 获取canvasID
          var CanvasAttrId = $(this).children().attr("id")
          // 获取进度
          var NowRange = progress_point
          //边框颜色组
          var canvasBg = ["#feab2f"];

          // if (NowRange <= 50) {
          //   var FontColor = "#F4AC31"
          // } else if (NowRange >= 50) {

            var FontColor = "#fff"
          // }

          var CanvasId = [
            document.getElementById(CanvasAttrId)
          ]

          // 画布属性
          var mW = CanvasId.width = 80;//宽度
          var mH = CanvasId.height = 80;//高度
          var lineWidth = 2;
          //画圆心
          var r = mH / 2; //圆心

          var cR = r - 2 * lineWidth;

          //Sin 曲线属性
          var sX = 0;
          var sY = mH / 2;
          var axisLength = mW; //轴长
          var waveWidth = 0.055; //波浪宽度,数越小越宽


          var waveHeight = 5; //波浪高度,数越大越高
          var speed = 0.09; //波浪速度，数越大速度越快
          var xOffset = 0; //波浪x偏移量

          // 画圈函数
          var IsdrawCircled = false;

          //画sin 曲线函数
          var drawSin = function (xOffset) {
            ctx.save();
            var points = []; //用于存放绘制Sin曲线的点
            ctx.beginPath();
            //封闭路径
            //在整个轴长上取点
            for (var x = sX; x < axisLength; x += 20 / axisLength) {
              //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
              var y = -Math.sin((sX + x) * waveWidth + xOffset);

              var dY = mH * (1 - NowRange / 100);


              points.push([x, dY + y * waveHeight]);
              ctx.lineTo(x, dY + y * waveHeight);
            }
            //封闭路径
            ctx.lineTo(axisLength, mH);
            ctx.lineTo(sX, mH);
            ctx.lineTo(points[0][0], points[0][1]);


            ctx.fillStyle = canvasBg[i];
            ctx.fill();
            ctx.restore();
          }

          var insctx = function () {
            //内实心圈
            ctx.beginPath();
            ctx.arc(r, r, 20, 0, Math.PI * 2);
            ctx.fillStyle = canvasBg[i];
          }
          //文字
          var insText = function () {


            ctx.save();
            ctx.fillStyle = FontColor;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "12px Microsoft Yahei";
            ctx.fillText(NowRange + "%", r, r);
            ctx.restore();
          };

          //动画
          var render = function () {



            ctx.clearRect(0, 0, mW, mH);
            drawSin(xOffset);
            insctx();//执行内圆
            insText();//执行文字
            xOffset += speed;
            requestAnimationFrame(render);
          }

          // 循环4个canvas

          for (var i = 0; i < CanvasId.length; i++) {
            CanvasId[i].width = mW;
            CanvasId[i].height = mH;
            var ctx = CanvasId[i].getContext("2d");
            ctx.beginPath();
            ctx.arc(r, r, cR + 1, 0, Math.PI * 2);

            ctx.strokeStyle = canvasBg[i];
            ctx.lineWidth = lineWidth;
            ctx.stroke();//画空心圆
            ctx.beginPath();
            ctx.arc(r, r, cR, 0, 2 * Math.PI);
            ctx.clip();

            insText(); //执行文字
            drawSin(xOffset);//执行波浪
            render()//执行动画
          }
        })
      },

      description() {
        storeWithExpiration.set('APPDESCRIPTION', this.app_description);
        storeWithExpiration.set('RISKSECURITY', this.risk_security);
        storeWithExpiration.set('APPDEALSTRUCTURE', this.app_deal_structure);
        storeWithExpiration.set('DATADISCLOSURE', JSON.stringify(this.datadisclosure));
      },
      info() {
        let id = this.$route.params.id;
        let Base64 = require('js-base64').Base64;
        if (id != null && id != "") {
          let url = '/mapi2/index.php?&act=deal_mobile&id=' + id;
          this.$http.get(url)
            .then(response => {
              let res = JSON.parse(Base64.decode(response.data));
              this.showPage = true;
              this.list = res;
              this.rate = res.deal.rate;
              this.fact_rate = res.deal.fact_rate;
              this.float_rate = res.deal.float_rate;
              this.borrow_amount = res.deal.borrow_amount;
              this.borrow_amount_format = res.deal.borrow_amount_format;
              this.repay_time = res.deal.repay_time;
              this.is_new = res.deal.is_new;
              this.min_loan_money = res.deal.min_loan_money;
              this.progress_point = res.deal.progress_point;
              this.need_money = res.deal.need_money;
              this.buy_count = res.deal.buy_count;
              this.deal_status = res.deal.deal_status;
              this.app_description = res.deal.app_description;
              this.datadisclosure = res.deal.datadisclosure;
              this.create_time_format = res.deal.create_time_format;
              this.remain_time_format = res.deal.remain_time_format;


              this.risk_security = res.deal.risk_security;
              this.app_deal_structure = res.deal.app_deal_structure;

              this.id = res.deal.id;
              this.deal_sn = res.deal.deal_sn;
              this.setTitle(res.deal.name);
              if ((res.deal.deal_status == 2) && res.deal.deal_sn != null) {
                storeWithExpiration.set('SHOWPDF', 1);
                return false;
              } else {
                storeWithExpiration.set('SHOWPDF', 0);
              }


              //波纹球
              this.waveball(res.deal.progress_point)



            }, response => {

            })
        }
      },
      closeCalculator() {
        this.jisuan = true;
      },

      calculator() {
        this.jisuan = false
      },
      setTitle(title) {//设置头部
        let obj = this.$route.matched[1];
        obj.meta.Title = title;
      },

    },
    filters: {
      filterMoney(money) {//过滤金额 100000 = 1万
        if (money <= 100000) {

          var n = 2 > 0 && 2 <= 20 ? 2 : 2;
          money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
          var l = money.split(".")[0].split("").reverse(), r = money.split(".")[1];
          var t = "";
          for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
          }
          return t.split("").reverse().join("") + "." + r + '元';


          //return Number(money).toFixed(2)+"元";
        } else {
          let m = money / 10000;
          var x = m.toFixed(2).toString()
          var y = x + "万"
          return y
        }
      }
    }
  }
</script>
<style>
  * {
    font-family: PingFangSC-Medium, sans-serif;
  }

  .mt-progress-progress {
    background: -webkit-linear-gradient(left, #f4ad31, #f4ad31);
  }
</style>
<style scoped>
  .timebox-r {
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 30px;
  }

  .timebox-l {
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 30px;
  }


  .timebox {
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .progress-title {
    font-size: 18px;
    font-weight: bold;
    margin-top: -13px;
    padding-top: 10px;
    background-color: #fff;
    padding-left: 20px;
  }

  .is-new-small {
    font-size: 12px;
    border: 1px solid #fff;
    display: inline-block;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    padding: 0 5.5px;
    margin-left: 5.5px;
  }

  .btn-box {
    display: inline-block;
    width: 150px;
  }

  .is-fixed {
    z-index: 0 !important;
  }

  .deals-item-info {
    font-family: "微软雅黑体";
    background-color: #F5F5F5;
    position: fixed;
    top: 44px;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-bottom: 100px;

  }

  .footer a {
    color: #fff;
  }

  .hidde {
    display: none;
  }

  .hide {
    display: none !important;
  }

  .jisuanqi-center {
    border-top: 1px solid #e9e9e9;
    padding-top: 10px;
  }
  .CirclePercent{
    position: absolute;
    top: -30px;
    left: 30px;
  }

  .jisuanqi-header {
    text-align: center;
    padding: 10px 0;
    position: relative
  }

  .jisuanqi-header span {
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 12.5px;
    width: 20px;
    height: 20px;
  }

  .jisuanqi-footer {
    position: relative;
    overflow: hidden;
  }

  .jisuanqi-footer div:last-child {
    position: absolute;
    right: 18.5px;
    top: 0;
    color: #f5ad34;
    padding: 4.5px 0;
    font-size: 25px;
  }

  .jisuanqi-footer div:first-child {
    margin-left: 10px;
    padding: 10px 0;
  }

  .input-field {
    position: relative;
  }

  .close-icon {
    position: absolute;
    top: 6.3px;
    z-index: 55;
    right: 35px;
    color: #e8e8e8;
  }

  .close-icon i {
    display: inline-block;
    font-size: 28px;
  }

  .input-field input:focus {
    outline: none;
    border: 2px solid #f4ad31;
    -webkit-transition: border .25s linear;
    -moz-transition: border .25s linear;
    -ms-transition: border .25s linear;
    -o-transition: border .25s linear;
    transition: border .25s linear;
    padding-left: 10px;
  }

  /*.input-field input:focus ~ span.close-icon{ display: block;}*/
  .input-field input {
    width: 70%;
    height: 40px;
    border: 0;
    font-size: 14px;
    transition: background 0.3s ease-in-out;
    -webkit-border-radius: 3.5px;
    -moz-border-radius: 3.5px;
    border-radius: 3.5px;
  }

  .yuan {
    display: inline-block;
    position: absolute;
    right: 65px;
    top: 6.5px;
  }

  .input-field label {
    padding-left: 10px;
    padding-right: 10px
  }

  .jisuanqi-c-2 {
    text-align: right;
    color: #999999;
    padding-right: 18.5px;
    font-size: 14px;
    padding-bottom: 10px;
    margin-left: 10px;
    border-bottom: 1px solid #e9e9e9;
  }

  .jisuanqi-c-1 {
    position: relative;
    margin: 10px 0
  }

  .jisuanqi-c-1 div:first-child {
    margin-left: 10px;
  }

  .jisuanqi-c-1 div:last-child {
    position: absolute;
    right: 18.5px;
    top: 0;
  }

  .jisuanqi-box {
    position: fixed;
    width: 100%;
    height: 220px;
    background-color: #fff;
    color: #333333;
    font-size: 17.5px;
    bottom: 0;
    left: 0;
    z-index: 88889;
  }

  .bg-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .2);
    z-index: 88888;
  }

  .copy-box {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 15px;
  }

  .line {
    display: inline-block;
    vertical-align: middle;
  }

  .jisuanqi {
    margin-top: 16px;
    margin-left: 10px;
    width: 28px;
    height: 28px;
    background: url("../assets/images/investment/jisuanqi.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    position: absolute;
    left: 0;
  }

  .copy-logo {
    width: 15px;
    height: 15px;
    background: url("../assets/images/investment/tianfu.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .footer {
    width: 100%;
    height: 55px;
    line-height: 55px;
    background-color: #f4ad31;
    position: fixed;
    left: 0;
    bottom: 0;
    text-align: center;
    font-size: 17.5px;
    color: #fff;
  }

  .person-num {
    color: #f6b040;
    float: right;
    margin-right: 30px
  }

  .person-num span {
    color: #a5a5a5;
    padding-left: 10px;
  }

  /*.item-list ul li:before{*/
  /*content: "";*/
  /*display: inline-block;*/
  /*width: 10px;*/
  /*height: 15px;*/
  /*position: absolute;*/
  /*right: 10px;*/
  /*top: 10px;*/
  /*background: url("../assets/images/left.png") no-repeat;*/
  /*-webkit-background-size: 100% 100%;*/
  /*background-size: 100% 100%;*/
  /*}*/
  .item-list ul li a {
    display: block;
    width: 100%;
    font-size: 14px;
    color: #333;
    overflow: hidden;
    padding: 2% 7%;
    line-height: 80px;
  }



  .item-list ul li a div span {
    display: block;
    height: 27px;
    font-size: 14px;
    color: #999;
    line-height: 55px;
  }

  .item-list ul li a div span:first-child {
    font-size: 18px;
    color: #333;
    font-weight: bold;
  }

  .item-list ul li a div {
    width: 36%;
    display: inline-block;
    float: left;

  }

  .item-list ul li a div:first-child {
    width: 64%;
    text-align: left;
  }

  .item-list ul li a div:last-child {
    text-align: right;
  }

  .item-list ul li a div img {
    width: 60px;
  }

  .item-list ul li a:active, .item-list ul li a:hover {
    color: #333;
  }

  .item-list ul {
    margin-left: 10px;
    display: -webkit-flex;
    display: flex;
    flex-wrap: wrap;
  }

  .item-list ul li {
    position: relative;
    height: 90px;
    line-height: 90px;
    border-bottom: 1px solid #ededed;
    width: 48%;
    display: block;
    margin-top: 10px;
    background: #fff;
    margin-right: 2%;
    border-radius: 5%;
  }

  .item-list ul {
    list-style: none;



    /*.item-list{ background-color: #fff;}*/
    /*.progressbar-box{ background-color: #fff;position: relative;z-index: -2}*/
    /*.progressbar-box p:first-child{*/
    /*margin-bottom: 20px;*/


  }

  .progressbar-box {
    background-color: #fff;
    position: relative;
    z-index: -2
  }




  .progressbar-box p:first-child {
    margin-bottom: 20px;
  }

  .progressbar-box p:first-child {
    margin-bottom: 20px;
  }

  /*progressbar*/
  #progressbar {
    overflow: hidden;
    height: 80px;
  }

  #progressbar li {
    list-style-type: none;
    color: #999999;
    text-transform: uppercase;
    font-size: 9px;
    width: 33.33%;
    float: left;
    position: relative;
    top: 20px;
    text-align: center;
  }

  #progressbar li.active p {
    color: #f5af36;
  }

  /*progressbar connectors*/
  #progressbar li:after {
    content: '';
    width: 100%;
    height: 2px;
    background: #d9d9d9;
    position: absolute;
    left: -50%;
    top: 9px;
    z-index: -1;
  }

  #progressbar li:first-child:after {
    content: none;
  }

  #progressbar li:first-child:before {
    background: url("../assets/images/investment/state_1.png") no-repeat;
    background-size: contain;
    -webkit-background-size: contain;

  }

  #progressbar li:nth-child(2):before {
    background: url("../assets/images/investment/state_2.png") no-repeat;
    background-size: contain;
    -webkit-background-size: contain;
  }

  #progressbar li:last-child:before {
    background: url("../assets/images/investment/state_3.png") no-repeat;
    background-size: contain;
    -webkit-background-size: contain;
  }

  #progressbar li.active:first-child:before {
    background: url("../assets/images/investment/state_1_h.png") no-repeat;
    background-size: contain;
    -webkit-background-size: contain;

  }

  #progressbar li.active:nth-child(2):before {
    background: url("../assets/images/investment/state_2_h.png") no-repeat;
    background-size: contain;
    -webkit-background-size: contain;
  }

  #progressbar li.active:last-child:before {
    background: url("../assets/images/investment/state_3_h.png") no-repeat;
    background-size: contain;
    -webkit-background-size: contain;
  }

  #progressbar li:before {
    content: "";
    width: 40px;
    height: 40px;
    display: block;
    margin: -10px auto 5px auto;
  }

  #progressbar li.active:first-child:before {

  }

  #progressbar li.active:after {
    background: #f5af36;
    color: white;
  }

  .line-progress-item {
    margin: 0 15px;
  }

  .line-progress {
    background-color: #fff;
    height: 50px;
  }

  .mt-progress div:last-child span {
    color: #f5af36;
    display: inline-block;
    padding: 0 5px;
  }

  .mt-progress div:last-child {
    position: absolute;
    top: 15px;
    right: 0px;
    font-size: 14px;
    color: #999;
  }

  .mt-progress div:first-child {
    position: absolute;
    left: 0;
    top: 15px;
    font-size: 14px;
    color: #999;
  }

  .rule-info p:last-child {
    color: #999;
    font-size: 13px;
  }

  .rule-info p:first-child {
    color: #999;
    font-size: 16px;
    margin-top: 5px;
  }

  .section-2 {
    display: -webkit-flex; /* Safari */
    display: flex;
    background: url("../assets/images/investment/bg_2.png");
    width: 100%;
    height: 70px;
    line-height: 30px;
    font-size: 15px;
    color: #999;
    background-size: cover;
    -webkit-background-size: cover;
    top: -25px;
    position: relative;
  }

  .section-2-item {
    -webkit-flex-grow: 1;
    flex-grow: 1;
    margin: 0;
    padding-top: 7px;
    text-align: center;
  }

  .section-2-item em {
    color: #f5af36;
    font-size: 20px;

  }

  .section-1 p:last-child span {
    display: inline-block;
    font-size: 20px;
    margin-left: 5px;
  }

  .section-1 p:last-child {
    font-size: 35px;
  }

  .section-1 p:first-child {
    font-size: 20px;
    margin-top: 20px;
    padding-left: 20px;
  }

  .section-1 {
    color: #fff;
    text-align: center;
    display: flex;
    height: 160px;
    padding-left: 25px;
    background: url(../assets/images/investment/bg_1.png);
    background-size: contain;
    overflow: hidden;
  }

  .section-1-item {
    margin-left: 25px;
  }

  .section-1-item i {
    font-size: 20px;
  }

  @media screen and (min-width: 320px) and (max-width: 374px) {
    .deals-item-info {
      padding-bottom: 80px;
    }

    .footer {
      height: 40px;
      line-height: 40px;
    }

    .jisuanqi {
      margin-top: 7px;
    }

    .input-field input {
      width: 65%;
    }

    .yuan {
      right: 55px;
    }

    .close-icon {
      right: 25px;
      top: 6.5px;
    }
  }
</style>
