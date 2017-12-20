<template>
  <div class="noticeItemsInfo">
    <section class="section1">
      <div v-text="arr.sub_title"></div>
      <span>系统公告</span><span>{{ arr.create_time |  filterTimeStamp}}</span>
    </section>
    <section class="section2" v-html="arr.content"></section>
  </div>
</template>
<script>
export default {
  name: 'noticeItemsInfo',
  data () {
    return {
       arr: {}
    }
  },
  mounted () {
    this.$nextTick(function(){
        this.info();
    })
  },
  filters: {
    filterTimeStamp (timeStamp) {
      var date = new Date();
      date.setTime(timeStamp * 1000);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d
    }
  },
  methods: {
    info () {
      let id = this.$route.params.id;
      let Base64 = require('js-base64').Base64;
      if(id != null && id != ""){
        let url = '/mapi2/index.php?&act=article&act_2=getdetail&id=' + id;
          this.$http.get(url)
            .then(response => {
            let res = JSON.parse(Base64.decode(response.data));
              this.arr = res;
              this.setTitle(res.title);
          },response => {

          })
      }
    },
    setTitle (name) {//设置头部
      let obj = this.$route.matched[0];
      obj.meta.Title = name;
    }
  }
}
</script>
<style>
  .section2 table{
    table-layout: fixed;
  }
  .section2 table th, .section2 table td{
    vertical-align: middle;
    word-break:break-all;
    word-wrap:break-word;
  }
  .section2 img, .section2 video, .section2 table{ width: 100%;height: auto;}
</style>
<style scoped>

  .section2{
    padding: 10px;
    width: 100%;
  }

  .section1{ border-bottom: 1px solid #ededed;}
  .section1 span{ color: #b2b2b2;font-size: 14px;padding-left: 10px;padding-bottom: 10px;display: inline-block;}
  .section1 div{
    color: #333333;
    font-size: 15.5px;
    font-weight: 600;
    padding-top: 5px;
    padding-left: 10px;
  }
.noticeItemsInfo{ background-color: #fff;}
</style>
