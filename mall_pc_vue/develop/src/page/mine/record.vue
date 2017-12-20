<template>
  <div class="record-box-big" name="record">

    <div class="basic-line">
      <Breadcrumb class="bread-box">
        <BreadcrumbItem href="/">积分商城</BreadcrumbItem>
        <BreadcrumbItem class="default-none">兑换记录</BreadcrumbItem>
      </Breadcrumb>

      <!--没有信息显示-->
      <!--<div class="no-more-box">
         <div class="jianguo-box">
           <img src="../../assets/images/jianguo.png"/>
         </div>
         <p class="message-title">您环没有兑换的商品呢 去兑换吧</p>
         <router-link class="sub-btn" to="/">立即兑换</router-link>
      </div>-->

      <div class="record-box">
         <div class="record-container-list">
           <div class="record-header">
             <div class="item-w38 item left padding-left-20"><span class="cursors" @click="toggleShow()" v-text="defaultTime.title">近六个月记录</span><i  @click="toggleShow()" class="icon down-icon icon-box-btn"></i></div>
             <div class="item-w12 item left">兑换详情</div>
             <div class="item-w25 item left item-cneter">积分金额</div>
             <div class="item-w25 item left item-cneter">交易状态</div>
           </div>
           <div class="record-container-box" v-show="orderMonth">
              <ul class="clear-ul" v-if="yearLists != null">
                <li v-for="(item,index) in yearLists" @click="toggleShow(item)" :key="item.id"><span v-text="item.title">近六个月</span></li>
               <!-- <li @click="toggleShow()"><span>今年年内记录</span></li>
                <li @click="toggleShow()"><span>2016年记录</span></li>-->
              </ul>
              <i class="icon icon-up"></i>
           </div>
         </div>
        <div class="jianguo-info" v-if="order == null || order == '' ">
          <div class="jianguo-box">
            <img src="../../assets/images/jianguo.png"/>
          </div>
          <p>您当前还没兑换记录</p>
        </div>

         <ul class="record-list" v-else>
           <li v-for="(item,index) in order" :key="item.id">
              <div class="record-table ">
                 <p class="record-table-header" v-text="item.ex_time" :class="{'record-list-old': filterDate(item.ex_time) == true }">2017年10月09日  21:54:09</p>
                <div class="item-w38 item-2 left padding-left-20">
                   <div class="pic-box line-bar-top">
                     <!-- 默认图片 -->
                     <img v-if="item.img == '' || item.img == null " src="../../assets/images/image_err.gif"/>
                     <!--/. 默认图片 -->

                     <img :src="item.img | filterUrl">

                   </div>
                   <div class="line-bar-top pic-name-box" v-text="item.goods_name">
                     京东E卡面值500元
                   </div>
                </div>
                <div class="item-w12 item-2 left right-line">
                  <div class="margin-top-box padding-left-20">x{{ item.number }}</div>
                </div>
                <div class="item-w25 item-2 left item-cneter right-line">
                  <div class="margin-top-box">
                    {{ item.total_score }}积分
                  </div>
                </div>
                <div class="item-w25 item-2 left item-cneter">
                   <div class="margin-top-box"><!--canceled-->

                     <div :class="{'already-paid': item.order_status_code == 3 || item.order_status_code == 4,
                     'canceled': item.order_status_code != 3 || item.order_status_code != 4}">{{ item.order_status }}</div>

                     <!--<div class="already-paid">{{ item.order_status }}</div>-->
                     <router-link class="default-btn" :to="{name: 'orderDetails', params: {id: item.id}}">订单详情</router-link>
                   </div>
                </div>
              </div>
           </li>
         </ul>
      </div>

      <div class="page-bxo">

          <Page v-if="order != null && parseInt(page_bar.page_total) >= 2 " :total="parseInt(total)" @on-change="page"></Page>

      </div>

    </div>

  </div>
