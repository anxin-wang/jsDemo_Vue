<template>
  <div id="Form11">
    <iframe  ref="previewIframe" frameborder="0" src="/wap_vue/#/iframe_html" width="100%" scrolling="yes" security="restricted" id="previewIframe" />
  </div>
</template>
<script>
import { Toast } from 'mint-ui'

export default {
    name:'Form11',
    data () {
        return {
            popupVisible4:false
        }
    },
    mounted() {
        let H = document.documentElement.clientHeight-55
        let mainFrame = document.getElementById('previewIframe')
        mainFrame.style.height = H +"px";
    },
    methods:{

    }
}
</script>
<style>

</style>