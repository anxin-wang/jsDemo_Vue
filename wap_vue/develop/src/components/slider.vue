<template>
  <div class="MallBanner">
    <yd-slider autoplay="3000">
      <yd-slider-item v-for="item in sliderList">
        <a :href="item.href_url | bannerUrl">
          <img :src="item.adv_imgurl | bannerimgurl">
        </a>
      </yd-slider-item>
    </yd-slider>
  </div>
</template>

<script>
export default {
  props:{
      getData:[]
  },
  data () {
    return {
        sliderList:[]
    }
  },
  mounted () {
      this.bannerInfo()
  },
  methods:{
      /*获取轮播图片列表*/
      bannerInfo: function () {
          var _self = this;
          var url = '/mapi2/index.php'
          _self.$http.get(url,{
              params: {
                  act: 'IntegralAdvactivity',
                  r_type: '1',
                  style:4
              }
          }).then(function (response) {
              let res = response.data
              if(res.list != null){
                  _self.sliderList = res.list;
              }else{
                  let winUrl = window.location.href;
                  _self.sliderList = [
                      {adv_imgurl:_self.defaultImg,href_url:winUrl}
                  ];
              }
          });
      }
  },
  filters:{
      bannerimgurl (url){
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
                  if(localhostPath != 'http://localhost:8080'){
                      return localhostPath + l;
                  }else{
                      return _self.defaultImg
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
</style>
