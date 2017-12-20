<template>
  <div class="jg-investList">
    <yd-pullrefresh :callback="loadListPull" ref="pullrefreshDemo" v-if="list.length != 0">
      <yd-infinitescroll :callback="loadListScroll" ref="infinitescrollDemo">
        <yd-list theme="1" slot="list">
            <ul>
                <li v-for="item, key in list" :key="key">
                    <div @click.stop="details(item)">
                        <div class="clear">
                            <h3 class="fl">
                                投资<span>{{item.u_load_money}}</span>元
                                <img v-if="item.is_coupon" width="20" src="../assets/images/ucenter/add.png" alt="">
                            </h3>

                            <p class="fr">投资中</p>
                        </div>
                        <Row class-name="mt7 f14">
                            <Col align="left" span="16">{{item.name}}</Col>
                            <Col align="right" span="8">{{item.rate_foramt_w}}
                                <span style="color:#ff8088;" v-if="item.coupon_rate_w">+{{item.coupon_rate_w}}</span>
                            </Col>
                        </Row>
                        <Row class-name="mt10 FontColor">
                            <Col align="left" span="12">投资日期:{{item.deal_load_time | time}}</Col>
                            <Col align="left" span="12">预期收益:
                            <span id="Pref">{{Profit(item.u_load_money,item.rate,item.repay_time)}}</span>
                            元<span style="color:#ff8088;" v-if="item.coupon_money">+{{item.coupon_money}}元</span></Col>
                        </Row>
                        <Row class-name="mt7 FontColor">
                            <Col align="left" span="12">计息日期:{{item.interest_confirm_time}}</Col>
                            <Col align="left" span="12">预期到帐:{{accounts(item.u_load_money,Profit(item.u_load_money,item.rate,item.repay_time))}}元
                                <span style="color:#ff8088;" v-if="item.coupon_money">+{{item.coupon_money}}元</span>
                            </Col>
                        </Row>
                        <Row class-name="mt7 FontColor">
                            <Col align="left" span="18">兑付日期:{{item.repay_date}}</Col>
                        </Row>
                    </div>
                </li>
            </ul>
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
import {PullRefresh} from 'vue-ydui/dist/lib.rem/pullrefresh'
Vue.component(PullRefresh.name, PullRefresh);
import { toastInfo } from '../service/toastInfo'
import { notImgShow } from '../service/toastInfo'
import { ucIpsinvest } from '../service/getData'

export default {
    props:['recordInfo'],
    data () {
        return {
            page: 1,
            status:'',
            list: [],
            ClassName:"",
            ClassId:''
        }
    },
    watch:{
        recordInfo(val){
            /*1持有中 4投标中 3兑付中*/
            this.status = val
            this.page = 1
            this.list = []
            this.info(val,this.page)
        }
    },
    mounted(){
    },
    methods:{
        /*下拉刷新*/
        loadListPull(){
            setTimeout(() => {
                let _this = this
                _this.page = 1
                _this.list = []
                _this.info(_this.status,1)
                /*刷新完毕*/
                _this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad')
            },1000)
        },
        /*上拉加载*/
        loadListScroll() {
            let _this = this
            _this.page++
            if (_this.pages > _this.total) {
                /*滚动加载 所有数据加载完毕*/
                _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
                return
            }
            /*滚动加载 单次请求数据完毕*/
            _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
            _this.info(_this.status,_this.page)
        },
        /*上拉加载追加数据*/
        callBackInfo(obj){
            let _this = this
            _this.list = [..._this.list, ...obj]
        },
        /*数据请求接口*/
        info(num,page){
            let _this = this;
            if(num != ""){
                const wapName = _this.UserName()
                const wapPwd = _this.UserPwd()
                ucIpsinvest(wapName,wapPwd,num,page).then(res => {
                    _this.total = res.page.page_total
                    _this.pages = res.page.page
                    _this.callBackInfo(res.item)
                })
            }
        },
        Profit(m,w,t){
            //m:本金  w:利率  t:期数
            let money = m * w /100 /360 * t
            return money.toFixed(2)
        },
        accounts(m,s){
            let _that = this
            var money = Number(m) + Number(s)
            if(money.toString().indexOf(".") > -1){
                let lenths = money.toString().split(".")[1].length;
                return money.toFixed(2)
            }else{
                return money.toFixed(2)
            }
        },
        details(data){
            let detailData = {
                dealsId:data.id,
                loadTime:data.deal_load_time,           //投资日期
                confirmTime:data.interest_confirm_time, //计息日期
                repayDate:data.repay_date,              //兑付日期
                loadMoney:data.u_load_money,            //投资金额
                couponRate:data.coupon_rate_w,          //加息券年化率
                couponMoney:data.coupon_money,          //加息券收益
            }
            this.$emit('ucdetailshow', true)
            this.$emit('detailinfo', detailData)
        },
        UserName () {
            return window.storeWithExpiration.get('user_name')
        },
        UserPwd () {
            return window.storeWithExpiration.get('user_pwd')
        }
    },
    filters:{
        time: function (value) {
            if(value != undefined){
                let d = new Date(parseInt(value) * 1000)
                return (d.getFullYear()) + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
            }
        }
    }
}
</script>

<style>
.yd-tab-panel{background-color:#f5f5f5;}
</style>
<style scoped lang="less">
@import "../assets/css/common.less";

.NotList{
  text-align:center;
  line-height:400px;
}

@media screen and (min-width:400px ) {

}
@media screen and (min-width:375px ) and (max-width: 399px) {

}
</style>