</template>
<script>
  import myUtil from '../../util/prots'
  import page from '../../components/page.vue'
  export default{
    name: 'record',
    components: {page},
    data () {
      return {
        total: 150,     // 记录总条数
        display: 20,   // 每页显示条数
        current: 1,   // 当前的页数
        orderMonth: false,
        addressList: {},
        num: 0,
        list: {
          id: 0,
          name: '',
          score: 0,
          market_price: 0.00,
          discount_core: '',
          description: '',
          img: '',
          unPay: 0
        },
        goods_data:[],
        user_address: {},
        order:"",
        page_bar:"",
        total: 0,
        yearLists: [],
        defaultTime: { },
        isLogin: 0, //0未登录
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        this.handleSpinCustom();
      })
    },
    mounted:function() {
      this.$nextTick(function () {
        this.integrals();
        this.info(1,this.getPastHalfYear(),this.toYears());
        this.timeRecord();
        myUtil.iframeResize();//调整父页面iframe的高度
        parent.document.body.scrollTop = 0;
        parent.document.documentElement.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      })
    },
    methods: {
      closeMarks () {
        parent.document.getElementById("ScrollTopLogoNav").style = "z-index: normal;" ;
        if(parent.document.getElementById('mask')){
          parent.document.getElementById('mask').style.display="none";
        }
      },
      handleSpinCustom  (){ //loading效果
        if(parent.document.getElementById('mask')){
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
        });
      },
      integrals () { //可用积分
        let _self = this;

        let Url = '/mapi2/index.php'
        let formData = new FormData();
        formData.append("act", "uc_score");
        /* formData.append("email", '15221355211');
         formData.append("pwd", users.'123456');*/
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
      getPastHalfYear () {
       // 先获取当前时间
        var curDate = (new Date()).getTime();
        // 将半年的时间单位换算成毫秒
        var halfYear = 365 / 2 * 24 * 3600 * 1000;
        var pastResult = curDate - halfYear;  // 半年前的时间（毫秒单位）

        // 日期函数，定义起点为半年前
        var pastDate = new Date(pastResult),
          pastYear = pastDate.getFullYear(),
          pastMonth = pastDate.getMonth() + 1,
          pastDay = pastDate.getDate();

          if(pastMonth < 10){
            pastMonth = '0' + pastMonth;
          }
          if(pastDay < 10){
            pastDay = '0' + pastDay;
          }

        return pastYear + '-' + pastMonth + '-' + pastDay;
      },
      toYears () { //今年
        let date = new Date();
        let year = date.getFullYear();
        let month = (date.getMonth() + 1);
        let day = date.getDate();

        if(month < 10){
          month = '0' + month;
        }
        if(day < 10){
          day = '0' + day;
        }

        let currentYear = year + '-' + month + '-' + day;
        return currentYear;
      },
      timeRecord () {
         let _self = this;
         let date = new Date();
         let lastYear = (parseInt(date.getFullYear()) - 1);

         let toYear = { title: '今年年内记录',start_time: date.getFullYear() + '-01-01',end_time:  _self.toYears() }
         let halfYear = { title: '近六个月记录', start_time: _self.getPastHalfYear(), end_time: _self.toYears() }
         let lastY = { title: lastYear + '年记录',start_time: lastYear + '-01-01', end_time:  lastYear + '-12-31'}

        _self.defaultTime = halfYear;

        _self.yearLists.push(halfYear);
        _self.yearLists.push(toYear);
        _self.yearLists.push(lastY);

      },
      page (num) {
        let _self = this;

        _self.info(num,_self.defaultTime.start_time,_self.defaultTime.end_time);
      },
      filterDate (str) { //时间比较
        let date = new Date();
        date = date.getFullYear() + '-' + (date.getMonth() + 1 ) + '-' + date.getDate()+ ' ' + date.getHours()+ ':' + date.getMinutes() + ':' + date.getSeconds();
        let al = new Date(date);
        let bl = new Date(str);
        return al > bl ? true : false;
      },
      info (num,start_time,end_time){
        let _self = this;

        let url = '/mapi2/index.php?'
        _self.$http.get(url,{params:{
          act: 'uc_goods_order',
          start_time: start_time,//当前时间
          end_time: end_time,//结束时间
         /* email: '15221355211',
          pwd: '123456',*/
          r_type: '1',
          page:num
        }}).then(function(response){
          console.log(response, '兑换记录')
          let res = response.data;
          _self.order = res.items
          _self.page_bar = res.page;
          console.log(_self.page_bar,'有没有')
          _self.total = res.total;
          _self.closeMarks();
          _self.$Spin.hide();
        });
      },
      toggleShow (item) {
        let _self = this;

        if(item != null){
          _self.defaultTime = item;
          _self.info(1,item.start_time, item.end_time);
        }

        console.log(item,'打印了什么鬼')

        _self.orderMonth = !_self.orderMonth;
      }
    },
    filters: {
      filterUrl (url) { //过略图片路径
        if(url != null && url != ''){
          if(url.indexOf("./") > -1){
            var newUrl = url.substr(1, url.length);
            let str = myUtil.baseProts();
            if(str.indexOf(':8080') > -1){
              str = "https://www.jianguolicai.cn" + newUrl;
              return str;
            }
            return str + newUrl;
          }else{
            return url;
          }
        }
      }
    }
  }
