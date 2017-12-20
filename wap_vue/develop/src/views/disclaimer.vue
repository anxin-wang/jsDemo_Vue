<template>
  <div class="activityInfo">
    <iframe id="iframe" frameborder="0" width="100%"  src="/test"></iframe>
  </div>
</template>
<script>
  export default {
    name: 'activityInfo',
    mounted () {
      this.$nextTick(function (){
        this.load();
      })
    },
    methods: {
      load () {
        const URL = storeWithExpiration.get("DISCLAIMER");
        const baseUrl = this.$store.state.baseUrl;
        document.getElementById('iframe').src= baseUrl + '/' + URL ;
        document.getElementById('iframe').style.height = document.body.clientHeight +"px";
      }
    }
  }
</script>
<style>
  html, body{ height: 100% }
</style>
<style scoped>
</style>
