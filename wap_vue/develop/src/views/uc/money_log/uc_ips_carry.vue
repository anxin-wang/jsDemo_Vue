<template>
  <div class="ucIpsCarry">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"
                 @top-status-change="handleTopChange"
                 @bottom-status-change="handleBottomChange" ref="loadmore">
    <ul>
      <li class="clear" v-for="(item,index) in carrylist">
        <div class="fl ucIpsCarryIcon" style="width:20%;">
          <!--	1：充值，2:提现，3:返利-->
          <p v-if="item.type == 1" style="background:#fe7774;">收</p>
          <p v-if="item.type == 2" style="background:#53d08c;">支</p>
          <p v-if="item.type == 3" style="background:#fe7774;">返</p>
        </div>
        <div class="fl ml15 mt5" style="width:45%;">
          <h1 class="f18">富友支付</h1>
          <p class="f12 mt10" style="color:#999">{{item.create_time | time}}</p>
        </div>
        <div class="fr Money f15">
          <p style="color:#fe7774;" v-if="item.type == 1">{{item.amount}}</p>
          <p style="color:#53d08c;" v-if="item.type == 2">{{item.amount}}</p>
          <p style="color:#fe7774;" v-if="item.type == 3">{{item.amount}}</p>
        </div>
      </li>
    </ul>
    </mt-loadmore>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
export default {
    name: 'noticeItems',
    data () {
        return {
            selected:'2',
            carrylist: [],
            topStatus: '',
            allLoaded: false,
            bottomStatus: '',
            page: 1,
        }
    },
    mounted () {
        this.$nextTick(function(){
            this.carry_money(1);
        })
    },
    methods: {
        carry_money (num) {
            let _that = this
            let Base64 = require('js-base64').Base64;
            let url = '/mapi2/index.php?&act=uc_funds_log';
            let formData = new FormData();
            formData.append("email",this.UserName());
            formData.append("pwd",this.UserPwd());
            formData.append("page",num);
            Indicator.open({ spinnerType: 'fading-circle' })
            this.$http.post(url,formData)
                .then(response => {
                    let res = JSON.parse(Base64.decode(response.data));
                    _that.allLoaded = false;
                    _that.carrylist = _that.carrylist.concat(res.list)
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
                    Indicator.close();
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
                this.carrylist = [];
                this.carry_money(1);
                this.$refs.loadmore.onTopLoaded();
            }, 1500);
        },
        loadBottom() {//下拉加载更多
            this.allLoaded = false
            setTimeout(() => {
                this.page++
                this.carry_money(this.page)
                this.allLoaded = true
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

<style scoped>
.Money{
  width:25%;line-height:55px;text-align: right
}
.ucIpsCarry{
  padding:0px 12px;
}
.ucIpsCarry ul li h1{
  font-weight:normal;
}
.ucIpsCarry ul li{
  width:100%;
  margin:15px 0px;
}
.ucIpsCarry ul li .ucIpsCarryIcon p{
  width:45px;
  height:45px;
  border-radius:50%;
  text-align:center;
  line-height:45px;
  font-size:23px;
  font-weight:bold;
  color:white;
  background:#53d08c;
  text-shadow: 1px 1px 1px #666;
}
</style>