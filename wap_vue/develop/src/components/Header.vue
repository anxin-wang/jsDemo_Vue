<template>
  <div class="Header" v-if="message.ShowHead == 1">
    <div class="HeaderBox dispalyfiex">
      <div class="flex1 pageReturn" @click.stop="pageReturn"  v-if="message.Rtuen == 1">
          <Icon size="25" type="android-arrow-back"></Icon>
      </div>
      <div class="flex5 pageTitle">{{message.Title}}</div>
      <div class="flex1 pageRightText" @click.stop="pageRightText" v-if="message.RightText != undefined">
        {{ message.RightText }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message'],
  data () {
    return {
      ZcjTitle: '坚果理财'
    }
  },
  mounted () {

  },
  methods: {
      pageReturn(){
          let _this = this
          if(_this.message.Rtuen == 1){
              if(_this.message.RtuenUrl != undefined){
                  _this.$router.push(_this.message.RtuenUrl)
              }else{
                  _this.$router.go(-1)
              }
          }
      },
      pageRightText(){
          let _this = this
          if(_this.message.RightText != undefined){
              _this.$router.push(_this.message.RightTextUrl)
          }
      }
  },

}
</script>
<style scoped lang="less">
@import "../assets/css/common.less";
.Header{
  background:white;
  .HeaderBox{
    margin:0px 15px;
    padding:7px 0px;
    border-bottom:1px solid #e5e5e5;
    div.pageReturn{
      text-align: left;
    }
    div.pageTitle{
      text-align: left;
      font-size:18px;
      line-height:30px;
    }
    div.pageRightText{
      text-align: right;
      line-height:30px;
      font-size:15px;
    }
  }
}
</style>
