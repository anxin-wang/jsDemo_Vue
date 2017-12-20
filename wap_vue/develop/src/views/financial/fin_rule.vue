<template>
  <div class="FinRule">
    <div class="FinRule-Banner">
      <img src="../../assets/images/Financial/rule/rule_top_02.png" alt="">
      <img src="../../assets/images/Financial/rule/rule_top_03.png" alt="">
      <img src="../../assets/images/Financial/rule/rule_top_04.png" alt="">
      <img src="../../assets/images/Financial/rule/rule_top_05.png" alt="">
      <img src="../../assets/images/Financial/rule/rule_top_06.png" alt="">
      <img src="../../assets/images/Financial/rule/rule_top_07.png" alt="">
      <img src="../../assets/images/Financial/rule/rule_top_08.png" alt="">
    </div>
    <div class="FinRule-wrap">
      <div class="FinRule-Content-1 FinRule-Content">
        <div class="FinRule-Content-Title">
          <img src="../../assets/images/Financial/rule/tit-1.png" alt="01">
        </div>
        <div class="FinRule-Content-Info">
          <img src="../../assets/images/Financial/rule/rule-lc.png" alt="" v-if="isShow">
          <div class="FinRule-Content-Info-1">获得B级年化投资金额{{Rule1.value}}%</div>
          <div class="FinRule-Content-Info-2">获得D级年化投资金额{{Rule2.value}}%</div>
          <div class="FinRule-Content-Info-3">获得C级年化投资金额{{Rule3.value}}%</div>
        </div>
        <div class="FinRule-Content-Text mb30">
          <p>举个例子：</p>
          <p>A邀请B,B邀请C,C邀请D</p>
          <p v-if="isShow">A获取佣金=B*(年化投资额*{{Rule1.value}}%)+C*(年化投资额*{{Rule2.value}}%)+D*(年化投资额*{{Rule3.value}}%)</p>
          <p class="mt20">*所有D级以下层级用户无佣金返利与用户A。</p>
        </div>
      </div>
      <div class="FinRule-Content-2 FinRule-Content">
        <div class="FinRule-Content-Title">
          <img src="../../assets/images/Financial/rule/tit-2.png" alt="01">
        </div>
        <div class="FinRule-Content-info">
          <img src="../../assets/images/Financial/rule/rule-1.png" alt="">
          <div class="pl20 pr20 mt40 pb30">
            <img src="../../assets/images/Financial/rule/rule-but.png" alt="">
          </div>
        </div>
      </div>
      <div class="FinRule-Content-3 FinRule-Content">
        <div class="FinRule-Content-Title">
          <img src="../../assets/images/Financial/rule/tit-3.png" alt="01">
        </div>
        <div class="FinRule-Content-info mt30 pl15 pr15 b">
          <p>活动时间:</p>
          <p>2017年9月20开始</p>
          <p>活动规则:</p>
          <ul class="mt20">
            <li num="1.">年化投资额=投资金额*(投资天数/360天)</li>
            <li num="2.">投资金额不包括平台赠送体验金,红包</li>
            <li num="3.">佣金在好友所投资的标的成立后到帐,可提现</li>
          </ul>
          <p class="mt20">温馨提示:</p>
          <ul>
            <li num="1.">如通过非常规手段恶意刷奖,一经发现将取消所有奖励</li>
            <li num="2.">本活动最终解释权归坚果理财所有</li>
          </ul>
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
  data () {
    return {
        Rule1:[],
        Rule2:[],
        Rule3:[],
        isShow:false
    }
  },
  mounted(){
      this.financingRule()
  },
  methods:{
      /*理财师规则*/
      financingRule(){
          let _that = this
          let Base64 = require('js-base64').Base64
          let Url = '/mapi2/index.php?&act=financial_planner_rule'
          let user_name = window.storeWithExpiration.get('user_name')
          let user_pwd = window.storeWithExpiration.get('user_pwd')
          let formData = new FormData()
          formData.append("user_name",user_name)
          formData.append("user_pwd",user_pwd)
          Indicator.open({ spinnerType: 'fading-circle' })
          _that.$http.post(Url,formData)
              .then(response => {
                  var response = JSON.parse(Base64.decode(response.data))
                  _that.Rule1 = response.list[0]
                  _that.Rule2 = response.list[1]
                  _that.Rule3 = response.list[2]
                  _that.isShow = true
                  Indicator.close()
              },response => {
              })
      },
      is_weixn(){
          let ua = navigator.userAgent.toLowerCase();
          if(ua.match(/MicroMessenger/i)=="micromessenger") {
              return true;
          } else {
              return false;
          }
      }
  }
}
</script>

<style scoped>

</style>
