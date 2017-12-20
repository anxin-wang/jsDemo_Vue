<template>
  <div class="page-loadmore-wrapper" ref="wrapper">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"
                 @top-status-change="handleTopChange"
                 @bottom-status-change="handleBottomChange" ref="loadmore">
      <ul class="activity-list">
        <li v-for="(item,index) in activityData"  @click="saveUrl(item)">
          <a href="javascript:void(0);">
            <div v-if="mark == 1">{{ item.title }}</div>
            <div v-if="mark == 1">{{ item.activity_date }}</div>
            <img :src="item.img_url" class="auto-img"/>
          </a>
        </li>
      </ul>
      <router-link id="atyInfo" to="/activityInfo"></router-link>

    </mt-loadmore>
  </div>
</template>
<script>
  import { Lazyload } from 'mint-ui';
  export default {
    name: 'activityBar',
    props: ['activityData','mark',"totalPages"],
    data () {
      return {
        topStatus: '',
        allLoaded: false,
        bottomStatus: '',
        page: 1
      }
    },
    methods: {
       saveUrl (item) {
         let activity_type = item.activity_type;
         if(activity_type != 1){
           if(item.ser_data.url != null && item.ser_data.url!= ""){
             let ob = { state: 0, url: item.ser_data.url}
             ob = JSON.stringify(ob);
             storeWithExpiration.set("ACTIVITYURL", ob);
             document.getElementById("atyInfo").click();
           }
         }
       },
      handleTopChange(status) {
        this.topStatus = status;
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadTop() {
        setTimeout(() => {//上拉刷新
          this.allLoaded = false;
          this.page = 1;
          this.$emit('refreshList', 'default');
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
      },
      loadBottom() {//下拉加载更多
        if(this.mark == 0){
          return false;
        }else{
          setTimeout(() => {
            let obj = this.allLoaded;
            if(!obj){
              if(this.totalPages != this.page){
                this.page = this.page + 1;
                this.$emit('refreshList', this.page);
              }
            }else{
              this.allLoaded = true;
            }
            this.$refs.loadmore.onBottomLoaded();
          }, 1500);
        }
      }
    }
  }
</script>
<style scoped>
  .loading-title{ font-size: 12px;display: block;margin-top: -10px}
  .mint-loadmore-top > span > span {
    margin-left: auto;
    margin-right: auto;
    margin-top: 5px;
    display:block;
    width:30px;
    transform: rotate(180deg);
  }
  .mint-loadmore-bottom > span > span  {
    margin-left: auto;
    margin-right: auto;
    margin-top: -30px;
    display:block;
    width:30px;
  }

  .activity-list a div:first-child{ color: #333333;font-size: 14px;padding: 5px 11px;font-weight: 600;}
  .activity-list a div:nth-child(2){ color: #999;font-size: 13px;padding-left: 11px;padding-bottom: 2.5px;}
  .activity-list a div:nth-child(3){ margin-bottom: 6.5px;}
  .activity-list a{ display: block;}
  .activity-list li{
    background-color: #fff;
    margin: 10px 0;
    padding-bottom: 10px;
    height: 130px;
  }
  .auto-img{
    max-height: 130px;
    width: 93.5%;
    height: auto;
    margin-left: 15px;
  }
  @media screen and (min-width: 375px) and (max-width: 413px) {
    .activity-list a div:first-child{ padding: 5px 11px;}
    .activity-list a div:nth-child(2){ padding-left: 11px;}
    .activity-list a div:nth-child(3){ margin-bottom: 6.5px;}
    .auto-img{ width: 93%; margin-left: 12px;height: 135px;}
    .activity-list li{
      height: 135px;
    }
  }
  @media screen and (min-width: 320px) and (max-width: 374px) {
    .activity-list a div:first-child{ padding: 5px 8px;}
    .activity-list a div:nth-child(2){ padding-left: 8px;}
    .activity-list a div:nth-child(3){ margin-bottom: 6.5px;}
    .auto-img{ width: 92.5%; margin-left: 8px;}
  }
</style>
