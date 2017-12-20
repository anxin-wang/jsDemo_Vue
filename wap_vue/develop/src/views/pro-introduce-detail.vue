<template>
  <div class="pro-introduce">
    <div class="box-container" v-html="appdescription"></div>




  </div>
</template>
<script>
  import { Indicator } from 'mint-ui'
  export default {
    data() {
      return {
        appdescription: '',
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
          let appdescription = storeWithExpiration.get('APPDESCRIPTION');
          _self.appdescription = appdescription;
          Indicator.close();
        },500)
      }
    }
  }

</script>

<style scoped>

</style>
