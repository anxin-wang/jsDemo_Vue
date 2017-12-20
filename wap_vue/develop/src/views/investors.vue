<template>
  <div class="investors">
    <p class="title">已认购<span>{{ list.deal_load_count }}</span>人</p>
    <section class="numbers-container">
      <ul>
        <li v-for="(item,index) in list.deal_load_list">
          <div class="numbers-list">
            <div class="numbers-item item-l">
              <div class="item-box" :class="[{'p1': index == 0},{'p2': index == 1},{'p3': index == 2}]"></div>
              <div>{{ item.mobile }}</div>
              <span>{{ item.load_time }}</span>
            </div>
            <div class="numbers-item item-r">
              {{ item.money }}元
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
export default {
  name: 'investors',
  data () {
    return{
      list: []
    }
  },
  mounted () {
    this.$nextTick(function(){
        this.info();
    })
  },
  methods: {
    info () {
      let id = this.$route.params.id;
      let Base64 = require('js-base64').Base64
      if(id != null && id != ""){
        let url = '/mapi2/index.php?&act=deal_load_record&deal_id=' + id;
        this.$http.get(url)
          .then(response => {
            let res = JSON.parse(Base64.decode(response.data));
            this.list = res.items;
          },response => {

          })
      }
    }
  }
}
</script>
<style scoped>
  .item-r{ padding-top: 16.8px;}
  .item-l div:nth-child(2){ padding-top: 10px;}
  .item-l span{ color: #9b9b9b;}
  .p1{ background: url("../assets/images/investment/jinpai.png") no-repeat;}
  .p2{ background: url("../assets/images/investment/yinpai.png") no-repeat;}
  .p3{ background: url("../assets/images/investment/tongpai.png") no-repeat;}
  .item-box{
    width: 27px;
    height: 32px;
    position: absolute;
    top: 12px;
    left: 3px;
    -webkit-background-size: contain;
    background-size: contain;
  }
  .numbers-container ul{ margin: 0 10px;}
  .numbers-container ul li:first-child{ border-top: 0;}
  .numbers-container ul li{
    border-top: 1px solid #e9e9e9;
  }
  .numbers-list{
    display: -webkit-flex; /* Safari */
    display: flex;
    background-color: #fff;
    width: 100%;
    text-align: center;
    font-size: 15px;
    color: #999;
  }
  .numbers-item{
    -webkit-flex-grow: 1;
    flex-grow: 1;
    margin: 0;
    position: relative;
    color: #333333;
  }
.numbers-container{ background-color: #fff;}
.title span{ color: #f4b13c;}
.title{ color: #9a9a9a;font-size: 15.5px;padding:15px;border-bottom: 1px solid #e9e9e9;}
</style>
