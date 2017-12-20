<template>
  <div class="MallAnnouncement pl45 pr15">
    <yd-rollnotice autoplay="5000">
      <yd-rollnotice-item v-for="item,key in rollnoticeList" :key="key">
        <router-link to="/noticeList">{{item.title}}</router-link>
      </yd-rollnotice-item>
    </yd-rollnotice>
  </div>
</template>

<script>
import Vue from 'vue';

/*滚动公告*/
import {RollNotice, RollNoticeItem} from 'vue-ydui/dist/lib.rem/rollnotice';
Vue.component(RollNotice.name, RollNotice);
Vue.component(RollNoticeItem.name, RollNoticeItem);
export default {
    props:{
        lsit:Array
    },
    data () {
      return {
          rollnoticeList:[]
      }
    },
    mounted () {
      this.rollnoticeInfo()
    },
    methods:{
        rollnoticeInfo () {
            let _self = this;
            _self.defaultImg = require('../../../assets/images/wxbanner_bg.jpg')
            let Base64 = require('js-base64').Base64
            let url = '/mapi2/index.php'
            _self.$http.get(url, {
                params: {
                    act: 'notify_list',
                    act_2: 'announcement',
                    page: 0,
                }
            }).then(function (response) {
                let res = JSON.parse(Base64.decode(response.data));
                _self.rollnoticeList = res.list
            })
        },
        /*公告详情*/
        rollDetail(id){
        }
    },
}
</script>

<style scoped>
.MallAnnouncement{
  background:white;
  text-align: center;
  position:relative;
}
.MallAnnouncement:before{
  content:'';
  width:18px;
  height:18px;
  background:url("../../../assets/images/mall/index/new.png") no-repeat;
  background-size:100%;
  position:absolute;
  left:15px;
  top:5px;
}
.MallAnnouncement a{
  display:block;
  width:100%;
  text-align:left;
}

</style>
