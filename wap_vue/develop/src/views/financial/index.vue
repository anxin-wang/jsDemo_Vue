<template>
  <div class="FinancialHome">
    <div class="InvitationNumber">
      <p>累计奖励金额(元)</p>
      <h1>{{financial_planner.total_load_money_exp}}</h1>
      <div class="financialShare" @click.stop="ShowPopup">
        <img src="../../assets/images/Financial/share@1.5x.png" alt="">
      </div>
      <!--微信分享 组件-->
      <wxshare :isShow="isShow" :shareDataobj="shareDataobj" v-on:popuphide="popuphide"></wxshare>
    </div>
    <div class="InvitationReward clear">
      <div class="fl">
        <p>邀请总人数(人)</p>
        <p>{{financial_planner.total_number}}</p>
      </div>
      <div class="fl">
        <p>累计邀请年化投资总额(元)</p>
        <p>{{financial_planner.total_rebate}}</p>
      </div>
    </div>
    <!--邀请总额-->
    <div class="mt10 Total">
      <mt-navbar class="page-part" v-model="selected">
        <mt-tab-item id="1">奖励总额</mt-tab-item>
        <mt-tab-item id="2">年化投资总额</mt-tab-item>
        <mt-tab-item id="3">邀请总人数</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <!--奖励总额-->
          <div class="InvitationTotal">
              <ul class="mb54" v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
                <li v-for="item in financial_plannerList">
                  <router-link :to="{
                    path:'/user_info'+
                    '&name='+item.user_name+
                    '&mobile='+item.mobile+
                    '&subcount='+item.subcount+
                    '&members='+item.rebate_members+
                    '&individual='+item.rebate_individual
                }">
                    <div class="clear T_usser">
                      <div class="fl">
                        <img src="../../assets/images/Financial/portrait@1.5x.png" alt="">
                      </div>
                      <p class="fl">{{item.mobile}}</p>
                      <p class="fr">{{item.repay_start_time | FormatTime}}</p>
                    </div>
                    <div class="T_user_info clear">
                      <div class="fl">
                        <h3>{{item.user_name}}</h3>
                        <p>姓名</p>
                      </div>
                      <div class="fl">
                        <h3>{{item.rebate_total_withdrew}}</h3>
                        <p>已领取奖励(元)</p>
                      </div>
                      <div class="fl">
                        <h3 class="notReceive">{{item.rebate_total_remain}}</h3>
                        <p>未领取奖励(元)</p>
                      </div>
                      <div class="fl">
                        <Icon size="25" type="ios-arrow-right"></Icon>
                      </div>
                    </div>
                  </router-link>
                </li>
              </ul>
              <p v-show="loading" class="page-infinite-loading">
                <mt-spinner type="fading-circle"></mt-spinner>
                加载中...
              </p>
              <div class="T_but">
                <div v-if="receive_status == 1" class="But" @click.stop="withdrawal">一键领取</div>
                <div v-if="receive_status != 1" class="But" style="background: #ccc;">一键领取</div>
              </div>
          </div>

        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <!--年化投资总额-->
          <div class="InvitationTotal">
            <ul v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
              <li v-for="item in money_exp_list">
                <router-link :to="{
                    path:'/deal_total'+
                    '&name='+item.user_name+
                    '&mobile='+item.mobile+
                    '&subcount='+item.exp_total+
                    '&members='+item.exp_members+
                    '&individual='+item.exp_individual
                }">
                  <div class="clear T_usser">
                    <div class="fl">
                      <img src="../../assets/images/Financial/portrait@1.5x.png" alt="">
                    </div>
                    <p class="fl">{{item.mobile}}</p>
                  </div>
                  <div class="T_user_info clear">
                    <div class="fl" style="width:16.333%">
                      <h3>{{item.user_name}}</h3>
                      <p>姓名</p>
                    </div>
                    <div class="fl" style="width:75.333%">
                      <h3 v-if="item.exp_individual != null">{{item.exp_individual}}</h3>
                      <h3 v-else>0.00</h3>
                      <p>年化投资总额(元)</p>
                    </div>
                    <div class="fr mt10" style="width:3.333%">
                      <Icon size="25" type="ios-arrow-right"></Icon>
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
            <p v-show="loading" class="page-infinite-loading">
              <mt-spinner type="fading-circle"></mt-spinner>
              加载中...
            </p>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <!--邀请总人数-->
          <div class="InvitationTotal">
            <ul v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10">
              <li v-for="item in invitation_list">
                <router-link to="#">
                  <div class="clear T_usser">
                    <div class="fl">
                      <img src="../../assets/images/Financial/portrait@1.5x.png" alt="">
                    </div>
                    <p class="fl">{{item.mobile}}</p>
                    <p class="fr">2017/09/07 23:45</p>
                  </div>
                  <div class="T_user_info clear">
                    <div class="fl" style="width:50%">
                      <div class="clear">
                        <p class="fl mt1 mr7">姓名</p>
                        <h3 class="fl">{{item.real_name}}</h3>
                      </div>
                    </div>
                    <div class="fr">
                      <p class="mt1 maincolor" v-if="item.status == 0">未绑定托管</p>
                      <p class="mt1 maincolor" v-if="item.status == 1">未投资</p>
                      <p class="mt1 maincolor" v-if="item.status == 2">投资</p>
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
            <p v-show="loading" class="page-infinite-loading">
              <mt-spinner type="fading-circle"></mt-spinner>
              加载中...
            </p>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class="popupBox" v-show="rewardPopup" style="z-index: 99">
      <div class="popupBg" @click.stop="rewardPopup = false"></div>
      <div class="popupCon relative" style="width:85%">
        <img src="../../assets/images/Financial/in_bg@1.5x.png" alt="理财师">
        <div class="popupText">
          <p>{{money.money}}元</p>
          <span>恭喜您获得邀请好友奖励</span>
          <div class="popupBut" @click.stop="ShowPopup">去炫耀</div>
        </div>
        <div class="closePopupSeat" @click.stop="rewardPopup = false">
          <Icon size="45" type="ios-close-empty"></Icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
