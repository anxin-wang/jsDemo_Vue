<template>
  <div class="couponRule">
    <iframe id="iframe" frameborder="0" width="100%"  src="/test"></iframe>
  </div>
</template>
<script>
  export default {
    name: 'couponRule',
    mounted () {
      this.$nextTick(function(){
          this.info();
      })
    },
    methods: {
      info (){
        let url = this.$store.state.baseUrl +  '/index.php?ctl=coupon_rule';
        document.getElementById('iframe').src= url ;
        document.getElementById('iframe').style.height = document.body.clientHeight +"px";
      }
    }
  }
</script>
<style> html, body{ height: 100% }</style>
<style scoped>
.couponRule{
  font-family: "微软雅黑体";
  background-color: #F5F5F5;
  position: fixed;
  top: 45px;
  left: 0;
  width: 100%;
  height: 100%;
  padding-bottom: 45px;
  overflow-y: auto;
}
</style>
