<template>
  <div name="mine">
      <div class="basic-line">
        <Breadcrumb class="bread-box">
          <BreadcrumbItem href="/">积分商城</BreadcrumbItem>
          <BreadcrumbItem class="default-none">我的积分</BreadcrumbItem>
        </Breadcrumb>


        <div class="type-box">
           <ul class="clear-ul float-ul num-list">
             <li>
               <a href="javascript:void(0);">
                 <p class="active-score" v-text="score.usable_score">678.00</p>
                 <p>我的积分</p>
               </a>
             </li>
             <li>
               <router-link to="/integralDetails/name1/0">
                 <p v-text="score.total_score">0.00</p>
                 <p>已获得积分</p>
               </router-link>
             </li>
             <li>
               <router-link to="/integralDetails/name2/1">
                 <p v-text="score.used_score">0.00</p>
                 <p>已使用积分</p>
               </router-link>
             </li>
           </ul>
           <ul class="pic-header-list">
              <li>
                <a class="score-pic-item" @click="earnPoints()" href="javascript:void(0);">
                  <img class="line-bar score-pic-margin" src="../../assets/images/new1.png"/>
                  <div class="line-bar score-pic-font-margin">
                     <div class="score-pic-header score-pic-font-top">High赚积分</div>
                    <div>海量积分赚不停</div>
                  </div>
                </a>
              </li>
             <li>
                <router-link class="score-pic-item get-score" :to="{name: 'home'}">
                 <img class="line-bar score-pic-margin-2"  src="../../assets/images/new2.png"/>
                  <div class="line-bar score-pic-font-margin-2">
                    <div class="score-pic-header score-pic-font-bottom">积分兑换</div>
                    <div>精品好礼,等你兑换</div>
                  </div>
                </router-link>
             </li>
           </ul>
        </div>


        <div class="my-mission-header">
          <span>我的任务</span>
          <router-link to="/rule">关于积分</router-link>
        </div>

        <div class="my-mission-box">


          <ul class="clear-ul task-box">
            <li>
              <figure class="margin-left-99">
                <div class="margin-left-m-100icon-big line-bar"><img src="../../assets/images/ws.png"/></div>
                <div class="border line-bar">
                  <div class="line-bar box-2">
                    <figcaption class="task-box-header">完善个人信息</figcaption>
                    <figcaption class="task-box-info">每项得20积分</figcaption>
                  </div>
                  <figcaption class="line-bar"><a @click="perfectData()" class="task-btn" href="javascript:void(0);">立即完善</a></figcaption>
                </div>
              </figure>
            </li>
            <li>
              <figure class="margin-left-99">
                <div class="margin-left-m-100icon-big line-bar"><img src="../../assets/images/money.png"/></div>
                <div class="border line-bar">
                  <div class="line-bar box-2">
                    <figcaption class="task-box-header">投资获取积分</figcaption>
                    <figcaption class="task-box-info">投资坚果理财产品获取大额积分</figcaption>
                  </div>
                  <figcaption class="line-bar"><a class="task-btn" @click="earnPoints()" href="javascript:void(0);">立即投资</a></figcaption>
                </div>
              </figure>
            </li>
          </ul>

        </div>

      </div>
  </div>
</template>
<script>
  import myUtil from '../../util/prots'
  export default{
    name: 'mine',
    data () {
      return {
        score: '',
        localUrl : '',
        isLogin: 0, //0未登录
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.integrals();
        this.info();
        myUtil.iframeResize();//调整父页面iframe的高度
        parent.document.documentElement.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      })
    },
    methods:{
      earnPoints () { //去赚积分
        parent.location.href = '/index.php?ctl=deals'
      },
      integrals () { //可用积分
        let _self = this;

        let Url = '/mapi2/index.php'
        let formData = new FormData();
        formData.append("act", "uc_score");
        /* formData.append("email", '15221355211');
         formData.append("pwd", '123456');*/
        formData.append("r_type", "1");

        this.$http.post(Url, formData)
          .then(function (response) {
            let obj = response.data;
            _self.isLogin = obj.response_code;
            console.log(response,'可用积分')
          }).catch(function (error) {
          _self.$Notice.open({title: '温馨提示',desc: error });
        });
      },
      perfectData () {
        parent.location.href = '/member.php?ctl=uc_account'
      },
      getUrl () {
        let _self = this;
        let url = myUtil.baseProts();
        _self.localUrl = url;
      },
      info (){
        let _self = this
        let url = '/mapi2/index.php?'

        _self.$http.get(url,{params:{
          act: 'uc_score',
          /*email: '15221355211',
          pwd: '123456',*/
          r_type: '1'
        }}).then(function(response){
          console.log(response,'我的积分')
          let res = response.data;
          _self.score = res;
        });
      },

    }
  }
