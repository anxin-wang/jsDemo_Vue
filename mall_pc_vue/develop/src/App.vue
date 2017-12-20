<template>
  <div id="app">

    <!--<div class="bg-container" :class="{'hover-hader': hoverHeader}">
      <div class="header basic-line positon-re">
        <div class="header-sub">
          &lt;!&ndash; logo &ndash;&gt;
          <div class="left logo-bar">
            <img src="./assets/images/jianguoLogo.png"/>
          </div>
          &lt;!&ndash;/. logo &ndash;&gt;
          &lt;!&ndash; 服务热线 &ndash;&gt;
          <div class="right right-box right-margin service-container">
            <span><i class="icon icon-phone"></i>客服热线:021-22018251<label>(9:00-17:30)</label></span>
            <span><i class="icon icon-email"></i>service@hanzhoujinfu.com</span>
            <span class="mobile-code"><i class="icon icon-mobile-phone"></i>移动热线</span>
            <div class="mobile-code-pic">
              <img src="./assets/images/app.png"/>
            </div>
          </div>
          &lt;!&ndash;/. 服务热线 &ndash;&gt;
        </div>
        &lt;!&ndash; 导航 &ndash;&gt;
        <div class="nav-bar">
          <div class="left">
            <ul class="clear-ul float-ul nav-box">
              <li><a href="#">首页</a></li>
              <li><a href="#">我要投资</a></li>
              <li><a href="#">理财学堂</a></li>
              <li><a href="#">理财师系统</a></li>
              <li><a class="active" href="#">积分商城</a></li>
              <li><a href="#">我的账户</a></li>
            </ul>
          </div>
          <div class="right login-right-box">
            <div class="login-bar" v-if="isLogin == false">
              <a @click="modal1 = true" href="javascript:void(0);">登录</a><span class="small-line-bar"></span><a href="#">注册</a>
            </div>
          </div>
        </div>
        <div class="info-box-person">
          <div class="header-box-pic" v-if="isLogin == true">
            <img src="./assets/images/noavatar_middle.gif"/>
          </div>
          <div class="header-menu-list">
            <ul class="clear-ul">
              <li><a :href="baseProtsUrl + '/member.php?ctl=uc_money&act=incharge' ">充&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;值</a></li>
              <li><a :href="baseProtsUrl + '/member.php?ctl=uc_money&act=carry' ">提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;现</a></li>
              <li><a :href="baseProtsUrl + '/member.php?ctl=uc_invest' ">投资管理</a></li>
              <li><a :href="baseProtsUrl + '/member.php?ctl=uc_msg' ">信息管理</a></li>
              <li><a :href="baseProtsUrl + '' ">退出</a></li>
            </ul>
          </div>
        </div>
        &lt;!&ndash;/. 导航 &ndash;&gt;
      </div>
    </div>
-->
    <router-view/>


    <Modal
      v-model="modal1"
      width="700"
      title="用户登录">

      <div class="login-content">
         <div class="login-header">
           <span class="login-title">用户登录</span>
           <div class="login-register">
             <span>还没账号?</span>
             <a class="regist-a" href="#">注册</a>
           </div>
         </div>
        <ul class="clear-ui input-box">
          <li>
            <label>账户</label>
            <Input v-model="users.email" class="input-w350" placeholder="Email/用户名/手机"></Input>
          </li>
          <li>
            <label>密码</label>
            <Input v-model="users.pwd" class="input-w350" placeholder="请输入密码"></Input><a class="forget-pwd" href="#">忘记密码?</a>
          </li>
          <li>
            <Input class="input-w150 code-input line-bar" placeholder="请输入四位数验证码"></Input>
            <img class="line-bar" title="看不清楚?换一张"
                 src="http://test.jianguolicai.cn/verify.php?w=89&h=44&rand=563711845"
            onclick="this.src='http://test.jianguolicai.cn/verify.php?w=89&h=44&rand='+ Math.random();"/>
          </li>
          <li>
            <span class="sub-btn" @click="login()">登录</span>
          </li>
        </ul>
      </div>

    </Modal>


  </div>
</template>

<script>

  window.onload = function (){
    var iframe = parent.document.getElementById("iframe");
    if (iframe) {
      var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
      if (iframeWin.document.body) {

        if(iframeWin.document.documentElement.scrollHeight >= 1710 || iframeWin.document.body.scrollHeight >= 1710){
          if(iframeWin.document.documentElement.scrollHeight >= iframeWin.document.body.scrollHeight){

            if(iframeWin.document.body.scrollHeight < 1710){
              iframe.height = 1710;
            }else{
              iframe.height = iframeWin.document.body.scrollHeight;
            }
          }else{
            iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
          }
        }else{
          iframe.height = 1710;
        }
      }
    }
  }

