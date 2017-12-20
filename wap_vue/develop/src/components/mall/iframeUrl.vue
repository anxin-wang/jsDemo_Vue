<template>
  <div >
    <iframe id="ifr" frameborder="0" width="100%" :height="hg" :src="url"></iframe>
  </div>
</template>
<script>
export default {
    data () {
        return{
            url:'',
            hg:''
        }
    },
    mounted () {
        let user_pwd = window.storeWithExpiration.get('urlCont')
        this.url = user_pwd
        this.hg = window.screen.height +"px";
        this.ifRemote()
    },
    methods:{
        ifRemote (){
            var $mainFrame=$('#main-frame');
        }
    }
}
</script>
<style scoped>
</style>