<template>
    <div :class="[help,{weixin:isweixin}]">
        <mt-navbar class="page-part" id="help-center" v-model="selected">
            <mt-tab-item id="1">
                <div class="pic-item pic1"></div>
                用户隐私
            </mt-tab-item>
            <mt-tab-item id="2">
                <div class="pic-item pic2"></div>
                充值提现
            </mt-tab-item>
            <mt-tab-item id="3">
                <div class="pic-item pic3"></div>
              投资人常见问题
            </mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected" class="mt10">
            <!--<mt-tab-container-item id="0">
                <div class="basics">最常遇见的问题</div>
                <Collapse>
                    <Panel v-for="(item,index) in list[12]">
                        {{ item.title }}
                        <p slot="content" v-html="item.content"></p>
                    </Panel>
                </Collapse>
            </mt-tab-container-item>-->
            <mt-tab-container-item id="1">
                <div>
                    <Collapse>
                        <Panel v-for="(item,index) in list[14]" :key="index">
                            {{ item.title }}
                            <p slot="content" v-html="item.content"></p>
                        </Panel>
                    </Collapse>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
              <div>
                <Collapse>
                  <Panel v-for="(item,index) in list[13]" :key="index">
                    {{ item.title }}
                    <p slot="content" v-html="item.content"></p>
                  </Panel>
                </Collapse>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <Collapse>
                    <Panel v-for="(item,index) in list[12]" :key="index">
                        {{ item.title }}
                        <p slot="content" v-html="item.content"></p>
                    </Panel>
                </Collapse>
            </mt-tab-container-item>
        </mt-tab-container>
        <div class="call-bar" @click="phoneCall = true">
            拨打客服热线
        </div>
        <mt-popup v-model="phoneCall" position="bottom">
            <ul class="phone-call-list">
                <li>客服热线</li>
                <li @click="phoneCall = false">
                  <a :href="'tel:'+ serviceData.shop_tel">
                    <span class="phone-call-number">坚果理财&nbsp;:&nbsp;{{ serviceData.shop_tel}}</span><br/>
                    <span class="phone-call-time">( {{serviceData.online_time}} )</span> </a>
                </li>
                <li @click="phoneCall = false">
                  <a :href="'tel:' + serviceData.fuiou_shop_tel">
                    <span class="phone-call-number">富友支持&nbsp;:&nbsp;{{ serviceData.fuiou_shop_tel}}</span>
                    <br/>
                    <span class="phone-call-time">( {{serviceData.fuiou_online_time}} )</span>
                  </a>
                </li>
                <li @click="phoneCall = false"><a href="javascript:;" class="cancel-font">取消</a></li>
            </ul>
        </mt-popup>
    </div>
</template>
<script>
    export default {
        name: 'help',
        data() {
            return {
                selected: '1',
                phoneCall: false,
                list: [],
                serviceData: {},
                isweixin:this.$route.meta.WxShowHeader
            }
        },
        mounted () {
            this.$nextTick(function(){
                this.info();
                this.servicePhone();
            })
        },
        methods: {
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
            info () {
                let Base64 = require('js-base64').Base64;
                let url = '/mapi2/index.php?&act=help';
                this.$http.get(url)
                    .then(response => {
                        let res = JSON.parse(Base64.decode(response.data));
                        this.list = res.list;
                    },response => {
                    })
            }
        }
    }
</script>
<style>
    .mint-popup-bottom{
        width: 90%;
        min-height: 150px;
        height: auto;
        bottom: 10px;
        -webkit-border-radius: 8.5px;
        -moz-border-radius: 8.5px;
        border-radius: 8.5px;
    }
    .ivu-collapse-content{ background-color: #F5F5F5;}
    .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header{ background-color: white;font-size: 15px;}
    .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header>i{
        position: absolute;
        top: 0;
        right: 0;
    }
    .ivu-collapse-content>.ivu-collapse-content-box{font-size:15px;color:#999;}
    .ivu-collapse>.ivu-collapse-item.ivu-collapse-item-active>.ivu-collapse-header>i{
        position: absolute;
        top: 30px;
        right: 0;
    }
    .ivu-icon-arrow-right-b:before{
        content: "\F3D3";
        position: absolute;
        top: 10px;
        right: 10px;
    }
  #help-center .mint-tab-item-label{
    font-size:15px;
  }
</style>
<style scoped>
  .phone-call-number{ font-size: 16.5px;}
  .phone-call-time{font-size: 11.5px;color: #999999;}
   *{ font-family: PingFangSC-Medium,sans-serif;}
    .phone-call-list{ list-style: none;text-align: center;}
    .phone-call-list li{
        min-height: 37px;
        height: auto;
        padding: 5px 0;
        border-bottom: 1px solid #e9e9e9;
    }
    .cancel-font{ font-size: 14.5px;}
    .phone-call-list li:nth-child(2), .phone-call-list li:nth-child(3){
      font-size: 13.5px;
      text-align: center;
    }
    .phone-call-list li:first-child{ color: #999999;font-size: 14.5px}
    .phone-call-list li:last-child{ border-bottom: 0;}
    .phone-call-list li a{ color: #0f91ed;}
    .call-bar{
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 15px;
      width: 150px;
      margin-top: 50px;
      margin-left: auto;
      margin-right: auto;
      background-color: #fff;
      color: #f4ac31;
      -webkit-border-radius: 20px;
      -moz-border-radius: 20px;
      border-radius: 20px;
      border: 1px solid #f4ac31;
    }
    .basics{
        background-color: white;
        height: 38px;
        line-height: 38px;
        font-weight: 600;
        font-size: 15.5px;
        color: #333333;
        padding-left: 30px;
    }
    .mint-tab-item{ position: relative;color: #96A0B7;font-weight: 600;}
    .mint-tab-item:before{
        content: "";
        display: inline-block;
        position: absolute;
        top: 30px;
        right: 0;
        height: 40%;
        border-right: 1px solid #e9e9e9;
    }
    .mint-tab-item:last-child:before{
        border-right: 0;
    }
    .page-part .mint-tab-item-label{
      font-size: 14px;
    }

    .pic1{ background: url("../assets/images/pic_cztx.jpg") no-repeat center;}
    .pic2{ background: url("../assets/images/pic_dlzc.jpg") no-repeat center;}
    .pic3{ background: url("../assets/images/pic_aqbz.jpg") no-repeat center;}
    .pic-item{
        width: 75px;
        height: 75px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 25px;
        background-size: 100% 100%;
    }
    .help{
        font-family: "微软雅黑体";
        width: 100%;
        height: 100%;
        position: fixed;
        top:0px;
        z-index: 1;
        left: 0;
        overflow-y: auto;
        background-color: #fff;
        padding-bottom: 48px;
        -webkit-overflow-scrolling: touch;
    }
    .weixin {
      top: 48px;
    }
    .mint-navbar .mint-tab-item.is-selected{
        border-bottom: 3px solid #F4AC31;
        color: #F4AC31;
    }
    @media screen and (min-width: 414px) {
      .phone-call-list li:nth-child(2), .phone-call-list li:nth-child(3){
        padding-left: 20px;
        font-size: 14.5px;
      }
    }
    @media screen and (min-width: 320px) and (max-width: 374px) {
        .call-bar{ margin-top: 10px;font-size: 15px;}
      .phone-call-number{
        font-size: 15.5px;
      }
      .phone-call-time{
        font-size: 10px;color: #999999;
      }
    }
</style>
