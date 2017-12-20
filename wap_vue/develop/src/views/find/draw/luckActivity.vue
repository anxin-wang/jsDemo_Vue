<template>
    <div class="luckActivity">
        <img src="../../../assets/images/mall/activity/Artboard_01.gif" alt="">
        <img src="../../../assets/images/mall/activity/Artboard_02.gif" alt="">
        <img src="../../../assets/images/mall/activity/Artboard_03.gif" alt="">
        <img src="../../../assets/images/mall/activity/Artboard_04.gif" alt="">
        <img src="../../../assets/images/mall/activity/Artboard_05.gif" alt="">
        <img src="../../../assets/images/mall/activity/Artboard_06.gif" alt="">
        <div @click.stop="wxDown" class="AppDown">
            <img src="../../../assets/images/mall/activity/down.png" alt="">
        </div>
    </div>
</template>
<script>
    import { Indicator } from 'mint-ui'
    export default {
        name:"Integral",
        data () {
            return{

            }
        },
        mounted () {

        },
        methods: {
            wxDown(){
                window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=cn.jianguolicai.app"
            },
            userName(){
                let name = window.storeWithExpiration.get('MallUserName')
                if(name != null){
                    return name
                }else{
                    return '15221355211'
                }
            },
            userPwd(){
                let pwd = window.storeWithExpiration.get('MallUserPwd')
                if(pwd != null){
                    return pwd
                }else{
                    return '123456'
                }
            }
        },
    }

</script>
<style scoped lang="less">
    @import "../../../assets/css/common.less";
    .luckActivity{
        width:100%;
        height:100%;
        position:relative;
        > img{
            width:100%;
        }
        .AppDown{
            width:80%;
            height:50px;
            position:absolute;
            left:50%;
            bottom:0%;
            -webkit-transform:translate(-50%,-50%);
            -moz-transform:translate(-50%,-50%);
            transform:translate(-50%,-50%);
            img{
                width:100%;

            }
        }
    }
</style>