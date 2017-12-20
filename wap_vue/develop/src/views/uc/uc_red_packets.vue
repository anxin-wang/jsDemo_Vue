<template>
  <div class="redPackets">
    <div class="redPacketsMoney clear">
      <div class="fl">红包可用金额 <span>1000元</span></div>
      <div class="fl">累计使用红包 <span>1000元</span></div>
    </div>
    <div class="available">有<span>2</span>红包可用</div>
    <div class="redPacketsList">
      <ul>
        <li v-for="item in 10">
          <div class="fl">
            <i>
              <img src="../../assets/images/ucenter/hongbao@1.5x.png" alt="">
              <span>{{item}}20</span>
            </i>
            <p>2017-02-32 45:45</p>
          </div>
          <div class="fl">
            <h1>注册红包{{item}}20元</h1>
            <ul>
              <li>投资满<span class="red">2000.00</span>元</li>
              <li>限期满<span>{{item}}30</span>天可用</li>
              <li>有效期<span>2017/02/02-2017/02/02</span></li>
            </ul>
          </div>
          <div class="fr">
            <p>立即使用</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
  name: 'UcInvest',
  data () {
    return {
    }
  },
  mounted () {
      this.UserInfo ()
  },
  methods:{
      /*获取银行卡信息*/
      UserInfo () {
          let _that = this
          let Base64 = require('js-base64').Base64
          let Url = '/mapi2/index.php?&act=uc_bank'
          let formData = new FormData();
          formData.append("email",_that.UserName());
          formData.append("pwd",_that.UserPwd());
          Indicator.open({ spinnerType: 'fading-circle' })
          _that.$http.post(Url,formData)
              .then(response => {
                  var response = JSON.parse(Base64.decode(response.data));

                  Indicator.close()
              },response => {
              })
      },
      UserName () {
          return window.storeWithExpiration.get('user_name')
      },
      UserPwd () {
          return window.storeWithExpiration.get('user_pwd')
      }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/css/uc_red_packets.less";
</style>
