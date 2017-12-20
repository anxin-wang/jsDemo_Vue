<template>
  <div class="pro-introduce">
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">产品详情</mt-tab-item>
      <mt-tab-item id="2">相关资料</mt-tab-item>
      <mt-tab-item id="3">风险控制</mt-tab-item>
      <mt-tab-item id="4">交易结构</mt-tab-item>

    </mt-navbar>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
         <div class="box-container" v-html="appdescription"></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="zlpl-item">
          <div class="zlpl-box" v-for="(item,index) in datadisclosure" @click="bigPic(index)">
            <img :src="item"/>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="box-container" v-html="risksecurity"></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
         <div class="box-container" v-html="appdealstructure"></div>
      </mt-tab-container-item>
    </mt-tab-container>

    <div class="box-list"  v-if="showBox"  @click="closeBigPic()">
      <div class="box-item">
        <mt-swipe :auto="0" :show-indicators="false" @change="handleChange" :defaultIndex="handleChanges" class="big-screen">
          <mt-swipe-item v-for="(item,index) in datadisclosure" :key="index">
            <img :src="item"/>

          </mt-swipe-item>
          <p class="screen-num-item">
            {{handleChanges + 1}} / {{ datadisclosure.length }}
          </p>
        </mt-swipe>

      </div>
    </div>

  </div>
</template>
<script>

  var host = window.location.host;
  var prot = window.location.protocol;
  var baseURL = prot+"//"+host;

  import { Indicator } from 'mint-ui'
  import { Swipe, SwipeItem } from 'mint-ui';
export default {
  name: 'proIntroduce',
  data() {
    return {
      selected: '1',
      appdescription: '',
      risksecurity: '',
      appdealstructure: '',
      datadisclosure: [],
      showBox: false,
      handleChanges: 0
    };
  },
  mounted () {
    this.$nextTick(function(){
      Indicator.open({ spinnerType: 'fading-circle' })
      this.info();
    })
  },
  methods: {
    handleChange (index) {
      this.handleChanges = index
    },
     closeBigPic () {
       this.showBox = false;
     },
     bigPic (index) {
        let _self = this;
        _self.showBox = true;
        _self.handleChanges = index;
     },
     info () {
       let _self = this;
       setTimeout(function(){
         debugger
         let appdescription = storeWithExpiration.get('APPDESCRIPTION');
         let risksecurity = storeWithExpiration.get('RISKSECURITY');
         let appdealstructure = storeWithExpiration.get('APPDEALSTRUCTURE');
         _self.appdescription = appdescription;
         _self.risksecurity = risksecurity;




         if(appdealstructure.indexOf("img") > -1){
           let str = appdealstructure.substring(appdealstructure.lastIndexOf("=") + 2, appdealstructure.lastIndexOf("\""));
           if(str.indexOf("./") > -1){
              str = str.substr(1, str.length);
             _self.appdealstructure = "<img width='100%' src='"+ baseURL + str +"'>";
           }else{
             _self.appdealstructure = appdealstructure;
           }
         }



         let obj = storeWithExpiration.get('DATADISCLOSURE');
         obj = JSON.parse(obj)


         if(obj != null && obj != ""){
           obj.forEach(function(val ,index, array){
             _self.datadisclosure.push(val);
           });
         }


         Indicator.close();
       },500)
     }
  }
}
</script>
<style>
  .mint-swipe-item img{ width: 100%;}
</style>
<style scoped>
  .screen-num-item{
    color: #fff;
    position: fixed;
    bottom:20px;
    left: 48%;
  }
  .big-screen{
    height: 450px;
    text-align: center;
  }
  .box-container{ margin-top: 8px}
  .box-list{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,1);
  }
  .box-item{
    position: absolute;
    top: 36%;
    left: 0;
    width: 100%;
    min-height: 300px;
    background-color: rgba(0,0,0,1);
    margin: -45% 0 0 0;
  }
  .box-item img{
    max-width: 375px;
    width: auto;
    height: 100%;
  }
  .zlpl-box {
    display: inline-block;
    vertical-align: middle;
    width: 33.33%;
    height: 148.5px;
  }
  .zlpl-box img{
    width: 100%;
    height: 100%;
    border: 0;
    padding:  55px;
    display: inline-block;
    vertical-align: middle;
  }
  .pro-introduce{ padding: 0 5px;}
  .mint-navbar .mint-tab-item.is-selected{
    color: #f4ad31;
    border-bottom: 2px solid #f4ad31!important;
    margin-bottom: 0!important;
  }
  .zlpl-item{
    width: 100%;
  }
  @media screen and (min-width: 320px) and (max-width: 374px) {
    .zlpl-item{ width: 95%;margin: 0 auto; }
    .zlpl-box {width: 80px; height: 100px; }
    .zlpl-box img{ padding: 45px;}
    .big-screen{ height: 390px;}
    .screen-num-item{ bottom:10px; }
  }
  @media screen and (min-width: 414px) {
    .box-item img{ max-width: 100%;width: 100%;}
    .zlpl-item{
      width: 90%;
      margin: 0 auto;
    }
    .box-item{
      top: 40%;
    }
  }
</style>
