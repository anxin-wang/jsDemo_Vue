<template>
   <button type="submit" @click="send" :disabled="time > 0">  {{ text }}  </button>
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
      mobilecode:'',
      getpwd: 0
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
    send (marks) {
        let _that = this
        if(typeof(marks) == "string"){
          _that.captchaValidate = marks;
        }

        let Base64 = require('js-base64').Base64
        let Url = '/mapi2/index.php?&act='+_that.mobilecode.codeUrl
        let formData = new FormData();
        let data = _that.mobilecode.codeinfo
        for (let i=0;i<data.length;i++){
            let reg = /^1[3|4|5|7|8][0-9]{9}$/
            let flag = reg.test(data[i].iphone)
            if(flag == false){
                _that.MintUiToast("请输入正确的手机号")
                return false
            }else{
                formData.append(data[i].field,data[i].iphone)
            }
        }


        if(_that.getpwd != 1){
          //meiyan_20171010: add NECaptchaValidate to send button
          if(_that.captchaValidate){
            formData.append("NECaptchaValidate", _that.captchaValidate)
          }else{
            _that.$emit('listenToChildEvent',true)
            //_that.MintUiToast("请通过滑动验证")
            return false
          }
          //end of meiyan
        }

        Indicator.open({ spinnerType: 'fading-circle' })
        _that.$http.post(Url,formData)
            .then(response => {
                var response = JSON.parse(Base64.decode(response.data));
                if(response.response_code == 1){
                    _that.time = _that.second
                    _that.timer()
                    _that.$emit('send')
                    _that.MintUiToast(response.show_err)
                }else{
                    _that.MintUiToast(response.show_err)
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

<style scoped>

</style>
