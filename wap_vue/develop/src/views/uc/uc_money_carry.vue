<template>
  <div class="UcCarryMoney">
    <div class="UserBank clear">
      <div class="fl">银行卡：尾号<span v-if="isShow" :data-bank_no="UserBankInfo.bank_no" v-substr></span>({{UserBankInfo.bank_name}})</div>
      <div class="fr"><Icon class="f14 ml10" type="chevron-right"></Icon></div>
    </div>
    <p class="lh24 mr15">可用余额:<span class="ColorRed">{{ user_balance | NumberMoney }}</span>元</p>
    <div class="InputMoney">
      <div class="CarryMoneyMoneyBox">
        <label class="f15 Black">金额：</label>
        <input v-model="mAmount" type="number" placeholder="输入充值的金额">
      </div>
    </div>
    <p class="pl15 pr15 mt5 mb5">{{ UserBankInfo.memo2 }}</p>
    <div class="CarryMoneyInfo">
      <ul>
        <li>
          <label class="f15 Black">手续费：</label>
          <input type="text" value="0.00元" readonly>
        </li>
        <li>
          <label class="f15 Black">可到帐：</label>
          <input type="text" value="0.00元" readonly>
        </li>
        <li>
          <label class="f15 Black">到帐时间：</label>
          <input style="width:70%" type="text" :value="NotifyContent" readonly>
        </li>
      </ul>
    </div>
    <div class="mt20 ml15 mr15">
      <mt-button size="large" @click.stop="focharge" class="ButtonSize" type="danger">提现</mt-button>
    </div>
  </div>
</template>

<script>
    import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
    name: 'MenuBottom',
    data () {
        return {
            isShow: false,
            UserBankInfo:[],
            user_balance:'',
            mAmount: '',
            NotifyContent: ''
        }
    },
    mounted () {
        let _that = this
        /*获取用户可用金额*/
        _that.user_balance = window.storeWithExpiration.get('ips_balance')
        _that.UserBank ()
        _that.notify ()
        Indicator.open({ spinnerType: 'fading-circle' })
    },
    methods: {
      /*获取银行卡信息*/
        UserBank () {
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
                    if(response.response_code == 1){
                        _that.UserBankInfo = response.bankList
                        _that.isShow = true
                    }else{
                        Toast({
                            message: response.show_err,
                            position: 'bottom',
                            duration: 5000
                        });
                    }
                    Indicator.close()
                },response => {
                })
        },
        notify () {
            let _that = this
            let Base64 = require('js-base64').Base64
            let Url = '/mapi2/index.php?&act=uc_notify'
            let formData = new FormData();
            formData.append("email",_that.UserName());
            formData.append("pwd",_that.UserPwd());
            formData.append("type",2);
            Indicator.open({ spinnerType: 'fading-circle' })
            _that.$http.post(Url,formData)
                .then(response => {
                    var response = JSON.parse(Base64.decode(response.data));
                    if(response.response_code == 1){
                        _that.NotifyContent = response.content
                    }else{
                        Toast({
                            message: response.show_err,
                            position: 'bottom',
                            duration: 5000
                        });
                    }
                    Indicator.close()

                },response => {
                })
        },
        focharge () {
            let _that = this
            let Base64 = require('js-base64').Base64
            let Url = '/mapi2/index.php?&act=focharge'
            let formData = new FormData();
            formData.append("email",_that.UserName());
            formData.append("pwd",_that.UserPwd());
            formData.append("amount",_that.mAmount);
            Indicator.open({ spinnerType: 'fading-circle' })
            _that.$http.post(Url,formData)
                .then(response => {
                    var response = JSON.parse(Base64.decode(response.data));
                    if(response.response_code == 1){
                        storeWithExpiration.set("api_rechargesdk",response.html,86400000);
                        _that.$router.push('/uc_api_rechargesdk');
                    }else{
                        Toast({
                            message: response.show_err,
                            position: 'bottom',
                            duration: 5000
                        });
                    }
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
    },
    directives: {
        /*截取银行卡后四位数字*/
        substr:{
            inserted:function(el){
                let target = el.target
                let Text = el.getAttribute("data-bank_no")
                if(Text.length == 18){
                    el.innerHTML = "("+Text.substring(14)+")"
                }else if(Text.length == 19){
                    el.innerHTML = "("+Text.substring(15)+")"
                }else if(Text.length == 20){
                    el.innerHTML = "("+Text.substring(16)+")"
                }
            }
        },
    },
    filters:{
        NumberMoney(val){
            /*数字格式化为货币格式*/
            function formatMoney(number, places, symbol, thousand, decimal) {
                number = number || 0;
                places = !isNaN(places = Math.abs(places)) ? places : 2;
                /*symbol = symbol !== undefined ? symbol : "$";*/
                symbol = symbol !== undefined ? symbol : "";
                thousand = thousand || ",";
                decimal = decimal || ".";
                var negative = number < 0 ? "-" : "",
                    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
                    j = (j = i.length) > 3 ? j % 3 : 0;
                return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
            }
            return formatMoney(val)
        }
    }

}
</script>

<style scoped>
.ColorRed{
  color:red;
}
.UcCarryMoney .UserBank{
  border-width:1px;
  border-color:#D9D9D9;
  border-style:solid none;
  margin-top:10px;
  padding:10px 15px;
  background:white;
  font-size:14px;
  color:black;
}
.UcCarryMoney .InputMoney{
  padding:7px 15px;
  background:white;
  border-width:1px;
  border-color:#D9D9D9;
  border-style:solid none;
}
.UcCarryMoney .InputMoney .CarryMoneyMoneyBox{
  padding-left:50px;
  position:relative;
}
.UcCarryMoney .InputMoney .CarryMoneyMoneyBox input{
  width:100%;
  height:30px;
  border:none;
}
.UcCarryMoney .InputMoney .CarryMoneyMoneyBox label{
  position:absolute;
  left:0px;
  top:4px;
}
.UcCarryMoney > p.mr15{
  text-align:right;
}
.CarryMoneyInfo ul li{
  background:white;
  border-bottom:1px solid #e5e5e5;
  padding:10px 15px;
}
.CarryMoneyInfo ul li input{
  border:none;
}
.CarryMoneyInfo ul li:nth-child(3) input{
  color:#F4AC31;
}
.ButtonSize{
  background:#F4AC31;
  border-radius:35px;
}
</style>

