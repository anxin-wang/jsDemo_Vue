<template>
  <div class="insurance">
    <div class="content" v-html="list.content"></div>
  </div>
</template>
<script>
export default {
  name: 'insurance',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.$nextTick(function(){
        this.info();
    })
  },
  methods: {
    info () {
      let Base64 = require('js-base64').Base64;
      let url = '/mapi2/index.php?&act=safe';
      this.$http.get(url)
        .then(response => {
          let res = JSON.parse(Base64.decode(response.data));
          this.list = res.safe;
        },response => {

        })
    }
  }
}
</script>
<style scoped>
.content{ padding: 1em 1em;}
.content img{ width: 100%;}
</style>
