<template>
  <div name="integralDetails">
     <div class="basic-line">

       <Breadcrumb class="bread-box">
         <BreadcrumbItem href="/mine">我的积分</BreadcrumbItem>
         <BreadcrumbItem class="default-none">积分详情</BreadcrumbItem>
       </Breadcrumb>

       <div class="integral-details-box">
         <Tabs v-model="modal" value="name1" @on-click="listTab">
           <TabPane label="已获取积分" name="name1">

             <div class="table-header gray-bg">
               <div class="table-item-33 left">获取时间</div>
               <div class="table-item-33 left centers">获取来源</div>
               <div class="table-item-33 left centers">获取积分</div>
             </div>

             <div class="jianguo-info" v-if="integralList == null">
                <div class="jianguo-box">
                  <img src="../../assets/images/jianguo.png"/>
                </div>
                <p>您当前还没有积分</p>
                <a @click="earnPoints()" href="javascript:void(0);">去获取积分</a>
             </div>

             <ul class="clear-ul table-list table-bottom" v-else>
               <li v-for="(item,index) in integralList.list" :key="item.id">
                 <div class="table-header">
                   <div class="table-item-33 table-item left">{{ item.create_time | formatDateTime }} <!--<span style="color: #999999">{{ item.create_time | formatDateHms }}</span>--></div>
                   <div class="table-item-33 table-item left centers" v-text="item.memo">兑换行李箱</div>
                   <div class="table-item-33 table-item left centers">{{ item.score | fixedScore }}</div>
                 </div>
               </li>
             </ul>

           </TabPane>
           <TabPane label="已使用积分" name="name2">

             <div class="table-header">
               <div class="table-item-33 left">使用时间</div>
               <div class="table-item-33 left centers">使用内容</div>
               <div class="table-item-33 left centers">使用积分</div>
             </div>

             <div class="jianguo-info" v-if="integralList2 == null">
               <div class="jianguo-box">
                 <img src="../../assets/images/jianguo.png"/>
               </div>
               <p>您当前还没有积分</p>
               <a @click="earnPoints()" href="javascript:void(0);">去获取积分</a>
             </div>

             <ul class="clear-ul table-list table-bottom" v-else>
               <li v-for="(item,index) in integralList2.list" :key="item.id">
                 <div class="table-header">
                   <div class="table-item-33 table-item left">{{ item.create_time | formatDateTime }} <!--<span style="color: #999999">{{ item.create_time | formatDateHms }}</span>--></div>
                   <div class="table-item-33 table-item left centers" v-text="item.memo">兑换行李箱</div>
                   <div class="table-item-33 table-item left centers">{{ item.score | fixedScore }}</div>
                 </div>
               </li>

             </ul>

           </TabPane>
         </Tabs>
       </div>

       <div class="page-bxo">
         <!--<page :total="parseInt(integralList2.count)" :display="display" :current-page='current' @pagechange="page"></page>-->
         <Page v-if="integralList2 != null && integralList2.total_page >=2 " :total="parseInt(integralList2.count)" @on-change="page"></Page>
         <Page v-if="integralList != null && integralList.total_page >=2 " :total="parseInt(integralList.count)" @on-change="page"></Page>
       </div>

     </div>
  </div>
