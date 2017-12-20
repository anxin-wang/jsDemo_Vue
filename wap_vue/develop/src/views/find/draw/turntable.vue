<template>
    <div class="turntable">
            <img src="../../../assets/images/mall/index/1.png" alt="" id="shan-img" class="hide">
            <img src="../../../assets/images/mall/index/2.png" alt="" id="shan-img1" class="hide">
        <div class="banner">
            <div class="turnplate">
                <canvas class="item" id="wheelcanvas" width="422px" height="422px"></canvas>
                <img class="pointer" v-if="activityInfo.response_code == 1" @click.stop="pointer()" src="../../../assets/images/mall/index/turnplate-pointer.gif"/>
                <img class="pointer" v-if="activityInfo.response_code != 1" src="../../../assets/images/mall/index/turnplate-pointer2.gif"/>
            </div>
        </div>
    </div>
</template>
<script>
    import '../../../assets/css/reset.css'
    import '../../../assets/js/jquery.rotate.min.js'
    import { Indicator } from 'mint-ui'
    export default {
        name:"Integral",
        data () {
            return{
                turnplate:{
                    restaraunts:[],				//大转盘奖品名称
                    colors:[],					//大转盘奖品区块对应背景颜色
                    outsideRadius:180,			//大转盘外圆的半径
                    textRadius:155,				//大转盘奖品位置距离圆心的距离
                    insideRadius:68,			//大转盘内圆的半径
                    startAngle:0,				//开始角度
                    bRotate:false				//false:停止;ture:旋转
                },
                goodsList:[],
                activity:[],
                activityInfo:"",
                isLuck:true
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
                    storeWithExpiration.set("lotteryActivity",res,86400000)
                    _that.activityInfo = res
                    if(res.response_code == 1){
                        _that.goodsList = res.goods
                        _that.activity = res.activity
                        //动态添加大转盘的奖品与奖品区域背景颜色
                    }
                    _that.turnplate.restaraunts = res.goods
                    _that.turnplate.colors = [
                        "#FFF4D6", "#FFFFFF", "#FFF4D6",
                        "#FFFFFF","#FFF4D6",
                        "#FFFFFF", "#FFF4D6", "#FFFFFF",
                        "#FFF4D6", "#FFFFFF"];
                    _that.drawRouletteWheel()
                    _that.canvasPointer()
                    _that.$emit('activityRule', res)
                    Indicator.close()
                });
        },
        pointer(){
            let _that = this
            if(_that.isLuck != false){
                let Base64 = require('js-base64').Base64
                let url = '/mapi2/index.php'
                _that.$http.get(url, {params:{
                    act: 'uc_lottery',
                    id:_that.activity.id,
                    email:_that.userName(),
                    pwd:_that.userPwd(),
                }}).then(function (response) {
                    let res = JSON.parse(Base64.decode(response.data));
                    _that.$emit('popuphide', res)
                    //获取随机数(奖品个数范围内)
                    var goodsId = res.lag_id
                    if(goodsId != undefined){
                        _that.isLuck = false
                        var arrData = _that.turnplate.restaraunts
                        for(var i = 0; i < arrData.length; i++) {
                            if(arrData[i].id == goodsId){
                                var item = (i+1)
                            }
                        }
                        if(item == undefined){
                            if(_that.turnplate.bRotate)return;
                            _that.turnplate.bRotate = !_that.turnplate.bRotate;
                        }else{
                            _that.canvasPointer(item, _that.turnplate.restaraunts[item-1]);
                        }
                        _that.isLuck = false
                    }
                });
            }


        },
        canvasPointer(item,txt){
            let _that = this
            //旋转转盘 item:奖品位置; txt：提示语;
            var angles = item * (360 / _that.turnplate.restaraunts.length) - (360 / (_that.turnplate.restaraunts.length*2));
            if(angles<270){
                angles = 270 - angles;
            }else{
                angles = 360 - angles + 270;
            }
            $('#wheelcanvas').stopRotate();
            $('#wheelcanvas').rotate({
                angle:0,
                animateTo:angles+1800,
                duration:8000,
                callback:function (){
                    _that.isLuck = true
                    /*alert("恭喜你获得"+txt.good_name);*/
                    let info = {
                        name:txt.good_name,
                        id:txt.good_id
                    }
                    _that.$emit('callbackInfo', info)
                    _that.turnplate.bRotate = !_that.turnplate.bRotate;
                }
            });
        },
        //页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
        drawRouletteWheel(beauty){
            let _that = this
            var canvas = document.getElementById("wheelcanvas");
            if (canvas.getContext) {
                //根据奖品个数计算圆周角度
                var arc = Math.PI / (_that.turnplate.restaraunts.length/2);
                var ctx = canvas.getContext("2d");
                //在给定矩形内清空一个矩形
                ctx.clearRect(0,0,422,422);
                //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
                ctx.strokeStyle = "#FFBE04";
                //font 属性设置或返回画布上文本内容的当前字体属性
                ctx.font = '16px Microsoft YaHei';
                for(var i = 0; i < _that.turnplate.restaraunts.length; i++) {
                    var angle = _that.turnplate.startAngle + i * arc;
                    ctx.fillStyle = _that.turnplate.colors[i];
                    ctx.beginPath();
                    //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
                    ctx.arc(211, 211, _that.turnplate.outsideRadius, angle, angle + arc, false);
                    ctx.arc(211, 211, _that.turnplate.insideRadius, angle + arc, angle, true);
                    ctx.stroke();
                    ctx.fill();
                    //锁画布(为了保存之前的画布状态)
                    ctx.save();

                    //----绘制奖品开始----
                    ctx.fillStyle = "#E5302F";
                    var text = _that.turnplate.restaraunts[i].good_name;
                    var line_height = 17;
                    //translate方法重新映射画布上的 (0,0) 位置
                    ctx.translate(211 + Math.cos(angle + arc / 2) * _that.turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * _that.turnplate.textRadius);

                    //rotate方法旋转当前的绘图
                    ctx.rotate(angle + arc / 2 + Math.PI / 2);

                    /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/

                    if(text.indexOf("coupon")>0){//流量包
                        var texts = text.split("M");
                        for(var j = 0; j<texts.length; j++){
                            ctx.font = j == 0?'bold 20px Microsoft YaHei':'16px Microsoft YaHei';
                            if(j == 0){
                                ctx.fillText(texts[j]+"M", -ctx.measureText(texts[j]+"M").width / 2, j * line_height);
                            }else{
                                ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                            }
                        }
                    }else if(text.indexOf("coupon3") == -1 && text.length>6){//奖品名称长度超过一定范围
                        text = text.substring(0,6)+"||"+text.substring(6);
                        var texts = text.split("||");
                        for(var j = 0; j<texts.length; j++){
                            ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                        }
                    }else{
                        //在画布上绘制填色的文本。文本的默认颜色是黑色
                        //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                    }
                    /*var beauty = new Image();
                    var ImgUrl = _that.turnplate.restaraunts
                    var ImgUrl = ImgUrl[i].utter_img_url
                    beauty.src = ImgUrl
                    beauty.onload = function(){
                        ctx.drawImage(beauty,-30,20,60,30)
                    }*/
                    ctx.restore();
                    //把当前画布返回（调整）到上一个save()状态之前
                    ctx.restore();
                    //----绘制奖品结束----
                }
            }
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
    filters:{
        bannerimgurl (url){
            let _self = this
            if(url != null && url != ""){

                //获取完整路径 为: http://localhost:6981/InspectionData/TEST.html
                var fullPath=window.document.location.href;

                //获取主机地址之后的路径 为: /InspectionData/TEST.html
                var pathName=window.document.location.pathname;

                //获取主机地址之后的路径长度 为: /InspectionData/TEST.html的长度为25
                var pos=fullPath.indexOf(pathName);

                //获取主机地址 为: http://localhost:6981
                var localhostPath=fullPath.substring(0,pos);

                if(url.indexOf("./") > -1){
                    var l = url.substr(1, url.length);
                    if(localhostPath != 'http://localhost:8080'){
                        return localhostPath + l;
                    }else{
                        return 'http://develop.jianguolicai.cn/' + l;
                    }

                }else{
                    return url;
                }
            }else {
                return require('../../../assets/images/goods_bg.gif')
            }
        },
    }
}

</script>
<style scoped lang="less">
@import "../../../assets/css/common.less";

</style>