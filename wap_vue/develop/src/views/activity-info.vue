<template>
  <div class="activityInfo">
    <iframe v-show="containerVal == 0"  id="iframe" frameborder="0" width="100%" style="width: 100%;" src="/"></iframe>
    <img v-show="containerVal == 1" id="img" class="img-pic" :src= "imgUrl"/>
    <!--<iframe id="iframe" frameborder="0" sandbox="allow-forms"  src="http://develop.jianguolicai.cn/public/attachment/201708/31/10/da767668896e90a4db2d330c60f1e031.jpg"></iframe>-->
  </div>
</template>
<script>
  import { Indicator } from 'mint-ui'
  export default {
     name: 'activityInfo',
    mounted () {
      this.$nextTick(function (){
        this.load();
      })
    },
    data () {
      return {
         containerVal: null,
         imgUrl: null
      }
    },
    methods: {
       load () {
         let obj = storeWithExpiration.get("ACTIVITYURL");
         let _self = this;
         obj = JSON.parse(obj);
         if(obj.url != null && obj.url != ''){

           if(obj.url.indexOf(".com") > - 1 || obj.url.indexOf(".php") || obj.url.indexOf(".html")){
             _self.containerVal = 0;
             let setHeader = _self.$route.matched[0];
             setHeader.meta.Title = obj.title;
             document.getElementById('iframe').src = obj.url ;
             document.getElementById('iframe').style.height = document.body.clientHeight +"px";
           }else{
             _self.containerVal = 1;
             _self.imgUrl = obj.url;
           }

         }
       }
    }
  }

</script>
<style>
  html, body{ height: 100% }
  iframe html body img{ width: 100%!important;}
</style>
<style scoped>
.img-pic{ width: 100%;}
</style>
