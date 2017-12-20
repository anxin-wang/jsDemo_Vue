<template>
  <div class="useCoupon">
    <div class="item-box radio-file">
      <label>不使用加息券</label>
      <input type="radio" name="radio" @click="unUseCoupon()"/>
      <span class="check-icon"></span>
    </div>
    <p class="uc-info">有<span>{{ unUse }}</span>个加息券可以使用</p>
    <section class="uc-list">
      <!-- 加息券组件 -->
      <coupon :cate_id="cate_id" :repay_time="repay_time" :repay_time_type="repay_time_type" @setUnUsed="setUnUsed" ></coupon>
      <!-- 加息券组件 -->
    </section>
  </div>
</template>
<script>
  import { Indicator,Toast } from 'mint-ui'
  import { screenHeight } from '../service/toastInfo'
  import coupon from '../components/invest_coupon'
  export default {
    name: 'use_coupon',
    components: { coupon },
    data () {
        return{
          unUse: 0,
          screenHeight:screenHeight,
          cate_id:1,
          repay_time:'',
          repay_time_type:'',
          coupon_id:0
        }
    },
    mounted () {
      this.getInfo();
    },
    methods: {
      getInfo(){
        this.id = this.$route.params.id;
        this.cate_id = this.$route.params.cate_id;
        this.repay_time =  this.$route.params.repay_time;
        this.repay_time_type = this.$route.params.repay_time_type;
        this.coupon_id=this.$route.params.coupon_id;
      },
      setUnUsed(amount){
        this.unUse=amount;
      }

    }
  }
</script>
<style scoped>
  .useCoupon{
    background-color: #F5F5F5!important;
    position: fixed;
    top: 46px;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-bottom: 40px;
  }
  .uc-list{  width: 100%;  margin-top: -10px;  }
  .uc-info{ font-size: 14px;color: #828282;padding: 5px 10px;}
  .uc-info span{ color: #f96068;display: inline-block;padding: 5px;}
  .radio-file{ position: relative;}
  .radio-file input[type=radio]{
    position: absolute;
    right: 0;
    top: 8px;
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
    right: 15px;
    top: 13px;
    background: url("../assets/images/investment/weixuanzhong.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;

  }
  .item-box{
    background-color: #fff;
    height: 50px;
    line-height: 50px;
    font-size: 15.5px;font-weight: 600;
    padding-left: 10px;
    color: #333333;
  }
  .item-box input {
    height: 35px;
    width: 85%;
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
  @media screen and (min-width: 320px) and (max-width: 374px) {
    .radio-file input ~ span.check-icon{ width: 15px;height: 15px;}
  }
</style>
