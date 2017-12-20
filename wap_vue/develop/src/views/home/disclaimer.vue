<template>
  <div class="disclaimer">
    this is 免责申明
  </div>
</template>
<script>
  export default {
    name: 'disclaimer',
    mounted () {
      this.$nextTick(function(){
          //this.info();
      })
    },
    methods: {
      info (){
        let Base64 = require('js-base64').Base64;
        let url = 'index.php?&ctl=apphtml/disclaimer';
        this.$http.get(url)
          .then(response => {
            let res = JSON.parse(Base64.decode(response.data));
            console.log(res)
          },response => {

          })
      }
    }
  }
</script>
<style scoped>

</style>