</script>
<style scoped>
  div[name='record']{ width: 100%;}
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
.record-box-big{
  min-height: 600px;
  height: auto;
}
.icon-up{
  background: url("../../assets/images/icon.png") no-repeat;
  background-position: -30px -18px;
  position: absolute;
  top: 8px;
  right: 10px;
  cursor: pointer;
}
.record-container-box ul li:hover{
  color: #FFC156;
  -webkit-transition: color .35s ease-in;
  -moz-transition: color .35s ease-in;
  -ms-transition: color .35s ease-in;
  -o-transition: color .35s ease-in;
  transition: color .35s ease-in;
}
.record-container-box ul li{
  height: 35px;
  line-height: 35px;
  cursor: pointer;
}
.record-container-box ul{
  font-size: 12px;
  color: #666666;
  width: 100px;
  margin: 0 auto;
}
.record-container-list{ position: relative;}
.record-container-box{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 55;
  width: 160px;
  height: 119px;
  background: #FFFFFF;
  border: 1px solid #EEEEEE;
  -webkit-box-shadow: 0 2px 4px 0 rgba(228,228,228,0.50);
  -moz-box-shadow: 0 2px 4px 0 rgba(228,228,228,0.50);
  box-shadow: 0 2px 4px 0 rgba(228,228,228,0.50);
}
.right-line{
  border-right: 1px solid #EEEEEE;
}
.sub-btn{
  display: block;
  width: 150px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  margin: 0 auto;
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #FFFFFF;
  background: #FDB75A;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
.message-title{
  font-size: 16px;
  color: #333333;
  margin-top: 16px;
  margin-bottom: 26px;
}
.no-more-box{
  min-height: 400px;
  text-align: center;
  margin-top: 100px;
  margin-bottom: 100px;
}
  .jianguo-box img{
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
  .jianguo-box{
    width: 142px;
    height: 118px;
    text-align: center;
    margin: 0 auto;
  }
.default-btn{
  font-size: 12px;
  color: #666666;
}
.canceled{
  font-size: 12px;
  color: #EE3B2B;
}
.already-paid{
  font-size: 12px;
  color: #70B148;
}
.margin-top-box{ margin-top: 15px;}
.pic-box img{
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}
.pic-name-box{
  width: 220px;
  margin-top: 15px;
  word-wrap: break-word;
  word-break:break-all;
}
.pic-box{
  width: 64px;
  height: 64px;
  text-align: center;
  border: 1px solid #EEEEEE;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 15px;
  margin-right: 15px;
}
  .record-list li{
    margin-bottom: 20px;
    background-color: #fff;
  }
.record-list-old-new{
  background: #fff;
  border-top: 1px solid #EEEEEE;
}
.record-list-old{
  background: #EAEBED;
}
.record-list{
  font-size: 12px;
  margin-top: 20px;
}
.record-table-header{
  height: 31px;
  line-height: 31px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #999999;
  padding-left: 20px;
  border-bottom: 1px solid #EEEEEE;
}
.record-table{
  height: 124px;
}
.icon-box-btn{ margin-left: 30px;cursor: pointer;}
.padding-left-20{
  padding-left: 20px;
}
.down-icon{
  background: url("../../assets/images/icon.png") no-repeat;
  background-position: -30px -48px;
}
.item-cneter{ text-align: center;}
.item-w38{ width: 38%;}
.item-w12{ width: 12%;}
.item-w25{ width: 25%;}
.item-2{
  height: 96px;
}
.item{
  min-height: 42px;
  height: auto;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #666666;
}
.record-header{
  height: 42px;
  line-height: 42px;
  background: #EAEBED;
  overflow: hidden;
}
</style>
