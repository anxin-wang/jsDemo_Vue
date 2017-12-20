<template>
  <div class="investment">
    <section class="section1">
      <p>{{ name }}</p>
      <div class="line">预期年化收益：&nbsp;{{ rate }}%</div>
      <div class="line" style="padding-left: 30px;">投资期限：&nbsp;<span>{{ repay_time }}天</span></div>
    </section>
    <section class="section2">
      <ul>
        <li>账户可用余额：&nbsp;<span>{{ ips_balance }}元</span></li>
        <li>
          <p>{{ min_loan_money }}元起投,可投金额 ¥{{ need_money }}元</p>
          <input class="line" type="number" v-model="shouyi" placeholder="请输入投资金额">
          <button class="line" @click="maxMoney()">最大金额</button>
          <p>预计收益:<span>{{ yqsy }}元 <label v-if="jiaxi != '' "> + </label> {{ yysyMoney }} </span></p>
        </li>
        <li>
          <a href="javascript:void(0);" @click="goUseCoupon()">
            加息劵
            <span><!--{{couponRate}}{{couponeItme}}{{no_more}}-->
              <label v-if="jxSumInfo == 0 && couponRate == '' ">无可用加息劵</label>
              <label v-if="jxSumInfo > 0  && couponRate != null && couponeItme != null && no_more == 0 " class="coupon-font"> {{ jxSumInfo }}个加息劵可用</label>
              <label v-if="jxSumInfo > 0  && couponRate != null && couponeItme != null && no_more == 1 " class="coupon-font"> + {{ couponRate }} %</label>
              <label v-if="jxSumInfo > 0  && couponRate != null && couponeItme == null && no_more == null " class="coupon-font">+ {{ couponRate }} %</label>

            </span>
          </a>
        </li>
      </ul>
      <router-link id="useCoupon" :to="{ path: '/useCoupon/' + couponeId + '/'  + cate_id + '/' + repay_time + '/' + repay_time_type}"></router-link>
      <span class="btn" @click="modal1 = true">确认投资</span>
      <router-link id="investmentResult" to="/investmentResult"></router-link>
      <div style="text-align: center"><i><img src="../assets/images/investment/tianfu.png" width="15"></i>&nbsp;&nbsp;平台账户资金由富友支付托管</div>
    </section>

    <router-link id="rechargeLink" to="/uc_recharge"></router-link>
    <Modal
      title="我要投资"
      v-model="modal1"
      class-name="vertical-center-modal"
      ok-text="确定投资"
      @on-ok="subRecharge">
      <ul class="inve-box">
        <li>
          <span>可用余额(元)</span>
          <span>{{ ips_balance }}元</span>
        </li>
        <li>
          <span>投资金额(元)</span>
          <span>{{ shouyi }}元</span>
        </li>
        <li>
          <span>投资期限(天)</span>
          <span>{{ repay_time }}天</span>
        </li>
        <li>
          <span>预期年化利率(%)</span>
          <span>{{ rate }}%  <label class="coupon-font" v-if="couponRate != '' && couponRate != 0 ">+ {{ couponRate }} %</label></span>
        </li>
        <li>
          <span>预期收益(元)</span>
          <span>{{ yqsy }}元 <label class="coupon-font" v-if="jiaxi !='' && jiaxi != 0 ">+ {{ yysyMoney }}</label></span>
        </li>
      </ul>
    </Modal>

  </div>
