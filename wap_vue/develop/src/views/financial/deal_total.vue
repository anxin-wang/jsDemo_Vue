<template>
  <div class="FinancialHome">
    <div class="InvitationNumber">
      <p>邀请人数(人)</p>
      <h1 v-if="userData.subcount != '' ">{{userData.subcount}}</h1>
      <h1 v-else>0.00</h1>
    </div>
    <div class="InvitationReward clear">
      <div class="fl">
        <p>个人年化投资总额(元)</p>
        <p v-if="userData.individual != '' ">{{userData.individual}}</p>
        <p v-else>0.00</p>
      </div>
      <div class="fl">
        <p>团队年化投资总额(元)</p>
        <p v-if="userData.members != '' ">{{userData.members}}</p>
        <p v-else>0.00</p>
      </div>
    </div>
    <div class="InvitationUserInfo">
      <ul>
        <li>
          <p>姓名</p>
          <input type="text" :value="userData.name" readonly="readonly">
        </li>
        <li>
          <p>手机号</p>
          <input type="text" :value="userData.mobile" readonly="readonly">
        </li>
      </ul>
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
        userData:""
    }
  },
  mounted(){
      this.userData = this.$route.params
  },
  methods:{
  }
}
</script>

<style scoped>

</style>
