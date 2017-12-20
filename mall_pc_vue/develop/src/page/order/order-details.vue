<template>
  <div class="orderDetails">

    <div class="basic-line">
      <Breadcrumb class="bread-box">
        <BreadcrumbItem href="/#">积分商城</BreadcrumbItem>
        <BreadcrumbItem href="/record">兑换记录</BreadcrumbItem>
        <BreadcrumbItem class="default-none">订单详情</BreadcrumbItem>
      </Breadcrumb>

      <div class="state-box">
        <p class="state-bar">
          <img class="line-bar" src="../../assets/images/state_1.png"/>
          <img class="line-bar" src="../../assets/images/state_2.png" v-if="list.order_status == 1 || list.order_status == 2 "/>
          <span class="line-bar">当前状态：{{ list.order_status }}</span>
        </p>
        <div class="order-num">
          <div>订单号：{{ list.order_sn }}</div>
        </div>
        <!--<span class="cancel" @click="openModal" v-if="list.order_status_code == 3 && list.ship_status_code == 0">取消订单</span>-->
        <router-link class="confirm" :to="{ name: 'home'}">继续兑换</router-link>
      </div>

      <div class="confirm-order-box">

        <div class="address-box">

          <div class="commodity-details-box">
            <div v-if="list.delivery_addr != null && list.delivery_addr != '' ">
               <p class="commodity-details-header">收货人信息</p>
               <div class="address-info-box">
                 <span class="margin-l114 address-name active-address-name">{{ list.delivery_name }}</span><label>{{ list.delivery_name }}</label><span>{{ list.delivery_addr }}</span>
               </div>
            </div>
            <p class="commodity-details-header">送货清单</p>
            <ul class="clear-ul commodity-details-list">
              <li>
                <div class="details-left">
                  <div class="delivery-type">
                    <p class="delivery">配送方式</p>
                    <span class="address-name active-address-name">快递</span>
                    <p class="free">免运费0元</p>
                  </div>
                </div>
                <div class="details-right">
                  <div class="commodity-container">
                    <p class="commodity-container-header">商品详情</p>
                    <ul class="clear-ul commodity-container-list">
                      <li class="commodity-pic-box">
                        <!--<img src="../../assets/images/3.png">-->

                        <!-- 默认图片 -->
                        <img v-if="list.img == '' || list.img == null "  src="../../assets/images/image_err.gif"/>
                        <!--/. 默认图片 -->

                        <img :src="list.img | filterUrl">

                      </li>
                      <li class="commodity-name-box">
                        <p class="commodity-name" v-text="list.goods_name">京东E卡经典卡300面值(实体卡)</p>
                        <p class="commodity-mark">*实物礼品非质量问题不退不换</p>
                      </li>
                      <li>
                        <p class="commodity-score">{{ list.pay_amt }}积分</p>
                      </li>
                      <li><p class="commodity-num" v-if="list.number != null ">x {{ list.number }}</p></li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>


          </div>

        </div>
      </div>

      <Modal
        v-model="modal1"
        width="771"
        :closable="false"
        :mask-closable="false">
        <div class="close-container" slot="header">
          取消订单
          <i @click="closeModal1()" class="close-i-box"></i>
        </div>
        <div class="message-box">
          <p class="state-message">您确定要取消订单吗？</p>
          <div class="state-message-mark">取消订单后，不能恢复！</div>
          <label class="font-label">下拉选择理由</label>
          <Select v-model="cancelObj.cancel_memo" class="select-w150"  placeholder="请选择取消理由">
            <Option v-for="item in reason" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>

        <div class="message-input-box">
           <div class="message-input-item">
              <label>账号</label>
              <input v-model="cancelObj.mobile" readonly="readonly" type="text" placeholder="请输入平台注册手机号">
           </div>
          <div class="message-input-item">
            <label>安全码</label>
            <input v-model="cancelObj.code" type="text" placeholder="请输入安全码" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') ">
            <img class="line-bar code-box" title="看不清楚?换一张"
                 src="/verify.php?w=89&h=30&rand=563711845"
                 onclick="this.src='/verify.php?w=89&h=44&rand='+ Math.random();"/>
          </div>
          <div class="message-input-item">
            <label>验证码</label>
            <input v-model="cancelObj.sms_code" type="text" placeholder="请输入短信验证码" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') ">
            <div @click="safetyCode" class="get-code-box" :class="{'active-btn': showCodeMsg}">
              <span v-show="showCodeMsg">获取验证码</span>
              <span v-show="!showCodeMsg">({{ codeCount }}s)后重新获取</span>
            </div>
          </div>
          <span @click="cancelSub()" class="sub-btns">确定</span>
        </div>

      </Modal>

      <Modal
        v-model="modal2"
        width="500px"
        class="modal-box-mall"
        :closable="false"
        :mask-closable="false">
        <div class="close-container" slot="header">
          {{ messageTile }}
          <i @click="closeModal()" class="close-i-box"></i>
        </div>
        <div class="message-info-box">
          <p class="message-info-title" v-html="messageInfo"></p>
          <span @click="closeModal()" class="sure-box line-bar">确定</span>
        </div>

      </Modal>


    </div>

  </div>
