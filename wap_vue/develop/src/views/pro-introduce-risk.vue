<template>
  <div class="pro-introduce">
    <div class="box-container" v-html="risksecurity"></div>
  </div>
</template>
<script>
  import { Indicator } from 'mint-ui'

  export default {
    data() {
      return {
        risksecurity: '',
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
         let risksecurity = storeWithExpiration.get('RISKSECURITY');
         _self.risksecurity = risksecurity;
         Indicator.close();
       },500)
     }
  }
}
</script>