import '../../assets/css/financial.less'
export default {
  components:{
      wxshare:require('../../components/share.vue')
  },
  data () {
    return {
        selected:'1',
        rewardPopup:false, //显示领取金额
        isShow:false,
        /*分享信息*/
        shareDataobj:{},

        allLoaded: false,
        loading:false,
        TotalPage1:0,
        TotalPage2:0,
        TotalPage3:0,
        page:1,
        NotData:false,

        /*接口 奖励总额*/
        financial_planner:[],
        financial_plannerList:[],
        invitation_list:[],
        money_exp_list:[],
        receive_status:'',

        /*一键领取*/
        token:'',
        money:''
    }
  },
  mounted(){
      var app = document.querySelector('.InvitationNumber')
      this.$nextTick(function(){
          this.Total_award(1);
          this.money_exp(1);
          this.invitation(1);
          this.rebate();
      })
  },
  methods:{
      /*奖励总额*/
      Total_award (num) {
          let _that = this
          let Base64 = require('js-base64').Base64;
          let Url = '/mapi2/index.php?';
          let user_name = this.UserName()
          let user_pwd = this.UserPwd()
          let formData = new FormData();
          formData.append("act",'uc_financial_planner');
          formData.append("email",user_name)
          formData.append("pwd",user_pwd)
          formData.append("page",num);
          this.$http.post(Url,formData)
              .then(response => {
                  let res = JSON.parse(Base64.decode(response.data));
                  _that.allLoaded = false;
                  if(res.response_code != 0){
                      if(res.data_info != null){
                          _that.TotalPage1 = res.data_info.total_page
                          _that.receive_status = res.data_info.receive_status
                          _that.financial_planner = res.data_info
                          _that.financial_plannerList = _that.financial_plannerList.concat(res.data_info.rebate_list)
                      }
                  }
              })
      },
      /*年化投资总额*/
      money_exp (num) {
          let _that = this
          let Base64 = require('js-base64').Base64;
          let Url = '/mapi2/index.php?';
          let user_name = this.UserName()
          let user_pwd = this.UserPwd()
          let formData = new FormData();
          formData.append("act",'uc_load_money_exp_list');
          formData.append("email",user_name)
          formData.append("pwd",user_pwd)
          formData.append("page",num);
          this.$http.post(Url,formData)
              .then(response => {
                  let res = JSON.parse(Base64.decode(response.data));
                  if(res.response_code != 0){
                      if(res.data_info != null){
                          _that.allLoaded = false;
                          _that.TotalPage2 = res.data_info.total_page
                          _that.money_exp_list = _that.money_exp_list.concat(res.data_info.exp_list)
                      }
                  }
              })
      },
      /*邀请总人数*/
      invitation (num) {
          let _that = this
          let Base64 = require('js-base64').Base64;
          let Url = '/mapi2/index.php?';
          let user_name = this.UserName()
          let user_pwd = this.UserPwd()
          let formData = new FormData();
          formData.append("act",'uc_invitation_list');
          formData.append("email",user_name)
          formData.append("pwd",user_pwd)
          formData.append("page",num);
          this.$http.post(Url,formData)
              .then(response => {
                  let res = JSON.parse(Base64.decode(response.data));
                  _that.allLoaded = false;
                  if(res.response_code != 0){
                      if(res.data_info != null){
                          _that.TotalPage3 = res.data_info.total_page
                          _that.invitation_list = _that.invitation_list.concat(res.data_info.invited_list)
                      }
                  }
              })
      },
      rebate(){
          let _that = this
          let Base64 = require('js-base64').Base64;
          let Url = '/mapi2/index.php?';
          let formData = new FormData();
          formData.append("act",'uc_withdrawal_rebate');
          formData.append("act_2",'gettoken');
          formData.append("email",this.UserName())
          formData.append("pwd",this.UserPwd())
          this.$http.post(Url,formData)
              .then(response => {
                  let res = JSON.parse(Base64.decode(response.data));
                  _that.token = res.token
              })
      },
      /*一键领取*/
      withdrawal(){
          let _that = this
          let Base64 = require('js-base64').Base64;
          let Url = '/mapi2/index.php?';
          let formData = new FormData();
          formData.append("act",'uc_withdrawal_rebate');
          formData.append("act_2",'');
          formData.append("token",this.token);
          formData.append("email",this.UserName())
          formData.append("pwd",this.UserPwd())
          this.$http.post(Url,formData)
              .then(response => {
                  let res = JSON.parse(Base64.decode(response.data));
                  if(res.response_code == 1){
                      this.money = res
                      this.rewardPopup = true
                  }else {
                      Toast({
                          message: res.show_err,
                          position: 'bottom',
                          duration: 1000
                      });
                  }
              })
          //this.rewardPopup = true
      },
      /*滚动加载*/
      loadMore() {
          if(this.selected == 1){
              if(this.page < this.TotalPage1){
                  this.NotData = false
                  this.loading = true;
                  setTimeout(() => {
                      this.page ++
                      this.Total_award(this.page)
                      this.loading = false;
                  }, 2500);
              }else{
                  this.NotData = true
              }
          }else if(this.selected == 2){
              if(this.page < this.TotalPage2){
                  this.NotData = false
                  this.loading = true;
                  setTimeout(() => {
                      this.page ++
                      this.money_exp(this.page)
                      this.loading = false;
                  }, 2500);
              }else{
                  this.NotData = true
              }
          }else if(this.selected == 3){
              if(this.page < this.TotalPage3){
                  this.NotData = false
                  this.loading = true;
                  setTimeout(() => {
                      this.page ++
                      this.invitation(this.page)
                      this.loading = false;
                  }, 2500);
              }else{
                  this.NotData = true
              }
          }
      },
      ShowPopup(){
          /*分享信息*/
          let domain = location.href.split()[0];
          this.shareDataobj = {
              title:"坚果理财",
              desc:"坚果理财,你见过的最靠谱理财平台",
              Url:domain
          }
          this.isShow = true
      },
      popuphide(data){
          this.isShow = data
      },
      UserName () {
          return window.storeWithExpiration.get('user_name')
      },
      UserPwd () {
          return window.storeWithExpiration.get('user_pwd')
      },
  },
  filters: {
      FormatTime: function (time) {
          if(time != -1){
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
          }else{
              return '0'
          }
      }
  }
}
</script>
<style>

.page-infinite-loading{
  width:15%;
  margin:0px auto;
}
</style>
<style scoped lang="less">

</style>
