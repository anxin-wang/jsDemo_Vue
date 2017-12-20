<template>
  <div class="useCoupon">
    <div class="item-box radio-file">
      <label>不适用加息券</label>
      <input type="radio" name="radio" @click="unUseCoupon()"/>
      <span class="check-icon"></span>
    </div>
    <p class="uc-info">有<span>{{ unUse }}</span>个加息券可以使用</p>
    <section class="uc-list">
      <!-- 加息券组件
        :show(false为显示单选按钮,反之则不显示)
        :clear(true为移动左边距,反之则不移动)
      -->
      <coupon v-if="bol" v-bind:coupon-data="list" @refreshList="loadeMore" v-bind:show="false" v-bind:clear="true"></coupon>
      <!-- 加息券组件 -->
    </section>
  </div>
</template>
<script>
  import Coupon from '../components/Coupon'
  export default {
    name: 'use-coupon',
    components: { Coupon },
    data () {
        return{
          unUse: 0,
          list: [],
          bol: false,
          allLoaded: false,
        }
    },
    mounted () {
      this.$nextTick(function(){
        this.loadeMore (1);
      })
    },
    methods: {
      loadeMore (num) {
        /*Indicator.open({ spinnerType: 'fading-circle' })*/
        if(num == 1){//调用刷新
          this.allLoaded = false;
          this.list = [];
          this.info(1);
        }else{ //加载更多
          this.info(num);
        }
      },
      unUseCoupon () {
        let cou = storeWithExpiration.get('COUPONINFOS');

        if(cou != null && cou != ""){
          cou = JSON.parse(cou)
          let info = {no_more: 0, coupon_user_id :  cou.coupon_user_id, rate: cou.rate}
          info = JSON.stringify(info);
          storeWithExpiration.set('COUPONINFOS',info);
        }else{
          let info = {no_more: 0, coupon_user_id :  null, rate: null}
          info = JSON.stringify(info);
          storeWithExpiration.set('COUPONINFOS',info);
        }


      },
        UserName () {
            return window.storeWithExpiration.get('user_name')
        },
        UserPwd () {
            return window.storeWithExpiration.get('user_pwd')
        },
      callBackInfo (obj) {
        if(obj == null || obj == ""){
          this.allLoaded = true;
        }
        this.list = this.list.concat(obj)
      },
      info (num) {
        let _self = this;
        let id = _self.$route.params.id;
        let cate_id = _self.$route.params.cate_id;
        let repay_time =  _self.$route.params.repay_time;
        let repay_time_type = _self.$route.params.repay_time_type;

        let Base64 = require('js-base64').Base64;

        let url = '/mapi2/index.php'
        let user_name = _self.UserName();
        let user_pwd = _self.UserPwd();

        let formData = new FormData();
        formData.append("act",'uc_coupon');
        formData.append("page",num);
        formData.append("coupon_user_status",'0');
        formData.append("cate_id", cate_id);
        formData.append("repay_time",repay_time);
        formData.append("repay_time_type",repay_time_type);
        formData.append("email",user_name);
        formData.append("pwd",user_pwd);

        this.$http.post(url,formData)
          .then(response => {
            let res = JSON.parse(Base64.decode(response.data));
            this.bol = true;
            this.unUse = res.item.length;
            if(num > 1){
              this.callBackInfo(res.item);
            }else{
              this.list = res.item;
            }
          },response => {

          })
      }
    }
  }
</script>
<style scoped>
  .useCoupon{
    font-family: "微软雅黑体";
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
