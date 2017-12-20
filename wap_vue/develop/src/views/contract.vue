<template>
  <div class="contract">
    <iframe id="iframe" frameborder="0" width="100%"  src="/test"></iframe>
  </div>
</template>
<script>
export default {
  name: 'contract',
  mounted () {
    this.$nextTick(function(){
        this.info();
    })
  },
  methods: {
      userName () {
          return window.storeWithExpiration.get('user_name')
      },
      userPwd () {
          return window.storeWithExpiration.get('user_pwd')
      },
    info (){
      let id = this.$route.params.id;
      let deal_sn = this.$route.params.deal_sn;
      let SHOWPDF = storeWithExpiration.get('SHOWPDF');

      let user_name = this.userName();
      let user_pwd = this.userPwd();
      let url = this.$store.state.baseUrl + "/index.php?is_pc=1&ctl=tool&act=downloadPdf&win=1&id=" + id + '&deal_sn=' +  deal_sn + '&email=' + user_name
        + '&pwd=' + user_pwd;
      let defaultUrl = this.$store.state.baseUrl + '/wap_vue/develop/src/assets/pdf/web/viewer.html?file='+ encodeURIComponent(url)
      document.getElementById('iframe').src = defaultUrl;
      document.getElementById('iframe').style.height = document.body.clientHeight +"px";
    }
  }
}
</script>
<style>html, body{ height: 100% }</style>
<style scoped></style>
