<template>
  <div class="MallBanner">
    <yd-slider autoplay="3000">
      <yd-slider-item v-for="item,key in bannerList" :key="key">
        <img @click.top="test(item.href_url)" :src="item.adv_imgurl | bannerimgurl">
      </yd-slider-item>
    </yd-slider>
  </div>
</template>

<script>
/*轮播*/
import Vue from 'vue';
import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider';
Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);
export default {
    props:{
        getData:{}
    },
    data () {
      return {
          defaultImg:require('../../../assets/images/wxbanner_bg.jpg'),
          bannerList:[]
      }
    },
    mounted () {
      this.bannerInfo()
        let winUrl = window.location.href;
        this.bannerList = [
            {adv_imgurl:this.defaultImg,href_url:winUrl}
        ];
    },
    methods:{
        /*获取轮播图片列表*/
        bannerInfo: function () {
            let _self = this;
            let url = '/mapi2/index.php'
            let Base64 = require('js-base64').Base64
            let getData = _self.getData
            _self.$http.get(url,{params:{
                act: 'IntegralAdvactivity',
                r_type: '1',
                style:4
              }
            }).then(function (response) {
                let res = response.data
                if(res.list != null){
                    _self.bannerList = res.list;
                }else{
                    let winUrl = window.location.href;
                    _self.bannerList = [
                        {adv_imgurl:_self.defaultImg,href_url:winUrl}
                    ];
                }
            });
        },
        test(val){
            /*sliderCont*/
            storeWithExpiration.set("urlCont",val,86400000)
            if(val != null && val != ''){
                location.href = '/wap_vue/#/sliderCont'
            }
        }
    },
    filters:{
        bannerimgurl (url){
            let _self = this
            if(url != null && url != ""){

                //获取完整路径 为: http://localhost:6981/InspectionData/TEST.html
                var fullPath=window.document.location.href;

                //获取主机地址之后的路径 为: /InspectionData/TEST.html
                var pathName=window.document.location.pathname;

                //获取主机地址之后的路径长度 为: /InspectionData/TEST.html的长度为25
                var pos=fullPath.indexOf(pathName);

                //获取主机地址 为: http://localhost:6981
                var localhostPath=fullPath.substring(0,pos);

                if(url.indexOf("./") > -1){
                    var l = url.substr(1, url.length);
                    let host = window.location.host;
                    if(host != 'localhost:8080'){
                        return localhostPath + l;
                    }else{
                        return 'http://develop.jianguolicai.cn/'+ l;
                    }

                }else{
                    return url;
                }
            }else {
                return _self.defaultImg
            }
        },
        bannerUrl (url) {
            let winUrl = window.location.href;
            if(url != url){
                return url
            }else{
                return winUrl
            }
        }
    }
}
</script>

<style scoped>
.MallAnnouncement{
  background:white;
  text-align: center;
  position:relative;
}
.MallAnnouncement:before{
  content:'';
  width:18px;
  height:18px;
  background:url("../../../assets/images/mall/index/new.png") no-repeat;
  background-size:100%;
  position:absolute;
  left:15px;
  top:5px;
}

</style>
