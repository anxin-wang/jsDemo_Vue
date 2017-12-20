<template>
  <div class="mallPreferred mt10 pl15 pr15 pt15 pb10">
    <div class="mallPreferredTitle clear">
      <span class="fl">会员任务</span>
      <!--<router-link class="fr" to="#">做任务得积分&nbsp;&gt;</router-link>-->
    </div>
    <div class="mallLeaguerTask mt10">
      <yd-flexbox>
        <yd-flexbox-item>
          <router-link class="TaskItem1" to="#">
            <img onclick="zichanjiaActivityType()" src="../../../assets/images/mall/index/img_07.png" alt="">
          </router-link>
        </yd-flexbox-item>
        <yd-flexbox-item>
          <router-link class="TaskItem1" :to="'/infoPer/'+UserId">
            <img src="../../../assets/images/mall/index/img_05.png" alt="">
          </router-link>
        </yd-flexbox-item>
        <yd-flexbox-item>
          <router-link class="TaskItem1" to="#">
            <img onclick="shareMsg()" src="../../../assets/images/mall/index/img_06.png" alt="">
          </router-link>
        </yd-flexbox-item>
      </yd-flexbox>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
/*布局*/
import {FlexBox, FlexBoxItem} from 'vue-ydui/dist/lib.rem/flexbox';
Vue.component(FlexBox.name, FlexBox);
Vue.component(FlexBoxItem.name, FlexBoxItem);
export default {
  props:{
      lsit:Array
  },
  data () {
    return {
        UserId:""
    }
  },
  mounted () {
    this.user()
  },
  methods:{
      user(){
          let _self = this;
          let Base64 = require('js-base64').Base64
          let url = '/mapi2/index.php'
          let formData = new FormData()
          formData.append("act",'uc_center')
          formData.append("email",_self.userName())
          formData.append("pwd",_self.userPwd())
          _self.$http.post(url, formData).then(function (response) {
              let res = JSON.parse(Base64.decode(response.data));
              _self.UserId = res.id
          });
      },
      zichanjiaActivityType(){
          var obj = {type: "0", cate_id: "123",borrow_id: "234"}
          zichanjia_app_android.activity(JSON.stringify(obj));
      },
      shareMsg(){
          zichanjia_app_android.sharemsg();
      },
      userName(){ return window.storeWithExpiration.get('MallUserName')},
      userPwd(){return window.storeWithExpiration.get('MallUserPwd')},
  }
}
</script>

<style scoped>
.mallPreferred{
  background:white;
}
.mallPreferredTitle{
  width:100%;
  font-size:15px;
}
.mallPreferredTitle span{
  display:inline-block;
  font-weight:600;
  font-family: "苹方", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.mallPreferredTitle a{
  display:inline-block;
  font-size:12px;
}

.mallLeaguerTask > div > div > a{
  display:block;
  margin:0px 5px;
}
.mallLeaguerTask > div > div > a > img{
  width: 100%;
}

@media screen and (max-width: 320px) {
}
@media screen and (min-width: 375px) {

}
</style>
