<template>
    <div class="turntable-box">
        <div class="turntable-bg">
            <img src="../../../assets/images/mall/ly-plate-c.gif" alt="turntable"/>
            <div class="rotate" >
                <img id="rotate" src="../../../assets/images/mall/turntable2.gif" alt="turntable"/>
            </div>
            <div class="pointer" @click.stop="pointer()">
                <img src="../../../assets/images/mall/turnplate-pointer.gif" alt="pointer"/>
            </div>
        </div>
    </div>
</template>
<script>
import '../../../assets/js/awardRotate.js'
import { Indicator } from 'mint-ui'
export default {
    name:"Integral",
    data () {
        return{
            activityInfo:'',
            bRotate:false,
            isLuck:true,
            turnplate:[],
            insideRadius:[
                {level:9,code:340},
                {level:1,code:20},
                {level:5,code:60},
                {level:3,code:100},
                {level:8,code:140},
                {level:2,code:180},
                {level:6,code:220},
                {level:7,code:260},
                {level:4,code:300},
                {level:9,code:340},
            ]
        }
    },
    mounted () {
        this.scoreLottery()
    },
    methods: {
        /*活动接口*/
        scoreLottery(){
            let _that = this;
            let Base64 = require('js-base64').Base64
            let url = '/mapi2/index.php'
            let formData = new FormData()
            formData.append("act",'score_lottery_activity')
            formData.append("email",_that.userName())
            formData.append("pwd",_that.userPwd())
            Indicator.open({ spinnerType: 'fading-circle' })
            _that.$http.post(url, formData)
                .then(function (response) {
                    let res = JSON.parse(Base64.decode(response.data));
                    _that.activityInfo = res
                    _that.turnplate = res.goods
                    _that.$emit('activityRule', res)
                    Indicator.close()
                });
        },
        pointer(){
            let _that = this
            let Base64 = require('js-base64').Base64
            let url = '/mapi2/index.php'
            var act_id = _that.activityInfo.activity.id
            if(_that.isLuck == true){
                _that.$http.get(url, {params:{
                    act: 'uc_lottery',
                    id:act_id,
                    email:_that.userName(),
                    pwd:_that.userPwd(),
                }}).then(function (response) {
                    let res = JSON.parse(Base64.decode(response.data));
                    _that.$emit('pointerInfo', res)
                    //获取随机数(奖品个数范围内)
                    var goods_id = res.lag_id
                    if(goods_id != undefined){
                        _that.isLuck = false
                        let dj = _that.insideRadius
                        for(var i =0;i<dj.length;i++){
                            if(res.level == dj[i].level){
                                var item = dj[i].level
                                var angless = dj[i].code
                            }
                        }
                        _that.rotateFn(item,angless, _that.turnplate[item-1]);
                    }
                });
            }

        },
        rotateFn(item,angless, txt){
            let _that = this
            //旋转转盘 item:奖品位置; txt：提示语;
            var angles = item * (360 / _that.turnplate.length) - (360 / (_that.turnplate.length*2));
            if(angles<270){
                angles = 270 - angles;
            }else{
                angles = 360 - angles + 270;
            }
            $('#rotate').stopRotate();

            $('#rotate').rotate({

                angle:0,

                animateTo:angless+1800,

                duration:3000,

                callback:function (){
                    let info = {
                        name:txt.good_name,
                        id:txt.good_id
                    }
                    _that.$emit('callbackInfo', info)
                    _that.isLuck = true
                    _that.bRotate = !_that.bRotate;

                }

            })
        },
        rnd(n, m){
            return Math.floor(Math.random()*(m-n+1)+n)
        },
        userName(){
            return window.storeWithExpiration.get('MallUserName')
        },
        userPwd(){
            return window.storeWithExpiration.get('MallUserPwd')
        }
    },
}
</script>
<style scoped lang="less">
    @import "../../../assets/css/common.less";
.turntable-box{
    width:100%;
    margin:10px auto;
    .turntable-bg{
        position: relative;
        width:100%;
        img{width:100%;}
        .rotate{
            width:78%;
            position:absolute;
            left:50%;
            top:50%;
            -webkit-transform:translate(-50%,-50%);
            -moz-transform:translate(-50%,-50%);
            transform:translate(-50%,-50%);
            img{width:100%;}
        }
        .pointer{
            width:40%;
            position:absolute;
            left:50%;
            top:48%;
            -webkit-transform:translate(-50%,-50%);
            -moz-transform:translate(-50%,-50%);
            transform:translate(-50%,-50%);
            img{width:100%;}
        }
    }
}
</style>