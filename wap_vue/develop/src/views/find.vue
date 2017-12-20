<template>
  <div class="Find">
    <subheader v-bind:obj="Introduce"></subheader>
    <div class="ActivityCenter">
      <router-link to="/activity" class="ActivityCenterHeader clear">
        <h3 class="fl active-font">活动中心</h3>
        <span class="more-font">更多</span>
        <Icon class="fr" type="ios-arrow-right"></Icon>
      </router-link>
      <div class="ActivityCenterCon">
        <activity-bar :activityData="list" :mark="0"></activity-bar>
      </div>
    </div>
  </div>
</template>

<script>
import Subheader from '../components/SubHeader'
import ActivityBar from '../components/ActivityBar'
export default {
  data () {
    return {
        Introduce: [],
        list:[]
    }
  },
  components:{ Subheader, ActivityBar },
  mounted(){
      this.info()
      this.mallUrl()
  },
  methods:{
      info () {
          let Base64 = require('js-base64').Base64;
          let Url = '/mapi2/index.php?&act=activity';
          let formData = new FormData();
          formData.append("page",1);
          this.$http.post(Url,formData)
              .then(response => {
                  let res = JSON.parse(Base64.decode(response.data));
                  if(res.list.length == 0){
                      this.activityList = [];
                      return false;
                  }
                  this.list = res.list;
              })
      },
      mallUrl (){
          let user_name = window.storeWithExpiration.get('user_name')
          let user_pwd = window.storeWithExpiration.get('user_pwd')
          let urlmall = '/mall_index/'+user_name+'/'+user_pwd
          let lst = [
              {Img: require('../assets/images/find/about.png'), text: '关于我们', url: '/about'},
              {Img: require('../assets/images/find/financial.png'), text: '理财学堂', url: '/financing_school'},
              {Img: require('../assets/images/find/phone.png'), text: '客服热线', url: '#',cli:"phone"},
              {Img: require('../assets/images/find/mall.png'), text: '积分商城', url: urlmall}
          ]
          this.Introduce = lst
      }
  }
}
</script>

<style scoped>
  .ivu-icon-ios-arrow-right:before{
    color: #96A0B7;
    font-size: 18px;
  }
.more-font{
  position: absolute;
  top: 11px;
  right: 22px;
  font-size: 12px;
  color: #96A0B7;
}
.active-font{
  font-size: 18px!important;
  color: #000;
  font-weight: bold!important;
}
.ActivityCenter{
  width:100%;
  background:white;
  margin-top:10px;
}
.ActivityCenterHeader{
  display:block;
  padding:7px 12px;
  border-style:none none solid none;
  border-color:#d9d9d9;
  border-width:1px;
  position: relative;
}
.ActivityCenterHeader h3{
  font-size:15px;
  font-weight:normal;
}
.ActivityCenterHeader .fr{
  font-size:23px;
}
.ActivityCenterCon{
  width:100%;
  background:white;
}
.ActivityCenterCon ul{
  padding:10px 12px;
}
.ActivityCenterCon ul li{
  padding-bottom:10px;
}
.ActivityCenterCon ul li a{
  display:block;
}
.ActivityCenterCon ul > li > a > img{
  width:100%;
}
</style>