</template>
<script>
  import myUtil from '../../util/prots'
  export default {
    name: 'orderDetails',
    data () {
      return {
        list: {},
        modal1: false,
        modal2: false,
        messageTile: '',
        messageInfo: '',
        reason: [
          {
            value: '不想兑换了',
            label: '不想兑换了'
          },
          {
            value: '信息填写错误',
            label: '信息填写错误'
          },
          {
            value: '其他原因',
            label: '其他原因'
          }
        ],
        showCodeMsg: true,
        codeCount: '',
        timer: null,
        cancelObj: {
          mobile: '',
          code: '',
          sms_code: '',
          cancel_memo: ''
        },
        isLogin: 0, //0未登录
        local: '',
        mobile: ''
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        this.handleSpinCustom();
      })
    },
    mounted:function() {
      this.$nextTick(function () {
        this.integrals();
        this.init();
        this.uccenter();
        myUtil.iframeResize();//调整父页面iframe的高度
        parent.document.body.scrollTop = 0;
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
      setScrollTop () {
        var iframe = parent.document.getElementById("iframe");
        iframe.contentWindow.window.scrollTo(0,0);
        iframe.contentWindow.document.documentElement.scrollTop = 0;
        iframe.contentWindow.document.body.scrollTop = 0;
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
      closeModal () { //关闭跳转至兑换记录
        let _self = this;
        _self.modal2 = false;
        parent.document.getElementById("ScrollTopLogoNav").style = "z-index: normal;" ;
        _self.setScrollTop();
        if(parent.document.getElementById('mask')){
          parent.document.getElementById('mask').style.display="none";
        }
        setTimeout(function () {
          _self.$router.push({ name: 'record'});
        },2000)
      },
      uccenter () {
        let _self = this;
        let url = '/mapi2/index.php?&act=uc_center&r_type=1'
        this.$http.get(url)
          .then(function(response){
            //&email=15221355211&pwd=123456
            _self.mobile = response.data.mobile;
          })
      },
      integrals () { //可用积分
        let _self = this;

        let Url = '/mapi2/index.php'
        let formData = new FormData();
        formData.append("act", "uc_score");
        /* formData.append("email", '15221355211');
         formData.append("pwd", users.'123456');*/
        formData.append("r_type", "1");

        this.$http.post(Url, formData)
          .then(function (response) {
            let obj = response.data;
            _self.isLogin = obj.response_code;
            console.log(response,'可用积分')
          }).catch(function (error) {
          _self.$Notice.open({title: '温馨提示',desc: error });
        });
      },
      cancelSub () {
        let _self = this;
        _self.cancelObj.mobile
        _self.cancelObj.id = _self.list.id;
        console.log(_self.cancelObj,'取消了')

        let url = "/mapi2/index.php?";

        _self.$http.get(url,{params:{
          act: 'uc_goods_order',
          act_2: 'order_cancel',
          id: _self.cancelObj.id,
          mobile: _self.cancelObj.mobile,
          sms_code: _self.cancelObj.sms_code,
          cancel_memo: _self.cancelObj.cancel_memo,
          r_type: '1'
        }}).then(function(response){
          let res = response.data;
          _self.setScrollTop();
          _self.modal2 = true;
          _self.modal1 = false;
          parent.document.body.scrollTop = 0;
          parent.document.documentElement.scrollTop = 0;
          parent.document.getElementById("ScrollTopLogoNav").style = "z-index: 890!important;position: absolute;" ;
          if(parent.document.getElementById('mask')){
            parent.document.getElementById('mask').style.display="none";
          }
          _self.messageTile = "温馨提示";
          _self.messageInfo = res.show_err;
          console.log(response,'收获地址列表')
        });



      },
      filterPorts () { //处理域名
        let str = myUtil.baseProts();
        if(str.indexOf(':8080') > -1){
          return 'http://develop.jianguolicai.cn';
        }else{
          return str;
        }
      },
      openModal () { //打开取消订单弹框
        let _self = this;
        _self.setScrollTop();
        _self.modal1 = true;
        parent.document.body.scrollTop = 0;
        parent.document.documentElement.scrollTop = 0;
        parent.document.getElementById("ScrollTopLogoNav").style = "z-index: 890!important;position: absolute;" ;
        _self.cancelObj.mobile = _self.mobile;
        if(parent.document.getElementById('mask')){
          parent.document.getElementById('mask').style.display="block";
        }
      },
      getSmsCode () { //短信验证码
        let _self = this;
        //let ajaxurl = APP_ROOT+"/index.php?ctl=ajax&act=get_register_verify_code";
        let ajaxurl = _self.filterPorts() + "/index.php";

        let formData = new FormData();
        formData.append("ctl", "ajax");
        formData.append("act", "get_register_verify_code");
        formData.append("user_mobile", _self.cancelObj.mobile);
        /*formData.append("email", users.email);
        formData.append("pwd", users.pwd);*/
        formData.append("r_type", "1");

        _self.$http.post(ajaxurl,formData)
          .then(function(response){
            console.log(response,'发送短信验证码')
          });
      },
      checkPhone () {
        let _self = this;
        let reg = "^1[3|4|5|8][0-9]\\d{8}$";
        let re = new RegExp(reg);
        if(re.test(_self.cancelObj.mobile)){
           return true;
        }else{
           /*_self.modal2 = true;
           _self.messageTile = "温馨提示";
           _self.messageInfo = "请输入正确的手机号！";*/
          _self.$Notice.open({ title: '温馨提示',desc: '请输入正确的手机号！' });
          return false
        }
      },
      safetyCode (){
        let _self = this;
        let url = "/mapi2/index.php?"

        if(_self.cancelObj.code != null && _self.cancelObj.code != ""){
          _self.$http.get(url,{params:{
            act: 'uc_goods_order',
            act_2: 'order_verify',
            verify: _self.cancelObj.code,
            /*email: '15221355211',
            pwd: '123456',*/
            r_type: '1'
          }}).then(function(response){
            let res = response.data;
            console.log(response,'安全码')
            if(res.response_code == 1){
              _self.getCode();
              _self.getSmsCode();
              return true;
            }else{
              _self.$Notice.open({ title: '温馨提示',desc: res.show_err });
              return false
            }
          });
        }else{
          _self.$Notice.open({ title: '温馨提示',desc: '安全码有误！' });
        }

      },
      getCode () { //倒计时
        let _self = this;
        const TIME_COUNT = 60;
        if(!_self.timer){
          _self.codeCount = TIME_COUNT;
          _self.showCodeMsg = false;
          _self.timer = setInterval(() => {
            if(_self.codeCount > 0 && _self.codeCount <= TIME_COUNT){
              _self.codeCount--;
            }else{
              _self.showCodeMsg = true;
              clearInterval(_self.timer);
              _self.timer = null;
            }
          }, 1000);
        }
      },
      init () {
        let _self = this;
        let id = _self.$route.params.id;
        let url = '/mapi2/index.php';
        _self.local = myUtil.baseProts();

        let formData = new FormData();
        formData.append("act", "uc_goods_order");
        formData.append("act_2", "order_detail");
        formData.append("id", id);
        /*formData.append("email", '15221355211');
        formData.append("pwd", '123456');*/
        formData.append("r_type", "1");

        _self.$http.post(url,formData)
          .then(function(response){
            console.log(response,'订单详情')
            var res = response.data;
            _self.list = res.item;

          });
        _self.closeMarks();
        _self.$Spin.hide();
      },
    },
    filters: {
      filterUrl (url) { //过略图片路径
        if(url != null && url != ""){
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

  .ivu-modal-wrap{ top: -100px;}
  .modal-box-mall .ivu-modal-content,
  .modal-box-mall .ivu-modal-body,
  .modal-box-mall .ivu-modal{ height: 267px;}
  .ivu-modal{
    width:771px;
    height: 543px;
    background: #FFFFFF;
    -webkit-border-radius: 4px!important;
    -moz-border-radius: 4px!important;
    border-radius: 4px!important;
  }
  .ivu-modal-content{ height: 573px;}
  .ivu-modal-body{ height: 573px;}
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
</style>
<style scoped>
  .address-info-box label{ padding: 0 15px;}
  .address-info-box{
    font-size: 12px;
  }
  .margin-l114{
    margin-left: 114px ;
  }
  div[name='orderDetails']{ width: 100%;}
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
.active-btn{
  background-color: #FDB75A!important;
  color: #fff!important;
}
.message-input-box{
  margin-top: 20px;
}
.sub-btns{
  display: block;
  width: 150px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #FDB75A;
  font-size: 14px;
  font-weight: 600;
  color: #FFFFFF;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  cursor: pointer;
}
.get-code-box{
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #EDEDED;
  font-size: 12px;
  color: #666666;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  position: absolute;
  top: 10px;
  right: 0;
  cursor: pointer;
}
.code-box img{
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}
.code-box{
  /*width: 58px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border: 1px solid gray;*/
  position: absolute;
  top: 12px;
  right: 0;
  cursor: pointer;
}
.message-input-item input{
  height: 38px;
  width: 170px;
  outline: none;
  border: 0;
}
.message-input-item label{
  display: inline-block;
  width: 50px;
}
.message-input-item{
  width: 302px;
  height: 48px;
  line-height: 48px;
  margin: 0 auto;
  border-bottom: 1px solid #eaebed;
  position: relative;
}
.message-box{
  margin-top: 37px;
  padding-left: 100px;
  border-bottom: 1px solid #eaebed;
  padding-bottom: 40px;
}
.select-w150{ width: 150px;}
.font-label{
  font-size: 12px;
  color: #666666;
  padding-right: 10px;
}
.state-message-mark{
  font-size: 14px;
  color: #FDB75A;
  margin-bottom: 36px;
}
.state-message{
  font-family: PingFangSC-Semibold;
  font-size: 24px;
  color: #333333;
}
.confirm{
  display: inline-block;
  vertical-align: middle;
  background: #FDB75A;
  width: 150px;
  height: 36px;
  line-height: 36px;
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #FFFFFF;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
.cancel{
  display: inline-block;
  vertical-align: middle;
  width: 150px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  color: #999999;
  cursor: pointer;
  border: 1px solid #CCCCCC;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
.order-num{
  font-size: 14px;
  color: #999999;
  margin-top: 13px;
  margin-bottom: 30px;
}
.state-bar{
  font-family: PingFangSC-Semibold;
  font-size: 24px;
  color: #333333;
  margin-top: 45px;
}
.state-box{
  height: 232px;
  background: #FFFFFF;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  margin-bottom: 25px;
  text-align: center;
  overflow: hidden;
}
  .commodity-container-header{
    font-size: 12px;
    font-weight: 600;
    color: #666666;
    margin-bottom: 18px;
  }
  .commodity-pic-box img{
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
  .commodity-pic-box{
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    text-align: center;
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
  }
  .commodity-name-box{ padding-left: 10px;}
  .commodity-num{
    font-family: Monaco;
    font-size: 14px;
    color: #666666;
  }
  .commodity-score{
    font-size: 14px;
    color: #F74E3B;
  }
  .commodity-mark{
    font-family: PingFangSC-Light;
    font-size: 12px;
    color: #F25F5C;
  }
  .commodity-name{
    font-size: 12px;
    color: #666666;
  }
  .commodity-container-list li:last-child{ width: 50px;}
  .commodity-container-list li:nth-child(3){
    width: 200px;
  }
  .commodity-container-list li:nth-child(2){
    width: 300px;
  }
  .commodity-container-list li:first-child{
    width: 100px;

  }
  .commodity-container-list li{ float: left;height: 100px!important;}
  .commodity-container-list{
    overflow: hidden;
    height: 100px;
  }
  .delivery-type, .commodity-container{
    margin-left: 71px;
    margin-top: 34px;
  }
  .free{
    font-size: 12px;
    color: #999999;
    margin-top: 15px;
  }
  .delivery{
    font-size: 12px;
    font-weight: 600;
    color: #666666;
    margin-bottom: 16px;
  }
  .details-right{
    position: absolute;
    right: 0;
    top: 0;
    width: 723px;
    height: inherit;
    background-color: #f4fbfe;
  }
  .details-left{
    position: absolute;
    left: 0;
    top: 0;
    width: 398px;
    height: inherit;
    background-color: #f7f7f7;
  }
  .commodity-details-list{ width: 1120px;margin-left: 43px;}
  .commodity-details-list li{
    height: 192px;
    position: relative;
  }
  .commodity-details-header{
    font-size: 14px;
    font-weight: 600;
    color: #333333;
    margin-top: 39px;
    margin-left: 43px;
    margin-bottom: 35px;
  }
  .commodity-details-box{ overflow: hidden;}

  .operation span:nth-child(2){
    margin-right: 10px;
    font-size: 12px;
    color: #666666;
  }

  .active-address-name{
    font-weight: 600;
    color: #666666!important;
    border: 0!important;
    width: 160px!important;
    height: 38px!important;
    background: url("../../assets/images/select.png") no-repeat!important;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    background-color: #fff;
  }

  .address-name{
    display: inline-block;
    width: 160px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    font-size: 12px;
    color: #999999;
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
  }

  .address-box{ overflow: hidden;}
  .confirm-order-box{
    min-height: 500px;
    height: auto;
    background-color: #fff;
  }
</style>
