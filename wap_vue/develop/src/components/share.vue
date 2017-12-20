<template>
  <div class="Share">
    <div class="popupBox" v-show="sharePopup" >
      <div class="popupBg" @click.stop="Popup"></div>
      <div class="sharePopup">
        <div class="popupTitle">分享给朋友</div>
        <div class="popupType">
          <ul class="clear">
            <li @click.stop="frienShare2">
              <p><img src="../assets/images/ucenter/share_weixin@3x.png" alt=""></p>
              <p>微信</p>
            </li>
            <li @click.stop="friendShare">
              <p><img src="../assets/images/ucenter/share_pengyouquan@3x.png" alt=""></p>
              <p>朋友圈</p>
            </li>
            <li @click.stop="frienShare3">
              <p><img src="../assets/images/ucenter/share_qq@3x.png" alt=""></p>
              <p>QQ</p>
            </li>
            <!--<li>
              <p><img src="../assets/images/Financial/xl.png" alt=""></p>
              <p>新浪</p>
            </li>-->
            <li @click.stop="Showerwem">
              <p><img src="../assets/images/Financial/erwem.png" alt=""></p>
              <p>二维码</p>
            </li>
          </ul>
        </div>
        <div class="closePopup" @click.stop="Popup">取消</div>
      </div>
    </div>
    <div class="popupBox" v-show="wxCodePopup">
      <div class="popupBg" @click.stop="wxCodePopup = false"></div>
      <div class="popupCon">
        <img src="../assets/images/wx_gzh.jpg" alt="">
      </div>
    </div>
    <div class="popupBox" v-show="sharePrompt">
      <div class="popupBg" @click.stop="sharePrompt = false"></div>
      <div class="popupCon" style="width:100%;left:0px;top:-40px;transform: translate(0%, 0%);">
        <img src="../assets/images/share_zs.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'coupon',
    props: {
        isShow:Boolean,
        shareDataobj:""
    },
    data () {
      return{
          sharePopup:false, //分享弹窗
          wxCodePopup:false, //显示微信二维码
          sharePrompt:false, //分享提示
          shareInfo:[]
      }
    },
    mounted () {
      this.$nextTick(function(){

      })
    },
    watch:{
        isShow(){
            this.sharePopup = this.isShow
        },
        shareDataobj(){
            let host = window.location.host;
            let prot = window.location.protocol;
            this.shareInfo = {
                title:this.shareDataobj.title,
                link:this.shareDataobj.Url,
                imgUrl:prot+"//"+host+'/public/images/app_logo.png',
                desc:this.shareDataobj.desc
            }
        }
    },
    methods: {
        /*分享朋友圈*/
        friendShare(){
            let _that = this
            _that.sharePrS()
            wx.onMenuShareTimeline({
                title: _that.shareInfo.title, // 分享标题
                link: _that.shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: _that.shareInfo.imgUrl, // 分享图标
                trigger: function (res) {
                    _that.sharePr()
                    //alert('用户点击分享到朋友圈');
                },
                success: function (res) {
                    alert('分享成功');
                    _that.Popup()
                    // 用户确认分享后执行的回调函数
                },
                cancel: function (err) {
                    alert('取消分享');
                    _that.Popup()
                    // 用户取消分享后执行的回调函数
                }
            });
        },
        /*朋友*/
        frienShare2(){
            let _that = this
            _that.sharePrS()
            wx.onMenuShareAppMessage({
                title: _that.shareInfo.title, // 分享标题
                desc:  _that.shareInfo.desc, // 分享描述
                link: _that.shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl:  _that.shareInfo.imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                trigger: function (res) {
                    _that.sharePr()
                    //alert('用户点击分享到朋友');
                },
                success: function () {
                    alert('分享成功');
                    _that.Popup()
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    alert('取消分享');
                    _that.Popup()
                    // 用户取消分享后执行的回调函数
                }
            });
        },
        /*分享到QQ*/
        frienShare3(){
            let _that = this
            _that.sharePrS()
            wx.onMenuShareQQ({
                title: _that.shareInfo.title, // 分享标题
                desc: _that.shareInfo.desc, // 分享描述
                link: _that.shareInfo.link, // 分享链接
                imgUrl: _that.shareInfo.imgUrl, // 分享图标
                trigger: function (res) {
                    //alert('用户点击分享到QQ');
                    _that.sharePr()
                },
                success: function (res) {
                    // 用户确认分享后执行的回调函数
                    alert('已分享');
                    _that.Popup()
                },
                cancel: function (res) {
                    // 用户取消分享后执行的回调函数
                    alert('已取消');
                    _that.Popup()
                }
            });
        },
        sharePr(){
            this.sharePrompt = false
        },
        sharePrS(){
            this.sharePrompt = true
        },
        /*向父组件传值*/
        Popup(){
            this.sharePopup = false
            this.$emit('popuphide', false)
        },
        /*显示二维码*/
        Showerwem(){
            this.sharePopup = false
            this.$emit('popuphide', false)
            this.wxCodePopup = true
        }
    },
    filters: {
       filterTime (time) {
         var myDate = new Date(time*1000);
         var year = myDate.getFullYear();
         var month = myDate.getMonth() + 1;
         var day = myDate.getDate();
         return year + '-' + month + '-' + day;
       }
    }
  }
</script>
<style scoped lang="less">
@import "../assets/css/common.less";
/*分享弹窗*/
.sharePopup{
  width: 100%;
  background: white;
  position: absolute;
  left: 0px;
  bottom: 0px;
  text-align: center;
  z-index: 9999;
  .popupTitle{
    width: 100%;
    line-height:35px;
    color:#999;
    border-bottom:1px solid #e5e5e5;
    font-size:15px;
  }
  ul{
    li{
      color:#333;
      float:left;
      width:33.3333%;
      text-align:center;
      margin-top:20px;
      p{
        font-size:12px!important;
        margin-bottom:5px;
        img{
          width:40%;
        }
      }
    }
  }
  .closePopup{
    width:100%;
    margin-top:20px;
    line-height:35px;
    background:#ccc;
    color:#333;
    font-size:14px;
  }
}

.popupText{
  width:60%;
  position:absolute;
  left:50%;
  top:66%;
  color:white;
  text-align:center;
  transform:translate(-50%,0);
  P{
    font-size:30px;
  }
  span{
    font-size:14px;
  }
  .popupBut{
    width:100%;
    margin-top:15px;
    line-height:35px;
    font-size:16px;
    background:url("../assets/images/Financial/but_img@1.5x.png") no-repeat center;
    background-size:100%;
  }
}
</style>