import myUtil from '@/util/prots'
export default {
  name: 'app',
  data () {
    return {
      hoverHeader: false,
      baseProtsUrl: '',
      modal1: false,
      users: {
        email: '15221355211',
        pwd: '123456'
      },
      isLogin: false //默认未登录
    }
  },
  mounted () {
    this.$nextTick(function(){
      this.showHead();
      this.currentProts();
      //window.addEventListener('scroll', this.handleScroll);
    })
  },
  methods: {
    showHead () { //切换头部
      let _self = this;
      let users = localStorage.getItem('user');
      users = JSON.parse(users);
      if(users != null && users != ""){
        _self.isLogin = true;
      }else{
        _self.isLogin = false;
      }


    },
    login () {
      console.log(this.users,'进来了...')
      let _self = this;
      let url = '/mapi2/index.php?&act=login'

      let formData = new FormData();
      formData.append("email", _self.users.email);
      formData.append("pwd", _self.users.pwd);
      formData.append("r_type", "1");

      this.$http.post(url, formData)
        .then(function (response) {
        if(response.data.response_code != 0){

            let user = { email: _self.users.email, pwd: _self.users.pwd,isLogin: true}
            let str = JSON.stringify(user);
            localStorage.setItem('user', str);
          _self.modal1 = false;
          setTimeout(function(){
            window.location.reload();//刷新当前页面
          },2000)
        }
        console.log(response,'登录')
      });
    },
    currentProts () {
      let _self = this;
      let ports = myUtil.baseProts();
      if(ports.indexOf(":8080") > -1){
        _self.baseProtsUrl = 'www.jglcweb.com'
      }else{
        _self.baseProtsUrl = ports;
      }
    },
    handleScroll () {
      let _self = this;
      window.scrollY >= 700 ? _self.hoverHeader = true : _self.hoverHeader = false;
    }
  }
}
</script>
<style>
.header-menu-list a:hover{
  background-color: #F4AC31;
  color: #fff;
  -webkit-transition: all .35s ease-in;
  -moz-transition: all .35s ease-in;
  -ms-transition: all .35s ease-in;
  -o-transition: all .35s ease-in;
  transition: all .35s ease-in;
}
.header-menu-list a{
  display: block;
  text-align: center;
  border-radius: 3px;
  width: 82px;
  padding: 5px 5px;
  color: #666666;
  margin: 0 auto;
}
.header-menu-list{
  position: absolute;
  top: 50px;
  left: -45px;
  width: 140px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  z-index: 888;
  padding: 10px 0;
  display: none;
}
.positon-re{
  position: relative;
}
  .header-box-pic img{
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
  .header-box-pic{
    height: 50px;
    width: 50px;
    position: relative;
    left: 0;
    bottom: 5px;
    cursor: pointer;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
    overflow: hidden;
    -moz-box-shadow:0 1px 5px #495060;
    -webkit-box-shadow:0 1px 5px #495060;
    box-shadow: 1px 1px 5px 0 #495060;
  }
  .ivu-input{ height: 46px}
  .modal-box-mall .ivu-modal-content,
  .modal-box-mall .ivu-modal-body,
  .modal-box-mall .ivu-modal{ height: 576px;}
  .ivu-modal{
    width:771px;
    height: 576px;
    background: #FFFFFF;
    -webkit-border-radius: 4px!important;
    -moz-border-radius: 4px!important;
    border-radius: 4px!important;
  }
  .ivu-modal-content{ height: 576px;}
  .ivu-modal-body{ height: 576px;}
  .ivu-modal-footer{ display: none;}
  .ivu-modal-header p, .ivu-modal-header-inner{
    font-size: 18px;
    color: #666666;
  }
  .ivu-modal-header{
    background: #F3F3F3;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
</style>
<style scoped>
.msg-number{
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #fff;
  font-family: 微软雅黑体;
  font-weight: bold;
  font-size: 10px;
  background-color: red;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
  position: absolute;
  top: -10px;
  right: -8px;
}
.msg-box-header{
  display: inline-block;
  position: absolute;
  right: 80px;
  top: 115px;
  width: 40px;
  height: 30px;
  color: #666666;
}
.info-box-person:hover .header-menu-list{
  display: block;
}
.info-box-person{
  position: absolute;
  width: 50px;
  min-height: 30px;
  top: 108px;
  right: 160px;
  z-index: 888;
}
.sub-btn{
  display: block;
  width: 160px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 16px;
  background-color: #FDB75A;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  color: #fff;
  margin-left: 38px;
  cursor: pointer;
}
.code-input{
  margin-left: 38px;
}
.forget-pwd{
  display: inline-block;
  color: #FDB75A;
  font-size: 14px;
  padding-left: 10px;
}
.input-box li{ margin-bottom: 15px}
.input-box{
  margin-top: 30px;
  width: 520px;
  margin-left: 50px;
}
.input-w150{
  width: 150px;
}

.input-w350{
  width: 350px;
  height: 46px;
}
.regist-a{
  color: #FDB75A;
}
.login-register{
  position: absolute;
  right: 0;
  top: 30px;
}
.login-title{
  display: inline-block;
  font-size: 32px;
}
.login-header{
  position: relative;
  border-bottom: 1px solid #efefef;
  padding: 10px 0;
  margin: 0 50px;
}
.login-content{
  border: 1px solid #efefef;
  width: 600px;
  height: 450px;
  margin: 20px auto;
  font-size: 16px;
}

  .footer-code-box figure:first-child{ margin-right: 41px;}
  .footer-code-box figcaption{
    font-size: 12px;
    color: #999999;
    letter-spacing: 0.86px;
  }
  .footer-container{
    position: relative;
    max-width: 1200px;
    width: auto;
    margin: 0 auto;
  }
  .footer-code-box{
    position: absolute;
    top: 32px;
    right: 0;
    text-align: center;
  }
  .line-top a{
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
  }
  .line-top p{
    font-weight: 600;
    font-size: 18px;
    color: #FFC156;
    letter-spacing: 0;
    margin-top: 32px;
    margin-bottom: 31px;
  }
  .line-top{
    display: inline-block;
    vertical-align: top;
  }
  .footer-box{
    height: 250px;
    background-color: #fff;
    margin-top: 30px;
    max-width: 1920px;
    width: auto;
    margin-left: auto;
    margin-right: auto;
  }


  .mobile-code:hover + div[class='mobile-code-pic']{ display: block;}
  .mobile-code{ cursor: pointer;}
  .mobile-code-pic img{
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    margin-top: 5px;
  }
  .mobile-code-pic:after{
    content: '';
    position: absolute;
    top: -18px;
    right: 30px;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 20px solid #fff;
  }
  .mobile-code-pic:before{
    content: '';
    position: absolute;
    top: -20px;
    right: 30px;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 20px solid #EEEEEE;
  }
  .mobile-code-pic{
    width: 150px;
    height: 150px;
    text-align: center;
    position: absolute;
    top: 40px;
    right: 0;
    z-index: 888;
    padding: 3px;
    background-color: #fff;
    border: 1px solid #EEEEEE;
    display: none;
  }
  .service-container{
    position: relative;
  }
  .hover-hader{
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 888;
    border-top: 1px solid rgba(234,235,237,0.30);
    box-shadow: 0 5px 10px 1px rgba(203,203,203,0.26);
    -webkit-transition: all .35s ease-in;
    -moz-transition: all .35s ease-in;
    -ms-transition: all .35s ease-in;
    -o-transition: all .35s ease-in;
    transition: all .35s ease-in;
  }
  .small-line-bar{
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 15px;
    border-right: 1px solid #999999;
  }
.login-right-box{ margin-right: 40px;}
.right-margin{ margin-right: 20px;}
.login-bar{
  width: 100px;
  height: 24px;
  line-height: 21px;
  border: 1px solid #999999;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  text-align: center;
  color: #999999;
}
.login-bar a{
  color: #666666;
  font-size: 12px;
  padding: 0 13px;
}
.nav-box a{ margin-right: 42px;color: #666666;}
.nav-box a:hover, .login-right-box a:hover{
  color: #F4AC31;
  -webkit-transition: color .35s ease-in;
  -moz-transition: color .35s ease-in;
  -ms-transition: color .35s ease-in;
  -o-transition: color .35s ease-in;
  transition: color .35s ease-in;
}
.nav-bar{
  overflow: hidden;
  margin: 20px 0;
}
.header-sub{
  border-bottom: 1px solid #CCCCCC;
  height: 96px;
}
.header{
  height: 160px;
}
.right-box{
  margin-top: 40px;
  font-size: 12px;
  color: #666666;
  font-family: PingFangSC-Regular;
}
.right-box span{ margin-right: 20px;}
.logo-bar{
  width: 129px;
  margin-top: 20px;
}
.logo-bar img{
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;

}
</style>
