<template>
  <iframe id="myframe" src="/test" width="100%" height="" scrolling="yes" />
</template>
<script>
  export default {
    name: 'shoPage',
    mounted () {
      this.$nextTick(function(){
          this.inits();
      })
    },
    methods: {
      inits () {
        let url = this.$route.params.url;
        let title = this.$route.params.title;
        this.setTitle(title);
        document.getElementById("myframe").src = url;
      },
      setTitle (name) {//设置头部
        let obj = this.$route.matched[0];
        obj.meta.Title = name;
      }
    }
  }
</script>
<style scoped>

</style>
