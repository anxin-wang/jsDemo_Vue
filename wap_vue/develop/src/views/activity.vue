<template>
  <div class="activity">
    <activity-bar v-if="bol" @refreshList="loadeMore" :activityData="list" :mark="1" :total-pages="totalPages"></activity-bar>
  </div>
</template>
<script>
  /*import { Indicator } from 'mint-ui';*/
  import ActivityBar from '../components/ActivityBar'
  export default {
    name: 'activity',
    components: { ActivityBar },
    data () {
      return {
        activityArr: [],
        list: [],
        allLoaded: false,
        bol: false,
        totalPages: 0
      }
    },
    mounted () {
      this.$nextTick(function(){
        this.loadeMore(1)
      })
    },
    methods: {
      callBackInfo (obj) {
        if(obj == null || obj == ""){
          this.allLoaded = true;
        }
        this.list = this.list.concat(obj)
      },
      loadeMore (num) {
        /*Indicator.open({ spinnerType: 'fading-circle' })*/
        if(num == "default"){//调用刷新
          this.allLoaded = false;
          this.list = [];
          this.info();
        }else{ //加载更多
          this.info(num);
        }
      },
      info (num) {
        let Base64 = require('js-base64').Base64;
        let Url = '/mapi2/index.php?&act=activity&page=' + num;
        /*Indicator.open({ spinnerType: 'fading-circle' })*/
        this.$http.get(Url)
          .then(response => {
            let res = JSON.parse(Base64.decode(response.data));
            this.bol = true;
            this.allLoaded = false;
            this.totalPages = res.totalPages;
            if(num > 1){
              this.callBackInfo(res.list);
            }else{
              this.list = res.list;
            }
            /*Indicator.close();*/
          })
      }
    }
  }
</script>
<style>
  .mint-header.is-fixed{ z-index: 55!important;}
</style>
<style scoped>
  .activity{  font-family: "微软雅黑体";  background-color: #F5F5F5;  }
</style>
