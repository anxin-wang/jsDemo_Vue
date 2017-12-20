<template>
  <div class="subHeader">
    <div class="FindIntroduce">
      <ul class="dispalyfiex">
        <li class="flex1" v-for="item in obj" @click.stop="Hotline(item.cli)">
          <router-link :to="item.url">
            <p><img :src="item.Img" alt=""></p>
            <p class="mt8 f12 black-gray" v-if="item.text != null">{{ item.text }}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <mt-popup v-model="popupVisible4" position="bottom" class="mint-popup-4">
      <ul class="phone-call-list">
        <li>客服热线</li>
        <li @click="popupVisible4 = false">
          <a :href="'tel:'+ serviceData.shop_tel">
            <span class="phone-call-number">坚果理财&nbsp;:&nbsp;{{ serviceData.shop_tel}}</span><br/>
            <span class="phone-call-time">( {{serviceData.online_time}} ) </span>
          </a>
        </li>
        <li @click="popupVisible4 = false">
          <a :href="'tel:' + serviceData.fuiou_shop_tel">
            <span class="phone-call-number">富友支持&nbsp;:&nbsp;{{ serviceData.fuiou_shop_tel}}</span><br/>
            <span class="phone-call-time">( {{serviceData.fuiou_online_time}} )</span>
          </a>
        </li>
        <li @click="popupVisible4 = false"><a href="javascript:;" class="cancel-font">取消</a></li>
      </ul>
    </mt-popup>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name:'subHeaher',
  props: ['obj'],
  data () {
    return {
        popupVisible4:false,
        tel:"",
       serviceData: {}
    }
  },
    mounted () {
        this.addressInfo ();
        this.servicePhone();
    },
  methods:{
    servicePhone () {
      let url = '/mapi2/index.php?&act=app_company_information&r_type=1';
      this.$http.get(url)
        .then(response => {
          if(response.data.response_code == 1){
            this.serviceData = response.data.data;
          }
        },response => {
        })
    },
      Hotline(i){
          if(i != undefined){
              if(i == "phone"){
                  this.popupVisible4 = true
              }
              if(i == "mall"){
                  Toast({
                      message: "开发中..",
                      position: 'bottom',
                      duration: 2000
                  });
              }
          }
      },
      addressInfo(){
          let _that = this
          let Base64 = require('js-base64').Base64
          let Url = '/mapi2/index.php?'
          let formData = new FormData();
          formData.append("act","app_company_information");
          _that.$http.post(Url,formData)
              .then(response => {
                  var response = JSON.parse(Base64.decode(response.data));
                  if(response.response_code == 1){
                      _that.tel = response.data
                  }else{
                      Toast({
                          message: response.show_err,
                          position: 'bottom',
                          duration: 5000
                      });
                  }
              })
      },
      Telphone(tel){
          window.location.href = 'tel:'+tel
      }
  }
}
</script>
<style>
.mint-popup{width:100%;}
.Hotline_tel{
  width:100%;
  background:white;
  position:absolute;
  left:0px;
  bottom:40px;
  text-align: center;
  z-index: 9999;
}
.Hotline_tel p{
  line-height:35px;
  font-size:15px;
}
.out_tel{
  width:100%;
  line-height:35px;
  text-align: center;
  font-size:15px;
}
.mint-popup-bottom {
  width: 90%;
  min-height: 150px;
  height: auto;
  bottom: 10px;
  -webkit-border-radius: 8.5px;
  -moz-border-radius: 8.5px;
  border-radius: 8.5px;
}
</style>
<style scoped>
  *{ font-family: PingFangSC-Medium,sans-serif;}
  .black-gray{ color: #96A0B7;font-weight: bold;}
  .cancel-font{ font-size: 1.4px;}
  .phone-call-number{ font-size: 16px;}
  .phone-call-time{font-size: 11px;color: #999999;}
  .phone-call-list{ list-style: none;text-align: center;}
  .phone-call-list li{
    min-height: 37px;
    height: auto;
    padding: 5px 0;
    border-bottom: 1px solid #e9e9e9;
  }
  .phone-call-list li:nth-child(2), .phone-call-list li:nth-child(3){
    font-size: 1.35px;
    text-align: center;
  }
  .phone-call-list li:first-child{ color: #999999;font-size: 14px}
  .phone-call-list li:last-child{ border-bottom: 0;}
  .phone-call-list li a{ color: #0f91ed}
  .subHeader{ margin-top: 0;}
  .FindIntroduce{
    width:100%;
    background:white;
  }
  .FindIntroduce ul > li{
    text-align:center;
  }
  .FindIntroduce ul > li > a{
    display:block;
    padding:10px 0px;
  }
  .FindIntroduce ul > li > a > p > img{
    width: 42.68%;
  }
  @media screen and (min-width: 320px) and (max-width: 374px) {
    .phone-call-number{ font-size: 15px; }
    .phone-call-time{ font-size: 10px;color: #999999; }
  }
</style>
