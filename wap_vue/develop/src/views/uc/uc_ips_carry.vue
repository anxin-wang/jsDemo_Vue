<template>
  <div class="ucIpsCarry" :style="'min-height:'+screenHeight+'px'">
    <yd-pullrefresh :callback="loadListPull" ref="pullrefreshDemo" v-if="list.length != 0">
      <yd-infinitescroll :callback="loadListScroll" ref="infinitescrollDemo">
        <yd-list theme="1" slot="list">
          <div v-for="item, key in list" :key="key" class="LsitInfo clear">
              <div class="fl carryList_1">
                  <img v-if="item.type == 1" src="../../assets/images/ucenter/shou@1.5x.png" alt="充值">
                  <img v-if="item.type == 2" src="../../assets/images/ucenter/zhi@1.5x.png" alt="提现">
              </div>
              <div class="fl carryList_2">
                  <h2>{{item.message}}</h2>
                  <p>{{item.create_time | time}}</p>
              </div>
              <div class="fr carryList_3">
                  <p v-if="item.type == 1" style="color:#fa7878;">+{{item.amount}}</p>
                  <p v-if="item.type == 2" style="color:#53d08c;">-{{item.amount}}</p>
              </div>
          </div>
        </yd-list>
        <!-- 数据全部加载完毕显示 -->
        <span slot="doneTip">没有更多记录~~</span>
        <!-- 加载中提示，不指定，将显示默认加载中图标 -->
        <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading12.svg"/>
      </yd-infinitescroll>
    </yd-pullrefresh>
    <div  v-if="list.length == 0" class="NotList">暂无信息</div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
import { toastInfo } from '../../service/toastInfo'
import {PullRefresh} from 'vue-ydui/dist/lib.rem/pullrefresh'
Vue.component(PullRefresh.name, PullRefresh);
import { screenHeight } from '../../service/toastInfo'
import { ucIpsCarry } from '../../service/getData'
export default {
    data () {
        return {
            screenHeight:screenHeight,
            list: [],
            page: 1,
            total:""
        }
    },
    mounted () {
        this.$nextTick(function(){
            this.info(1);
        })
    },
    methods: {
        /*下拉刷新*/
        loadListPull(){
            setTimeout(() => {
                let _this = this
                _this.page = 1
                _this.list = []
                _this.info(1)
                /*刷新完毕*/
                _this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad')
            },1000)
        },
        /*上拉加载*/
        loadListScroll() {
            let _this = this
            _this.page++
            if (_this.page > _this.total) {
                /*滚动加载 所有数据加载完毕 */
                toastInfo("没有更多记录了")
                _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
                return
            }
            /*滚动加载 单次请求数据完毕 */
            _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
            _this.info(_this.page)
        },
        /*上拉加载追加数据*/
        callBackInfo(obj){
            let _this = this
            _this.list = [..._this.list, ...obj]
        },
        info (num) {
            let _that = this
            const wapName = window.storeWithExpiration.get('user_name')
            const wapPwd = window.storeWithExpiration.get('user_pwd')
            ucIpsCarry(wapName,wapPwd,num).then(res => {
                _that.total = res.total_page
                _that.page = res.page
                _that.callBackInfo(res.list)
            })
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
            var h = date.getHours()+8;
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

<style scoped lang="less">
.ucIpsCarry{
    width:100%;
    background:#f5f5f5;
    position:absolute;
    left:0px;
    top:0px;
    padding-top:45px;
}
.LsitInfo{
    margin-top:10px;
    padding:7px 15px;
    border-bottom:1px solid #e5e5e5;
    background:white;
    .carryList_1{
        width:50px;
        height:50px;
        border-radius:50px;
        overflow: hidden;
        img{width:100%;}
    }
    .carryList_2{
        margin-left:10px;
        padding-top:5px;
        h2{
            font-size:15px;
            font-weight:normal;
        }
        p{
            margin-top:4px;
        }
    }
    .carryList_3{
        line-height:50px;
        font-size:12px;
        color: #ff5f5f;
    }
}
.NotList{
    text-align:center;
    line-height:400px;
}
</style>