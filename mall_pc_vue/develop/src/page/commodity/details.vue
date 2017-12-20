<template>
  <div name="details">
     <div class="basic-line">

       <Breadcrumb class="bread-box">
         <BreadcrumbItem href="/">积分商城</BreadcrumbItem>
         <BreadcrumbItem class="default-none">商品详情</BreadcrumbItem>
       </Breadcrumb>

       <div class="commodity-box">
           <div class="commodity-left line-bar-top">
              <!--<img src="../../assets/images/3.png"/>-->

             <!-- 默认图片 -->
             <img v-if="list.img == '' || list.img == null "  src="../../assets/images/image_err.gif"/>
             <!--/. 默认图片 -->

             <img :src="list.img | filterUrl">

           </div>
           <div class="commodity-right line-bar-top">
             <p class="commodity-right-header" v-text="list.name">通用1.0%理财加息卷</p>
             <p class="commodity-right-info">重要提示:产品如有质量问题或使用问题</p>
             <p class="commodity-right-info service-info">请拨打客服热线:{{ serviceData.shop_tel}}( {{serviceData.online_time}} )</p>
             <p>
               <span class="price">现价:</span>
               <span class="big-score">{{ list.scoreNum }}<label style="font-size: 12px">积分</label></span>
             </p>
             <p class="line-throughs">市场价:{{ list.market_price }}元</p>
             <div class="exchange-box">
               <div class="line-bar num-box">
                 <input class="left" type="text" v-model="value1" readonly/>
                 <div class="right">
                   <span class="plus" @click="plus()">+</span>
                   <span class="reduce" :class="{'none-cursor': value1 == 1}" @click="reduce()">-</span>
                 </div>
               </div>
               <a class="exchange--btn" @click="exchange()" href="javascript:void(0);">立即兑换</a>
             </div>
           </div>
       </div>

       <div class="commodity-info">
          <div class="commodity-info-header">商品详情</div>
          <div class="commodity-list-info" v-html="list.description"></div>
       </div>

       <Modal
         v-model="modal1"
         width="500px"
         class="modal-box-mall"
         class-name="vertical-center-modal"
         :closable="false"
         :mask-closable="false">
         <div class="close-container" slot="header">
           温馨提示
           <i @click="closeModal1()" class="close-i-box"></i>
         </div>
         <div class="message-info-box">
           <p class="message-info-title">{{ messageInfo }}</p>
           <a @click="earnPoints()" href="javascript:void(0);" v-if="btnShow == 2 " class="cancel-box line-bar">赚积分</a>
           <router-link :to="defaultPorts + '' " v-if="btnShow == 2 " class="sure-box line-bar">继续兑换</router-link>
           <span @click="closeModal1()" v-if="btnShow == 1 " class="sure-box line-bar">确认</span>

         </div>

       </Modal>

     </div>
  </div>