</script>
<style scoped>
  .num-list{ margin-left: 100px}
  .score-pic-font-margin-2{margin-top: 25px; margin-left: 25px;}
  .score-pic-font-margin{margin-top: 25px; margin-left: 30px; }
  .score-pic-margin-2{ margin-top: 25px;margin-right: 10px; }
  .score-pic-margin{ margin-top: 25px;margin-left: -20px; }
  .pic-header-list li a{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #999999;
    -webkit-font-smoothing: antialiased;
  }
  .score-pic-font-bottom{ color: #F98582;}
  .score-pic-font-top{ color: #7CBCFE;}
  .score-pic-header{
    font-family: PingFangSC-Medium;
    font-size: 16px;
  }
  .score-pic-item{
    width: 286px;
    height: 114px;
    background: #FFFFFF;
    border: 1px solid #7CBCFE;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
  }
  .get-score{
    border: 1px solid #F98582
  }
  .pic-header-list li{ width: 100%!important;margin-bottom: 15px}
  .pic-header-list{
    position: absolute;
    top: 32px;
    right: 137px;
  }
.normar-box-child{
  position: absolute;
  width: 93%;
  height: 97%;
  line-height: 170px;
  background-color: rgba(0,0,0,.3);
}
.normar-box{
  position: relative;
  color: #fff;
  cursor: default;
}
.margin-right-30{
  margin-right: 30px;
}
.margin-left-30{
  margin-left: 30px;
}
.margin-l-100{ margin-left: 100px;}
div[name='mine']{ width: 100%;}
.box-2{
  padding-bottom: 10px;
}
.margin-left-m-100{
  margin-left: 70px;
}
.margin-left-99{
  margin-left: 99px;
  width: 1050px;
  position: relative;
}
.border{
  margin-left: 20px;
  width: 725px;
}
.line-bars{
  border-right: 1px solid #f5f6f7;
}
.big-title{
  color: #333333;
  font-size: 18px;
  font-weight: bold;
}
.margin-left-90{
  margin-left: -90px;
}
.width-50{ width: 50%!important;}
.margin-left-200{ margin-left: 200px;}
.choujiang-box{
  width: 100%;
  height: 100%;
  line-height: 164px;
  background-color: rgba(0,0,0,.5);
  text-align: center;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  cursor: default;
}
.choujiang{ position: relative;}
  .task-btn{
    font-family: PingFangSC-Regular;
    display: block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    margin-top: 37px;
    margin-left: auto;
    margin-right: auto;
    font-size: 14px;
    color: #FFC156;
    text-align: center;
    border: 1px solid #FFC156;
    -webkit-border-radius: 90px;
    -moz-border-radius: 90px;
    border-radius: 90px;
    position: absolute;
    right: 22px;
    top: -20px;
  }
  .task-box{ padding-top: 1px;}
  .task-box-info{
    font-size: 12px;
    color: #999999;
    margin-top: 5px;
  }
  .task-box-header{
    font-family: PingFangSC-Medium;
    font-weight: bold;
    font-size: 18px;
    color: #333333;
  }
  .task-box li{
    border-bottom: 1px solid #f5f6f7;
    height: 134px;
    padding-top: 1px;
  }
.task-box li figure{
  margin-top: 36px;
}
  .icon-big img{
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
  .icon-big{
    width: 71px;
    height: 71px;
    margin-top: 20px;
    margin-bottom: 23px;
  }
  .my-mission-header a{
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    right: 30px;
    top: 15px;
    width: 75px;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    color: #999999;
    text-align: center;
  }
.my-mission-header a:after{
  content: '';
  display: inline-block;
  position: absolute;
  top: 8px;
  right: 0;
  width: 8px;
  height: 8px;
  border-top: transparent;
  border-left: transparent;
  border-bottom: 1px solid #999999;
  border-right: 1px solid #999999;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
  .my-mission-header span{
    font-family: PingFangSC-Medium;
    font-weight: bold;
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    margin-top: 15px;
    margin-left: 42px;
    position: relative;
  }
.my-mission-header span:before{
  content: '';
  display: inline-block;
  position: absolute;
  top: 4px;
  left: -10px;
  width: 4px;
  height: 20px;
  background-color: #FFC156;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
}
  .my-mission-header{
    height: 50px;
    position: relative;
  }
  .my-mission-box{
    min-height: 333px;
    background-color: #fff;
  }
  .active-score{
    font-size: 24px!important;
    color: #F25F5C!important;
  }
  .type-box p:nth-child(2){
    font-size: 14px;
    color: #999999;
    margin-top: 8px;
    margin-bottom: 75px;
  }
  .type-box p:first-child{
    font-family: PingFangSC-Medium;
    font-weight: bold;
    height: 28px;
    line-height: 28px;
    font-size: 18px;
    color: #666666;
    margin-top: 60px;
  }
  .type-box li a:last-child{
    display: block;
  }
  .type-box ul li{ width: 13.33%;text-align: center;}
  .type-box ul{ overflow: hidden;}
  .type-box{
    height: 308px;
    background: url("../../assets/images/bl.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    /*background-color: #fff;*/
  }
</style>
