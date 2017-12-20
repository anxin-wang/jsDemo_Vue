<template>
  <div class="FindAbout">
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">公司简介</mt-tab-item>
      <mt-tab-item id="2">相关资质</mt-tab-item>
      <mt-tab-item id="3">发展历程</mt-tab-item>
      <mt-tab-item id="4">联系我们</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="pl5 pr5 pt8" v-html="Company_profile" v-if="dataInfo.company_summary != null"></div>

      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="pl5 pr5 pt8" v-html="aptitude" v-if="dataInfo.relevant_qualification != null">
          {{aptitude}}
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="A_course">
         <!-- <img width="100%" src="../../assets/images/banner01@3x.png" alt="">-->
          <div class="A_courseList">
            <ul>
              <li v-for="item in develop">
                <div class="clear">
                  <div class="fl" style="text-align:right;width:44px;min-height:30px;">
                    <p>{{item.sub_title}}</p>
                  </div>
                  <div class="fl ml35 A_courseListCon">
                    <h2 class="f14 mb5">{{item.title}}</h2>
                    <p><img width="100%" :src="item.icon" alt=""></p>
                    <p class="mt5 f12" v-html="item.content">{{item.content}}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <div class="HotlineList">
          <div class="clear">
            <h3 class="fl"><img src="../../assets/images/ucenter/wx@1.5x.png" alt=""></h3>
            <h2 class="fl">微信公众号</h2>
          </div>
          <p>请关注微信公众号：<span @click.stop="jglcwx">坚小果互金</span></p>
        </div>
        <div class="HotlineList">
          <div class="clear">
            <h3 class="fl"><img src="../../assets/images/ucenter/phone@1.5x.png" alt=""></h3>
            <h2 class="fl">客服服务</h2>
          </div>
          <p>坚果理财客服电话:( {{serviceData.online_time}} ) </p>
          <div class="TelPhone"  @click.stop="TelPhone">{{ serviceData.shop_tel}}</div>
          <p>富友支付客服电话:( {{serviceData.fuiou_online_time}} )</p>
          <div class="TelPhone"  @click.stop="TelPhone2">{{ serviceData.fuiou_shop_tel}}</div>
        </div>
        <div class="HotlineList">
          <div class="clear">
            <h3 class="fl"><img src="../../assets/images/ucenter/map@1.5x.png" alt=""></h3>
            <h2 class="fl">公司地址</h2>
          </div>
          <p>公司地址:<span>{{address.company_address}}</span></p>
        </div>
        <div class="HotlineList">
          <div class="clear">
            <h3 class="fl"><img src="../../assets/images/ucenter/Opinion@1.5x.png" alt=""></h3>
            <h2 class="fl">意见反馈</h2>
          </div>
          <p>意见反馈:<router-link to="/feedback">点击进入留下您宝贵的意见</router-link></p>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-popup v-model="popupVisible4" position="top" class="mint-popup-4">
      <div class="jglcwx"><img src="../../assets/images/wx_gzh.jpg" alt=""></div>
    </mt-popup>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
export default {
  name: 'UcInvest',
  data () {
    return {
        selected: '1',
        dataInfo:[],
        Company_profile:"",
        aptitude:"",
        develop:[],
        popupVisible4:false,
        address:"",
        serviceData: {}
    }
  },
    mounted () {
        this.info ()
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
        info () {/*获取信息*/
            let _that = this
            let Base64 = require('js-base64').Base64
            let Url = '/mapi2/index.php?&act=new_article'
            let formData = new FormData();
            Indicator.open({ spinnerType: 'fading-circle' })
            _that.$http.post(Url,formData)
                .then(response => {
                    var response = JSON.parse(Base64.decode(response.data));
                    if(response.response_code == 1){
                        _that.dataInfo = response
                        if(response.company_summary != null){
                            _that.Company_profile = response.company_summary.content
                        }
                        if(response.relevant_qualification != null){
                            _that.aptitude = response.relevant_qualification.content
                        }
                        if(response.develop != null){
                            _that.develop = response.develop
                        }

                    }else{
                        Toast({
                            message: response.show_err,
                            position: 'bottom',
                            duration: 5000
                        });
                    }
                    Indicator.close()
                })
        },
        addressInfo(){
            let _that = this
            let Base64 = require('js-base64').Base64
            let Url = '/mapi2/index.php?'
            let formData = new FormData();
            formData.append("act","app_company_information");
            Indicator.open({ spinnerType: 'fading-circle' })
            _that.$http.post(Url,formData)
                .then(response => {
                    var response = JSON.parse(Base64.decode(response.data));
                    if(response.response_code == 1){
                        _that.address = response.data
                    }else{
                        Toast({
                            message: response.show_err,
                            position: 'bottom',
                            duration: 5000
                        });
                    }
                    Indicator.close()
                })
        },
        TelPhone(){
            window.location.href = 'tel:'+this.address.shop_tel
        },
        TelPhone2(){
           window.location.href = 'tel:'+this.serviceData.fuiou_shop_tel
        },
        jglcwx(){
            this.popupVisible4 = true
        }
    }
}
</script>

<style>
.FindAbout .mint-navbar.page-part{
  width:100%;
  position:fixed;
  top:45px;
  left:0px;
  z-index: 999;
}
.FindAbout .mint-tab-container-wrap{
  margin-top:50px;
}
</style>
<style scoped>
.NotContent{
  text-align:center;
  position:fixed;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  font-size:18px;
}
.A_courseList{
  padding:10px 10px;
}
.A_courseList ul li{
  margin-bottom:15px;
  position:relative;
}
.A_courseList ul li:before{
  content:'';
  width:1px;
  height:2000px;
  background:#F4AC31;
  position:absolute;
  left:52px;
  top:0px;
}
.A_courseList ul li:after{
  content:'';
  width:16px;
  height:16px;
  background:url("../../assets/images/Group@1.5x.png");
  background-size:100%;
  border-radius:50%;
  position:absolute;
  left:45px;
  top:2px;
}
.A_courseListCon{
  width:76%;
}
@media screen and (max-width: 320px) {
  .A_courseListCon{
    width:74%;
  }
}
.HotlineList{
  width:100%;
  padding:5px 0px;
  background:white;
  margin-top:10px;
}
.HotlineList > div,
.HotlineList p,
.HotlineList > a{
  margin:0px 10px;
  padding:7px 10px;
}
.HotlineList h2,
.HotlineList h3{
  font-size:14px;
  line-height:20px;
  font-weight:normal;
}
.HotlineList > div{
  border-bottom:1px solid #d9d9d9;
}
.HotlineList h3 img{
  width: 25px;
  margin-right:5px;
}
.HotlineList p{
  color:#999;
  font-size:12px;
}
.HotlineList p span,
.HotlineList > .TelPhone,
.HotlineList > p > a{
  color:#F4AC31;
}
.HotlineList > .TelPhone{
  display:block;
  border:1px solid #F4AC31;
  width:115px;
  line-height:10px;
  border-radius:3px;
  text-align:center;
}



.jglcwx{
  min-width:200px;
  min-height:200px;
  background:white;
  position:fixed;
  left:50%;
  top:50%;
  transform: translate(-50%,50%);
}
.jglcwx img{width: 100%}
</style>