</template>
<script>
  import myUtil from '../../util/prots'
  export default {
    name: 'details',
    data () {
      return {
        value1: 1, //默认购买商品数量
        modal1: false,
        isLogin: 0, //0未登录
        list: {
          name: '',
          score: 0,
          market_price: 0.00,
          discount_core: '',
          description: '',
          img: '',
          bigImg: '',
          scoreNum: 0,
          user_can_buy_number: 0
        },
        serviceData: {},
        messageInfo: '',
        btnShow: 2, //默认显示两个按钮
        defaultPorts: '',
        usable_scor: 0
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        this.handleSpinCustom();
      })
    },
    mounted () {
      this.$nextTick(function(){
        this.integrals();//可用积分
        this.commodityInfo();//查看商品详情
        this.servicePhone();//服务热线
        myUtil.iframeResize();//调整父页面iframe的高度
        parent.document.documentElement.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      })
    },
    methods: {
      closeMarks () {
        parent.document.getElementById("ScrollTopLogoNav").style = "z-index: normal;" ;
        if(parent.document.getElementById('mask')){
          parent.document.getElementById('mask').style.display="none";
        }
      },
      handleSpinCustom  (){ //loading效果
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
      },
      setScrollTop () {//设置ifame滚动距离
        var iframe = parent.document.getElementById("iframe");
        iframe.contentWindow.window.scrollTo(0,0);
        iframe.contentWindow.document.documentElement.scrollTop = 0;
        iframe.contentWindow.document.body.scrollTop = 0;
      },
      earnPoints () { //去赚积分
        parent.location.href = '/index.php?ctl=deals'
      },
      closeModal1 () {
        let _self = this;
        _self.setScrollTop();
        _self.modal1 = false;
        parent.document.getElementById("ScrollTopLogoNav").style = "z-index: normal;" ;
        if(parent.document.getElementById('mask')){
          parent.document.getElementById('mask').style.display="none";
        }
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
            let obj = response.data;
            _self.isLogin = obj.response_code;
            _self.usable_scor = response.data.usable_score;
          }).catch(function (error) {
          _self.$Notice.open({title: '温馨提示',desc: error });
        });
      },
      defaultPortsUrl () {
        let _self = this;
        _self.defaultPorts = myUtil.baseProts();
      },
      servicePhone () { //服务热线
        let _self = this;
        let url = '/mapi2/index.php?&act=app_company_information&r_type=1';
        this.$http.get(url)
          .then(function(response){
            console.log(response.data.data);
            if(response.data.response_code == 1){
              _self.serviceData = response.data.data;
            }
          })
      },
      exchange () { //立即兑换
        debugger
        let _self = this;
        let score = _self.usable_scor;
        let scoreNum = 0;

        let sumScore = Number(_self.list.scoreNum) * Number(_self.value1);//商品现价*购买数量=商品总价

        if(_self.isLogin == 0){
          parent.location.href = '/index.php?ctl=user&act=login'
          return false;
        }

        if(_self.list.discount_core == 0 || _self.list.discount_core == null){
          scoreNum = _self.list.score;
        }else{
          scoreNum = _self.list.discount_core;
        }

        if(parseInt(score) < parseInt(scoreNum)){//积分不够不能兑换
          if(parent.document.getElementById('mask')){
            parent.document.getElementById('mask').style.display="block";
          }
          _self.setScrollTop();
          _self.messageInfo = '积分不足,请兑换其它商品或赚取更多积分?';
          _self.modal1 = true;
          _self.btnShow = 2;
          parent.document.documentElement.scrollTop = 0;
          parent.document.getElementById("ScrollTopLogoNav").style = "z-index: 890!important;position: absolute;" ;
        }else if(_self.list.user_can_buy_number <= 0){ //已售罄
          if(parent.document.getElementById('mask')){
            parent.document.getElementById('mask').style.display="block";
          }
          _self.setScrollTop();
          _self.messageInfo = '此商品已售罄，请选购其他商品!';
          _self.modal1 = true;
          _self.btnShow = 2;
          parent.document.documentElement.scrollTop = 0;
          parent.document.getElementById("ScrollTopLogoNav").style = "z-index: 890!important;position: absolute;" ;
        }else if(_self.value1 > _self.list.user_can_buy_number){
          if(parent.document.getElementById('mask')){
            parent.document.getElementById('mask').style.display="block";
          }
          _self.setScrollTop();
          _self.messageInfo = '超出你所能兑换的数量';
          _self.modal1 = true;
          _self.btnShow = 1;
          parent.document.documentElement.scrollTop = 0;
          parent.document.getElementById("ScrollTopLogoNav").style = "z-index: 890!important;position: absolute;" ;
        }else if(Number(sumScore) > Number(score)){
          if(parent.document.getElementById('mask')){
            parent.document.getElementById('mask').style.display="block";
          }
          _self.setScrollTop();
          _self.messageInfo = '当前兑换商品数量已超出现有可用积分!';
          _self.modal1 = true;
          _self.btnShow = 1;
          parent.document.documentElement.scrollTop = 0;
          parent.document.getElementById("ScrollTopLogoNav").style = "z-index: 890!important;position: absolute;" ;
        }else{
          _self.$router.push({ name: 'confirm', params: { id: _self.$route.params.id,
            num: _self.value1,score: _self.usable_scor,adr: 0 }});
        }
      },
      commodityInfo:function() {//查看商品详情
        let id = this.$route.params.id;//获取商品编号
        let _self = this;
        let Url = '/mapi2/index.php'

        let formData = new FormData();
        formData.append("act", "goodslists");
        formData.append("act_2", "detail");
        formData.append("id", id);
        formData.append("r_type", "1");

        this.$http.post(Url, formData)
          .then(function(response){
          let res = response.data
          _self.list.name = res.goods.name;
          _self.list.score = res.goods.score;
          _self.list.market_price = res.goods.market_price;
          _self.list.discount_core = res.goods.discount_core;
          _self.list.description = res.goods.description;
          _self.list.img = res.goods.img;
          _self.list.bigImg = res.goods.bigimg;
          _self.list.user_can_buy_number = res.goods.user_can_buy_number;

          if(res.goods.discount_core == 0 || res.goods.discount_core == null){
            _self.list.scoreNum = res.goods.score;
          }else{
            _self.list.scoreNum = res.goods.discount_core;
          }
          _self.closeMarks();
          _self.$Spin.hide();
        });
      },
      reduce () {
        let _self = this;
        _self.value1 == 1 ? _self.value1 = 1 : _self.value1--;
      },
      plus () {
         let _self = this;
         _self.value1++;
      }
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
    color: #333333;
  }
  .ivu-modal-header{
    background: #F3F3F3;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
  img{
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
</style>
<style scoped>
  div[name='details']{ width: 100%;}
  .cursors{ cursor: pointer}
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
  .cancel-box{
    width: 120px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background: #E5E5E5;
    font-weight: 600;
    font-size: 14px;
    color: #666666;
    cursor: pointer;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    margin-top: 38px;
    margin-right: 10px;
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
.commodity-list-info img{
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}
.commodity-list-info{
  padding: 10px;
}
.commodity-info-header{
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #666666;
  letter-spacing: 0;
  padding-left: 10px;
  border-bottom: 1px solid #EAEBED;
}
.commodity-info{
  min-height: 635px;
  height: auto;
  margin-top: 21px;
  background-color: #fff;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
.none-cursor{
  cursor: not-allowed!important;
}
.reduce{
  display: block;
  width: 22px;
  height: 21px;
  line-height: 21px;
  text-align: center;
  cursor: pointer;
  background-color: #fafafa;
  border-left: 1px solid #cccccc;
}
 .plus{
   display: block;
   text-align: center;
   height: 21px;
   line-height: 21px;
   cursor: pointer;
   background-color: #fafafa;
   border-left: 1px solid #cccccc;
   border-bottom: 1px solid #cccccc;
 }
.num-box input{
  width: 50%;
  height: 40px;
  outline: none;
  border: 0;
  text-align: center;
  padding-left: 10px;
}
.num-box{
  width: 70px;
  height: 44px;
  border: 1px solid #CCCCCC;
}
.exchange--btn:hover{ color: #fff!important;}
.exchange--btn{
  display: inline-block;
  width: 142px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #F25F5C;
  font-weight: 600;
  font-size: 18px;
  color: #FFFFFF;
  letter-spacing: 0;
  cursor: pointer;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
.exchange-box{
  margin-top: 80px;
  overflow: hidden;
}
.service-info{ margin-bottom: 24px;}
.line-throughs{
  text-decoration: line-through;
  opacity: 0.99;
  font-family: PingFangSC-Light;
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
}
.score-small{ color: #F25F5C!important;}
.big-score{
  font-size: 24px;
  color: #F25F5C;
  letter-spacing: 0;
}
.price{
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
}
.commodity-right-info{
  font-size: 12px;
  color: #F25F5C;
  letter-spacing: 0;
}
.commodity-right-header{
  width: 720px;
  font-size: 16px;
  color: #666666;
  letter-spacing: 0;
  font-weight: 600;
  margin-bottom: 15px;
}
.commodity-right{
  margin-top: 33px;
}
.commodity-left img{
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}
.commodity-left{
  width: 355px;
  height: 355px;
  text-align: center;
  padding: 100px;
  border: 1px solid #EEEEEE;
  margin-top: 33px;
  margin-left: 42px;
  margin-right: 54px;
}
.commodity-box{
  height: 438px;
  background-color: #fff;
  overflow: hidden;
}
</style>
