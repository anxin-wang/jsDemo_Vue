<template>
  <div class="Invitation">
    <img src="../assets/images/Index/yaoq.png" alt="">
    <div class="InvitationContent">
      <!--获得佣金文字-->
      <div class="Commission">
        <p>最高可获得好友</p>
        <p>年化投资金额1.2%佣金</p>
      </div>
      <div class="QR_Code_reader">
        <div class="QR_Code_reader_img">
          <canvas id="canvas"></canvas>
        </div>
      </div>
      <div class="InvitationNumter clear">
        <div class="fl" style="width:28%;">邀请码</div>
        <div class="fl center f15" style="width:60%;color:white">
          <p v-show="isShowNum" v-if="isShowNum == true">{{InvitationNumter}}</p>
          <p v-if="isShowNum != true">*************</p>
        </div>
        <div class="fr" style="width:10%;" @click.stop="isShowNum = !isShowNum">
          <img v-if="isShowNum == true" width="20" src="../assets/images/Index/Eye_1.png" alt="">
          <img v-if="isShowNum != true" width="20" src="../assets/images/Index/Eye_2.png" alt="">
        </div>
      </div>
    </div>
    <div class="InvitationBut" @click.stop="ShowPopup">
      <img src="../assets/images/Index/but.png" alt="">
    </div>
    <!--微信分享 组件-->
    <Wxshare :isShow="isShow" :shareDataobj="shareDataobj"  v-on:popuphide="popuphide"></Wxshare>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { Lazyload } from 'mint-ui';
import Wxshare from '../components/share.vue'
export default {
  components:{ Wxshare },
  data () {
    return {
        InvitationNumter:"",
        isShowNum:true,
        userInfo:"",
        isShow:false,
        /*分享信息*/
        shareDataobj:{},
    }
  },
  mounted () {
      this.info()
  },
  methods: {
      /*获取用户信息*/
      info () {
          let _that = this
          let Base64 = require('js-base64').Base64
          let Url = '/mapi2/index.php?&act=uc_center'
          let user_name = window.storeWithExpiration.get('user_name')
          let user_pwd = window.storeWithExpiration.get('user_pwd')
          let formData = new FormData();
          formData.append("email",user_name)
          formData.append("pwd",user_pwd)
          Indicator.open({ spinnerType: 'fading-circle' })
          _that.$http.post(Url,formData)
              .then(response => {
                  var response = JSON.parse(Base64.decode(response.data));
                  _that.userInfo = response
                  _that.InvitationNumter = response.invitation_code
                  _that.datainfo()
                  Indicator.close()
              },response => {
              })
      },
      /*二维码 信息*/
      datainfo(){
          let domain = location.href.split('#')[0];
          const QRCode = require('qrcode')
          const canvas = document.getElementById('canvas')
          const Num = this.InvitationNumter
          const mobile = this.userInfo.mobile
          var url = domain+'#/register_share/'+Num+'/'+mobile
          QRCode.toCanvas(canvas, url, function (error) {
          })

      },
      /*显示 分享组件*/
      ShowPopup(){
          /*分享信息*/
          let domain = location.href.split('#')[0];
          const Num = this.InvitationNumter
          const mobile = this.userInfo.mobile
          var url = domain+'#/register_share/'+Num+'/'+mobile
          this.shareDataobj = {
              title:"坚果理财 注册有好礼",
              desc:"坚果理财,你见过的最靠谱理财平台",
              Url:url
          }
          this.isShow = true
      },
      /*隐藏 分享组件*/
      popuphide(data){
          this.isShow = data
      }
  }
}

</script>

<style scoped lang="less">
#canvas{width:100%!important;height:100%!important;}
.Invitation{
  width:100%;
  position:absolute;
  left:0px;
  top:45px;
  background:#f5f5f5;
  >img{
    width:100%;
  }
  /*二维码*/
  .InvitationContent{
    width: 55%;
    height: 45%;
    position: absolute;
    left: 50%;
    top: 53%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    /*获得佣金文字 定位*/
    .Commission{
      width:80%;
      line-height:18px;
      margin:0px auto;
      p{
        font-size:16px;
        color:#ec293d;
        text-align:center;
        font-weight:600;
      }
    }
    /*二维码*/
    .QR_Code_reader{
      width:95%;
      height:66%;
      margin:8px auto;
      .QR_Code_reader_img{
        background:#fc7b7c;
        border-radius:10px;
        padding:10px;
        img{ width:100%}
      }
    }
    /*邀请码*/
    .InvitationNumter{
      height:38px;
      margin-top:8%;
      background:#aba89a;
      padding:0px 10px;
      div{
        font-size:14px;
        line-height:38px;
      }
    }
  }
  .InvitationBut{
    width:60%;
    margin:0px auto;
    position:absolute;
    bottom:10%;
    left:50%;
    transform: translate(-50%,0%);
    img{width:100%;}
  }
}


@media screen and (min-width: 320px) and (max-width: 374px) {
  .Invitation{
    .InvitationContent{
      height: 43%;
      top: 51%;
      .Commission{
        width:89%;
        p{
          font-size:14px;
        }
      }

    }
  }
}
@media screen and (min-width: 375px) and (max-width: 414px) {
  .Invitation{
    .InvitationContent{
      .Commission{
        top:38%;
        p{
          font-size:15px;
          line-height:20px;
        }
      }
      .QR_Code_reader{
        width:95%;
        height:66%;
        margin:8px auto;
        .QR_Code_reader_img{
          background:#fc7b7c;
          border-radius:10px;
          padding:15px;
          img{ width:100%}
        }
      }
    }
  }
}
</style>