</template>
<script>
import { MessageBox} from 'mint-ui'
import { Toast } from 'mint-ui';
export default {
  name: 'investment',
  data () {
    return {
      modal1: false,
      list: [],
      name: '',
      rate: '',
      repay_time: '',
      ips_balance: 0,
      min_loan_money: 0,
      need_money: 0,
      shouyi: 0.00,
      cate_id: '',
      repay_time_type: '',
      coupon_user_id: '',
      defaultCouponeSize: 0,
      couponeId: 0,
      jiaxi: '',
      jxSumInfo: 0,
      couponRate: '',
      couponeItme: '',
      no_more: null
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.info();
      this.coupone();
      this.getCoupon();
      this.couponeItme = storeWithExpiration.get('COUPONINFOS');
    })
  },
  computed: { //计算属性
    yqsy () { //收益
      if(this.shouyi.toString().indexOf(",") > -1){
        this.shouyi = this.shouyi.replace(/,/g,'');
      }
      let money = Number(this.shouyi) * (Number(this.rate) / 100) / 360 * Number(this.repay_time);
      return money.toFixed(2);
    },
    yysyMoney () {
      let coupon = storeWithExpiration.get('COUPONINFOS');
      if(coupon == undefined || coupon == null || coupon == ''){
        return coupon;
      }else{
        coupon = JSON.parse(coupon);
        let money = Number(this.shouyi) * (Number(coupon.rate) / 100) / 360 * Number(this.repay_time);
        return money.toFixed(2) + '元';
      }
    }
  },
  methods: {
   getCoupon () {
     let coupon = storeWithExpiration.get('COUPONINFOS');
     coupon = JSON.parse(coupon);
     this.coupon_user_id = coupon.coupon_user_id
     if(coupon != null && coupon != ""){

       let money = Number(this.shouyi) * (Number(coupon.rate) / 100) / 360 * Number(this.repay_time);

       this.jiaxi = money //+  money + '元';
       this.couponRate =  coupon.rate;
     }
   },
   subRecharge () {
     let Base64 = require('js-base64').Base64;
     let id = this.$route.params.id;

     let user_name = this.userName();
     let user_pwd = this.userPwd();

     let url = '/mapi2/index.php';
     let formData = new FormData();
     if(this.coupon_user_id != null && this.coupon_user_id != ""){
         formData.append("coupon_user_id", this.coupon_user_id);
     }
     formData.append("act",'deal_dobid');
     formData.append("cus_id", id);
     formData.append("cus_name",this.name);
     formData.append("amount",this.shouyi);
     formData.append("email",user_name);
     formData.append("pwd",user_pwd);

     this.$http.post(url,formData )
       .then(response => {
         let res = JSON.parse(Base64.decode(response.data));

         if(this.shouyi % 100 == 0){
           let result = { state: res.response_code, msg: res.show_err,id: id}
           let MSG = "";
           MSG = JSON.stringify(result);
           storeWithExpiration.set('MSG', MSG)
           document.getElementById("investmentResult").click();
         }else{
           Toast({
             message: res.show_err,
             position: 'bottom',
             duration: 5000
           });
         }
       },response => {

       })
   },
   userName () {
     return window.storeWithExpiration.get('user_name')
   },
   userPwd () {
          return window.storeWithExpiration.get('user_pwd')
      },
   goUseCoupon(){
       if(this.defaultCouponeSize != 0){
           document.getElementById('useCoupon').click()
       }
    },
   coupone () {
     let _self = this;
     let Base64 = require('js-base64').Base64;
     let id = _self.$route.params.id;
     _self.couponeId = id;
     let url = '/mapi2/index.php'
     let user_name = _self.userName();
     let user_pwd = _self.userPwd();
     let formData = new FormData();

     let coupon = storeWithExpiration.get('COUPONINFOS');
     coupon = JSON.parse(coupon);

     if(coupon != null && coupon != ""){
       formData.append("coupon_user_id",coupon.coupon_user_id);
     }
     formData.append("act",'uc_coupon');
     formData.append("page",'1');
     formData.append("coupon_user_status",'0');
     formData.append("cate_id", _self.cate_id);
     formData.append("repay_time",_self.repay_time);
     formData.append("repay_time_type",_self.repay_time_type);
     formData.append("email",user_name);
     formData.append("pwd",user_pwd);

     this.$http.post(url,formData)
       .then(response => {
         let res = JSON.parse(Base64.decode(response.data));
         this.defaultCouponeSize = res.item.length;
         if(res.item.length > 0){

           let coupon = storeWithExpiration.get('COUPONINFOS');
           if(coupon != null &&  coupon !=""){ //no_more
             coupon = JSON.parse(coupon)
             this.couponRate = coupon.rate;
             this.no_more = coupon.no_more;
           }else{
             this.couponRate = res.item[0].rate;

             let info = { no_more: 1,coupon_user_id :  res.item[0].coupon_user_id, rate: res.item[0].rate}
             info = JSON.stringify(info);
             storeWithExpiration.set('COUPONINFOS',info);
           }

           this.jxSumInfo =  res.item.length;
         }else if(res.item.length == 0){
           storeWithExpiration.remove('COUPONINFOS');
         }
       },response => {

       })
   },
    recharge () { //去充值
      const setting = { confirmButtonText: '立即充值'}
      MessageBox.confirm('您的账户余额小于起投金额', '您的余额不足',setting)
        .then(action => {
          setTimeout(function(){
            document.getElementById("rechargeLink").click();
          },50)
        },response => {
          return false;
        });
    },
    maxMoney () {
      if(this.need_money.toString().indexOf("￥") > -1 || this.need_money.toString().indexOf("¥") > -1){
        let moneys = this.need_money;
        let mo = moneys.substr(1);
        this.need_money = mo;
      }

       if(parseInt(this.ips_balance) < parseInt(this.min_loan_money)){
         this.recharge();
       }else if(parseInt(this.ips_balance) <= parseInt(this.need_money)){
         this.shouyi = this.ips_balance;
       }else if(parseInt(this.ips_balance) >= parseInt(this.need_money)){
          this.shouyi = this.need_money;
       }
    },
    info () {
      let IPS_BALANCE = storeWithExpiration.get('ips_balance');
      let DEALIST = storeWithExpiration.get('DEALIST');
      let obj = JSON.parse(DEALIST);
      if(IPS_BALANCE != null && IPS_BALANCE != ""){
        if(IPS_BALANCE.toString().indexOf("￥") > -1 || IPS_BALANCE.toString().indexOf("¥") > -1){
          let mo = IPS_BALANCE.substr(0, IPS_BALANCE.toString().length);
          this.ips_balance = mo.toFixed(2);
        }else{
          this.ips_balance = IPS_BALANCE.toFixed(2);
        }
      }
      //this.ips_balance = IPS_BALANCE.toFixed(2);
      this.name = obj.deal.name;
      this.rate = obj.deal.rate;
      this.repay_time = obj.deal.repay_time;
      this.min_loan_money = obj.deal.min_loan_money;

      if(obj.deal.need_money != null && obj.deal.need_money != ''){
        if(obj.deal.need_money.toString().indexOf("￥") > -1 ||obj.deal.need_money.toString().indexOf("¥") > -1){
          let moneys = obj.deal.need_money;
          let mo = moneys.substr(1);
          this.need_money = mo;
        }
      }else{
        this.need_money = obj.deal.need_money;
      }

      this.shouyi = this.min_loan_money;
      this.cate_id = obj.deal.cate_id;
      this.repay_time_type = obj.deal.repay_time_type;
    }
  },
  filters: { //过滤器
    filterBigMoney (money) {//过滤金额 100000 = 10万
      if(money != null && money != ''){
        if(money <= 100000){
          if(money.toString().indexOf("￥") > -1 || money.toString().indexOf("¥") > -1){
            return money;
          }else{
            return Number(money).toFixed(2);
          }
        }else{
          if(money.toString().indexOf("￥") > -1 || money.toString().indexOf("¥") > -1){
            return money;
          }else{
            let m = money / 10000;
            if(m.toString().indexOf(".") > -1){
              let lenth = m.toString().split(".")[1].length;
              if(lenth >= 4){
                return Number(m).toFixed(4) + '万';
              }
            }else{
              return Number(m).toFixed(2)
            }
          }
        }
      }else {
        return money;
      }
    },
    filterMoney (money){
      return Number(money).toFixed(2);
    }
  }
}
</script>
<style>
  .ivu-modal-footer button:first-child{ display: none;}
  .ivu-modal-footer button:last-child{
    width: 95%;
    background-color: #f4ad31;
    border: 1px solid #f4ad31;
    height: 45px;
    line-height: 30px;
    -webkit-border-radius: 40px;
    -moz-border-radius: 40px;
    border-radius: 40px;
  }
  .ivu-modal-header{  border-top-left-radius: 5px;  border-top-right-radius: 5px;  }
  .ivu-modal-header-inner{  text-align: center;  }
  .ivu-modal-header, .ivu-modal-body, .ivu-modal-footer{ background-color: #E5E5E5;}
  .ivu-modal-footer{
    padding: 12px 28px 30px 18px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .ivu-modal-body{ padding: 0;}
</style>
<style scoped>
  .coupon-font{ color: #f4ad31;}
  .inve-box li span:last-child{ float: right;margin-right: 10px;}
  .inve-box li:first-child{
    margin-bottom: 15px;
  }
.inve-box li{
  height: 35px;
  line-height: 35px;
  background-color: #fff;
  padding-left: 10px;
  font-size: 14px;
}
  .investment{
    font-family: "微软雅黑体";
    background-color: #F5F5F5;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 48px;
    left: 0;
  }
  .copy-logo{
    width: 15px;
    height: 15px;
    background: url("../assets/images/investment/tianfu.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .copy-box{
    text-align: center;
    padding-top: 10px;
    position: relative;
    z-index: 0;
    width: 230px;
    bottom: -380px;
    left: 50%!important;
    color: #a2a2a2;
    margin: 0 0 150px -110px;
  }
 .btn{
  display: block;
   width: 90%;
   height: 50px;
   line-height: 50px;
   background-color: #f4ad31;
   color: #fff;
   text-align: center;
   font-size: 15.5px;
   -webkit-border-radius: 30px;
   -moz-border-radius: 30px;
   border-radius: 30px;
   margin: 50px auto;
 }
.section2{
  background-color: #fff;
  position: fixed;
  top: 140px;
  width: 100%;
  height: 100%;
}
.section2 ul{ list-style: none;}
.section2 ul li{
  border-bottom: 1px solid #e9e9e9;
  min-height: 45px;
  line-height: 45px;
  padding-left: 10px;
  font-size: 14.5px;
}
.section2 ul li:first-child{ color: #333333;font-weight: 600;}
.section2 ul li:first-child span{ color: #f4ad31;padding-left: 5px;}
.section2 ul li:nth-child(2){ color: #b2b2b2;}
.section2 ul li:nth-child(2) input{
  width: 75%;
  height: 40px;
  border: 1px solid #f4ad31;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding-left: 10px;
  margin-left: 2.5px;
}
.section2 ul li:nth-child(2) input:focus{
  outline: none;
  border: 1px solid #f4ad31;
}
.section2 ul li:nth-child(2) button{
  height: 40px;
  padding: 0 10px;
  background-color: #f4ad31;
  font-family: "微软雅黑体";
  color: #fff;
  border: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-left: -8.5px;
  border: 1px solid #f4ad31;
}
.section2 ul li:nth-child(2) p:last-child{ padding-top: 10px;padding-bottom: 5px;}
.section2 ul li:nth-child(2) p:last-child span{ color: #f4ad31;padding-left: 5.8px;}
.section2 ul li:last-child { position: relative;color: #333333;font-weight: 600;}
.section2 ul li:last-child:before{
  content: "";
  display: inline-block;
  width: 10px;
  height: 15px;
  position: absolute;
  right: 10px;
  top: 13.5px;
  background: url("../assets/images/left.png") no-repeat;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
}
.section2 ul li:last-child span{ float: right;margin-right: 30px;color: #b2b2b2;font-weight: normal;}
.section2 a{ display: block;}
.section1{  background-color: #fff;  height: 80px;}
.section1 p{ color: #333333;font-size: 16.5px;padding: 8.5px 10px;font-weight: 600;}
.section1 p span{ display: inline-block;padding: 0 5px;}
.section1 div{ padding-left: 10px;padding-right: 10px;padding-bottom: 20px;color: #b2b2b2;font-size: 14.5px;}
.line{  display: inline-block;  vertical-align: middle;  }
.investment{ overflow: hidden;}

  @media screen and (min-width: 320px) and (max-width: 374px) {
    .section2 ul li:nth-child(2) input {  width: 70%;  }
    .copy-box{ left: 18%;}
  }

</style>
