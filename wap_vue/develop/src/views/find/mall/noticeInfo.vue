<template>
    <div class="notice pl15 pr15 pt10">
        {{content}}
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
import { Indicator } from 'mint-ui'
export default {
    data() {
        return {
            content: ""
        }
    },
    mounted(){
        this.content = this.$route.params.info
    },
    methods: {
        userName(){return window.storeWithExpiration.get('MallUserName')},
        userPwd(){return window.storeWithExpiration.get('MallUserPwd')}
    }
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/common.less";

</style>