</template>
<script>
  import myUtil from '../../util/prots'
  import page from '../../components/page.vue'

  export default {
    name: 'integralDetails',
    components: {page},
    data () {
      return {
        modal: 'name1',
        localUrl : '',
        integralList: [],
        integralList2: [],
        display: 5,
        current: 1,
        isCheck: null, //默认选项为没有点击过
        isLogin: 0, //0未登录
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        this.handleSpinCustom();
      })
    },
    mounted () {
      this.$nextTick(function () {
        this.integrals();
        this.getUrl();
        this.selectTab();
        let status = this.$route.params.status;
        this.info(status);
        parent.document.body.scrollTop = 0;
        parent.document.documentElement.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      })
    },
    methods: {
      closeMarks () {
        /*parent.document.getElementById("ScrollTopLogoNav").style = "z-index: normal;" ;
        if(parent.document.getElementById('mask')){
          parent.document.getElementById('mask').style.display="none";
        }*/
      },
      handleSpinCustom  (){ //loading效果
        /*if(parent.document.getElementById('mask')){
          parent.document.getElementById('mask').style.display="block";
        }
        parent.document.getElementById("ScrollTopLogoNav").style = "z-index: 890!important;position: absolute;" ;
        this.$Spin.show({
          render: (h) => {
            return h('div', [
              h('Icon', {
                'class': 'demo-spin-icon-load',
                props: {
                  type: 'load-c',
                  size: 18
                }
              }),
              h('div', 'Loading')
            ])
          }
        });*/
      },
      earnPoints () { //去赚积分
        parent.location.href = '/index.php?ctl=deals'
      },
      integrals () { //可用积分
        let _self = this;

        let Url = '/mapi2/index.php'
        let formData = new FormData();
        formData.append("act", "uc_score");
         formData.append("email", '15221355211');
         formData.append("pwd", '123456');
        formData.append("r_type", "1");

        this.$http.post(Url, formData)
          .then(function (response) {
            let obj = response.data;
            _self.isLogin = obj.response_code;
          }).catch(function (error) {
          _self.$Notice.open({title: '温馨提示',desc: error });
        });
      },
      page (page) {
        let _self = this;

        if(_self.isCheck == null){
          //默认选项没有被点击过则获取参数
          let status = _self.$route.params.status;
          _self.info(status, page);
        }else{
          //则获取点击对应的值
          _self.info(_self.isCheck, page);
        }
      },
      listTab (status) {
        let _self = this;
        if(status == 'name1'){
          _self.info(0,1);
          _self.isCheck = 0;
          _self.integralList2 = [];
        }else{
          _self.info(1,1);
          _self.isCheck = 1;
          _self.integralList = [];
        }
      },
      info (status,page) {
        let _self = this;
        let url = '/mapi2/index.php';
        let formData = new FormData();
        formData.append("act", "uc_score_logs");
        formData.append("status", status);
        formData.append("page",page);
        formData.append("email", '15221355211');
        formData.append("pwd", '123456');
        formData.append("r_type", "1");

        _self.$http.post(url,formData)
          .then(function(response){

            status == 0 ? _self.integralList = response.data :
              _self.integralList2 = response.data
            console.log(response,'积分详情')

            _self.closeMarks();
            _self.$Spin.hide();
          });
      },
      getUrl () {
        let _self = this;
        let url = myUtil.baseProts();
        _self.localUrl = url;
      },
       selectTab () {
          let _self = this;
         _self.modal = _self.$route.params.name;
       },
    },
    filters: {
      fixedScore (score) {
        return parseInt(score);
      },
      formatDateHms (timeStamp) {
        console.log(timeStamp,'时间')
        if(timeStamp != null && timeStamp != ""){
          var date = new Date();
          timeStamp = parseInt(timeStamp) + 8 * 60 * 60; //时间戳加 8 小时
          date.setTime(timeStamp * 1000);
          var h = date.getHours();
          h = h < 10 ? ('0' + h) : h;
          var minute = date.getMinutes();
          var second = date.getSeconds();
          minute = minute < 10 ? ('0' + minute) : minute;
          second = second < 10 ? ('0' + second) : second;
          return h+':'+minute+':'+second;
        }
      },
      formatDateTime (timeStamp) {
        console.log(timeStamp,'年份')
        if(timeStamp != null && timeStamp != ""){

          if(timeStamp.indexOf("-") > -1){
             return timeStamp;
          }

          var date = new Date();
          timeStamp = parseInt(timeStamp) + 8 * 60 * 60; //时间戳加 8 小时
          date.setTime(timeStamp * 1000);
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          var h = date.getHours();
          h = h < 10 ? ('0' + h) : h;
          var minute = date.getMinutes();
          var second = date.getSeconds();
          minute = minute < 10 ? ('0' + minute) : minute;
          second = second < 10 ? ('0' + second) : second;
          m = m < 10 ? ('0' + m) : m;
          var d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          return y + '年' + m + '月' + d+'日' +' ' + h+':'+minute+':'+second;
        }
      }
    }
  }
</script>
<style>
.ivu-tabs-nav .ivu-tabs-tab-active{ color: #FFC156!important;}
.ivu-tabs-ink-bar{
  background-color: #FFC156;
  width: 100px!important;
  height: 3px!important;
  left: 250px;
}
.ivu-tabs-nav .ivu-tabs-tab:hover{
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #FFC156;
}
.ivu-tabs-nav .ivu-tabs-tab{
  width: 50%;
  height: 62px;
  line-height: 50px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #999999;
}
.ivu-tabs-nav{
  width: 100%;
  text-align: center;
}
</style>
<style scoped>
div[name='integralDetails']{ width: 100%; min-height: 1800px;}
.jianguo-info{
  width: 200px;
  height: 200px;
  margin: 50px auto;
  padding-left: 50px;
  font-size: 16px;
  color: #999999;
  text-align: center;
}
.jianguo-info p{ margin-top: 27px;}
.jianguo-box img{
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}
.jianguo-info a{
  color: #FFC156;
  font-size: 12px;
  text-decoration: underline;
}
.jianguo-box{
  width: 142px;
  height: 118px;
  text-align: center;
}
.ivu-tabs-bar{ margin-bottom: 0;}
.gray-bg{ background-color: #FAFAFA;}
  .page-bxo{
    margin-top: 10px;
    text-align: center;
  }
.centers{ text-align: center;}
.table-header div{ padding-left: 50px}
.table-bottom{
  margin-bottom: 50px;
}
.table-list li:nth-child(odd){
  background-color: #fff;
}
.table-list li:nth-child(even){
  background-color: #FAFAFA;
}
.table-item{
  color: #666666;

}
.table-item-33{
  width: 33.33%;
  height: inherit;
}
.table-header{
  height: 44px;
  line-height: 44px;
  overflow: hidden;
  font-size: 14px;
  color: #999999;
}
.integral-details-box{
  min-height: 342px;
  height: auto;
  background-color: #fff;
}
</style>
