<template>
  <div class="noticeItems">
    <div class="page-loadmore-wrapper" ref="wrapper">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"
                   @top-status-change="handleTopChange"
                   @bottom-status-change="handleBottomChange" ref="loadmore">
        <ul>
          <li v-for="(item,index) in list">
            <!--:to="{ path: '/noticeItemsInfo/' + item.id }"-->
            <a @click="newNotice(item)">
              <p>{{ item.title }}</p>
              <span>系统公告</span><span>|</span><span>{{ item.create_time }}</span>
            </a>
          </li>
        </ul>
        <router-link id="activityInfo" to="/activityInfo"></router-link>
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">
            <mt-spinner type="snake" class="loading-dow"></mt-spinner>
            <label class="loading-title">下拉刷新</label>
          </span>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'"  class="loading-up">
            <mt-spinner type="snake"></mt-spinner>
            <label class="loading-title">上拉刷新</label>
          </span>
        </div>

      </mt-loadmore>
    </div>

  </div>
</template>
<script>

  import { noticeItems } from '../service/getData'


export default {
  name: 'noticeItems',
  data () {
      return {
        list: [],
        topStatus: '',
        allLoaded: false,
        bottomStatus: '',
        page: 1,
        pageArr:{}
      }
  },
  mounted () {
    this.$nextTick(function(){
        this.info(1);
    })
  },
  methods: {
    newNotice (item) {
      if(item != null && item != ''){
        if(item.link != null && item.link != ''){
          let ob = { state: 1, title: item.title, url: item.link}
          ob = JSON.stringify(ob);
          storeWithExpiration.set("ACTIVITYURL", ob);
          document.getElementById("activityInfo").click();
          return false;
        }else{
          //跳原有公告
          location.href = '/#/noticeItemsInfo/' + item.id
        }
      }
    },
    resets () {
      this.page = 1;
      this.allLoaded = false;
      this.list = [];
      this.info(1);
    },
    callBackInfo (obj) {
      if(obj == null || obj == ""){
          this.allLoaded = true;
      }
      this.list = this.list.concat(obj)
    },
    async info (num) {
      try{
        let result = await noticeItems(num);
        this.pageArr = result.page;
        this.allLoaded = false;
        this.callBackInfo(result.list);
      }catch (err) {
        console.log(err);
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
       this.resets();
       this.$refs.loadmore.onTopLoaded();
      }, 1500);
    },
    loadBottom() {//下拉加载更多
      setTimeout(() => {
          let obj = this.allLoaded;
          if(!obj){
            this.page++
            this.info(this.page)
          }
        this.$refs.loadmore.onBottomLoaded();
      }, 1500);
    }
  }
}
</script>
<style>.mint-header.is-fixed{ z-index: 55!important; }  html,body{ background-color: #f5f5f5;}</style>
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
  .loadmore-bottom-title{
    display: inline-block;
    margin-bottom: 0;
    height: 25px;
  }

.noticeItems ul{ overflow: hidden;background-color: #f5f5f5;}
.noticeItems ul li{ margin: 5px 0;background-color: #fff;font-size: 14.5px;}
.noticeItems ul li a { display: block;}
.noticeItems a p{ color: #333333;padding: 5px 10px;}
.noticeItems a span{
  display: inline-block;
  color: #b2b2b2;
  font-size: 14px;
  padding-left: 5px;
  padding-bottom: 5px;
}
</style>
