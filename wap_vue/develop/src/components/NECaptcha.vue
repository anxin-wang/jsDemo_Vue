<template>
    <div id="captcha"></div> <!-- 验证码容器元素 -->
</template>

<script>
//meiyan_20171010: new add component: NECaptcha
import bus from '../assets/eventBus';
export default {

  	mounted(){
	 	this.loadNECaptcha()
	},
	methods:{
	    loadNECaptcha() {
	     	let _that = this
	  		initNECaptcha({
				captchaId: '5430e2aed0a448a39c540bc10bbda6fa',
				element: '#captcha',
				mode: 'float',
				width: 280,
				onReady: function (instance) {
				// 验证码一切准备就绪，此时可正常使用验证码的相关功能
				},
				onVerify: function (err, data) {

					/**
					 * 第一个参数是err（Error的实例），验证失败才有err对象
					 * 第二个参数是data对象，验证成功后的相关信息，data数据结构为key-value，如下：
					 * {
					 *   validate: 'xxxxx' // 二次验证信息
					 * }
					 */
					if(data.validate){
            _that.$emit('listenToChildHideBar',{mark: false,data: data.validate});
          }
					_that.sendCaptchaValidate(data.validate);
				}
			}, function onload (instance) {
			// 初始化成功

			}, function onerror (err) {
			// 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化

			})// end of initNECaptcha
	  	},//end of loadNECaptcha()

	  	sendCaptchaValidate: function(validate){
	  		bus.$emit("sentCaptchaValidte", validate);
	  	}
	}
}

</script>

<style scoped>

</style>
