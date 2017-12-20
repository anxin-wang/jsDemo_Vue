<template>
   <button class="TimerBut" type="submit" @click="send" :disabled="time > 0">  {{ text }}  </button>
</template>

<script>
import bus from '../assets/eventBus';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  props: {
      second: {
          type: Number,
          default: 60
      },
      mobilecode:''
  },
  data () {
    return {
      time: 0,
      captchaValidate: '' //meiyan_20171010: for receiving validation code
    }
  },
  //meiyan_20171010: add event listener for captchaValidate
  mounted(){
    let _that = this
    bus.$on("sentCaptchaValidte", function(validate){
      _that.captchaValidate = validate
    })
  },
  //end of meiyan
  methods: {
    send () {
        let _that = this
        let Base64 = require('js-base64').Base64
        let Url = _that.mobilecode.codeUrl
        Indicator.open({ spinnerType: 'fading-circle' })
        _that.$http.get(Url)
            .then(response => {
                var response = response.data
                if(response.status == 1){
                    _that.time = _that.second
                    _that.timer()
                    _that.$emit('send')
                    _that.MintUiToast(response.info)
                }else{
                    _that.MintUiToast(response.info)
                }
                Indicator.close()
            },response => {
            })

    },
      MintUiToast(value){
        Toast({
            message: value,
            position: 'bottom',
            duration: 1000
        })
    },
    timer () {
      if (this.time > 0) {
        this.time = this.time - 1
        setTimeout(this.timer, 1000)
      }
    }
  },
  computed: {
    text () {
      return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码'
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/css/common.less";
.TimerBut{
   width:90px;
   line-height:35px;
   margin-top:6px;
   float:right;
   border:none;
   background:@maincolor;
   color:white;
   font-size:12px;
   border-radius:4px;
}
</style>
