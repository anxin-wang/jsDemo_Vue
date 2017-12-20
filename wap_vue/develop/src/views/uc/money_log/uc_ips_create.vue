<template>
  <div class="ucIpsCarry">
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">
        <router-link to="/uc_ips_create">充值</router-link>
      </mt-tab-item>
      <mt-tab-item id="2">
        <router-link to="/uc_ips_carry">提现</router-link>
      </mt-tab-item>
    </mt-navbar>
    <div class="page-loadmore">
      <div class="dispalyfiex ConTit">
        <div class="flex1">时间</div>
        <div class="flex1">方式</div>
        <div class="flex1">状态</div>
        <div class="flex1">金额(元)</div>
      </div>
      <div class="page-loadmore-wrapper Conlist" ref="wrapper">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"
                     @top-status-change="handleTopChange"
                     @bottom-status-change="handleBottomChange" ref="loadmore">
          <ul>
            <li class="dispalyfiex"  v-for="(item,index) in chargelist" v-if="item != undefined">
              <div class="flex1"style="line-height:20px;">{{item.create_time | time}}</div>
              <div class="flex1">富友支付</div>
              <div class="flex1">
                <template v-if="item.response_code == '0000'">已支付</template>
                <template v-else>未支付</template>
              </div>
              <div class="flex1">{{item.amount}}</div>
            </li>
          </ul>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
export default {
    name: 'noticeItems',
    data () {
        return {
            selected:'1',
            chargelist: [],
            topStatus: '',
            allLoaded: false,
            bottomStatus: '',
            page: 1,
        }
    },
    mounted () {
        this.$nextTick(function(){
            this.charge(1)
        })
    },
    methods: {
        charge (num) {
            let _that = this
            let Base64 = require('js-base64').Base64;
            let url = '/mapi2/index.php?&act=charge';
            let formData = new FormData();
            formData.append("email",this.UserName());
            formData.append("pwd",this.UserPwd());
            formData.append("page",num);
            Indicator.open({ spinnerType: 'fading-circle' })
            this.$http.post(url,formData)
                .then(response => {
                    let res = JSON.parse(Base64.decode(response.data));
                    _that.allLoaded = false;
                    _that.chargelist = _that.chargelist.concat(res.itemList)
                    if(res.itemList != ''){
                        if(res.page != undefined){
                            if(res.page.page_total > res.page.page){
                                Toast({
                                    message: '数据加载完成',
                                    position: 'bottom',
                                    duration: 1000
                                })
                            }else{
                                Toast({
                                    message: '没有数据了',
                                    position: 'bottom',
                                    duration: 1000
                                })
                            }
                        }
                    }
                    console.log(res)
                    Indicator.close();
                },response => {
                })
        },
        handleTopChange(status) {
            this.topStatus = status;
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        loadTop() {
            setTimeout(() => {//上拉刷新
                this.page = 1;
                this.allLoaded = false;
                this.chargelist = [];
                this.charge(1);
                this.$refs.loadmore.onTopLoaded();
            }, 1500);
        },
        loadBottom() {//下拉加载更多
            this.allLoaded = false;
            setTimeout(() => {
                this.page++
                this.charge(this.page)
                this.allLoaded = true;
                this.$refs.loadmore.onBottomLoaded();
            }, 1500);
        },
        UserName () {
            return window.storeWithExpiration.get('user_name')
        },
        UserPwd () {
            return window.storeWithExpiration.get('user_pwd')
        }
    },
    filters: {
        time: function (time) {
            var date = new Date();
            date.setTime(time * 1000);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var f = date.getMinutes();
            f = f < 10 ? ('0' + f) : f;
            var s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d + ' ' + h + ':' + f + ':' + s;
        }
    }
}
</script>
<style>
.ucIpsCarry .mint-navbar .mint-tab-item{
  padding:0px;
}
.ucIpsCarry .mint-navbar{
  width:100%;
  position:fixed;
  left:0px;
  top:45px;
  z-index: 9999;
}
.ucIpsCarry .mint-navbar .mint-tab-item > div > a{
  line-height:40px;
  display:block;
}
</style>
<style scoped>
a{display:block;}
.FontColor{
  color:#989898;
}
.ConTit{
  width:100%;
  position:fixed;
  left:0px;
  top:88px;
  z-index: 9999;
}
.ConTit > div{
  text-align:center;
  background:#F3F3F3;
  line-height:40px;
  border-bottom:1px solid #ccc;
  font-weight:bold;
}
.Conlist{
  margin-top:90px;
}
.Conlist ul li{
  text-align:center;
  line-height:40px;
  background:#FBFBFB;
  border-bottom:1px solid #ccc;
  padding:8px 0px;
}
</style>