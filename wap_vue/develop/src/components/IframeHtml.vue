<template>
  <div id="AddHtml">
    跳转中.....
  </div>
</template>
<script>
export default {
    data () {
        return{
        }
    },
    mounted () {
        var Newhtml =  window.storeWithExpiration.get('api_rechargesdk')
        var MatchForm = Newhtml.match(/<form [\s\S]*<\/form>/)
        document.getElementById('AddHtml').innerHTML = MatchForm
        document.form1.submit()
        storeWithExpiration.set("api_rechargesdk","",);
    },
    methods:{
    }
}
</script>
<style scoped>
</style>