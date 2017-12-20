<template>
  <div class="pro-introduce">
    <div class="box-container" v-html="appdealstructure"></div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui'

  var baseURL = window.location.protocol+"//"+window.location.host;

  export default {
    data() {
      return {
        appdealstructure: '',
      };
    },
    mounted () {
      this.$nextTick(function(){
        Indicator.open({ spinnerType: 'fading-circle' })
        this.info();
      })
    },
    methods: {
      info () {
        let _self = this;
        setTimeout(function(){
          let appdealstructure = storeWithExpiration.get('APPDEALSTRUCTURE');
          if(appdealstructure.indexOf("img") > -1){
            let str = appdealstructure.substring(appdealstructure.lastIndexOf("=") + 2, appdealstructure.lastIndexOf("\""));
            if(str.indexOf("./") > -1){
              str = str.substr(1, str.length);
              _self.appdealstructure = "<img width='100%' src='"+ baseURL + str +"'>";
            }else{
              _self.appdealstructure = appdealstructure;
            }
          }
          Indicator.close();
        },500)
      }
    }
  }
</script>

<style scoped>

</style>
