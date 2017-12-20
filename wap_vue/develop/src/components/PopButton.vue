<template>
  <div class="pop-button">
    <div class="sub-btn-list">

      <div class="sub-btn-item" v-for="(item, index) in dataInfo" v-if="index +1 != dataInfo.length"
           v-on:click="showPop">
        {{ item.title }}
        <div class="pop-bg hidden" ref="bgBox" v-on:click.stop="closePop"></div>
        <div class="pop-list animated bounceInDown hidden">
          <ul class="poptip-ul">
            <li v-for="i in item.popArr" @click="setPopVal(i.title,$event)">{{ i.title }}</li>
          </ul>
        </div>
      </div>

      <div class="sub-btn-item" v-for="(item, index) in dataInfo" v-if="index +1 == dataInfo.length"
           v-on:click="showPop($event,'mark')">
        {{ item.title }}

        <div class="pop-bg hidden" ref="bgBox" v-on:click.stop="closePop"></div>
        <div class="pop-list animated bounceInDown hidden">
          <ul class="poptip-ul">
            <li v-for="i in item.popArr" @click="setPopVal">{{ i.title }}</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'popButton',
  props: {
    dataInfo: { type: Array, required: true },
    checkPopVal: { type: Function}
  },
  data () {
    return {
      ms: 0,
      changeIcon: 0,
      pop: true,
    }
  },
  methods: {
    setPopVal (str,obj) {
        let _ = $(obj.target);
       this.hideCheckAnimation( _ );
       if(this.checkPopVal){
           this.checkPopVal(str);
       }
    },
    hideCheckAnimation ( _ ) {
      _.parent().parent().parent().find('.pop-list').addClass('bounceOutUp').removeClass('bounceInDown');
      _.parent().parent().parent().find('.pop-list').prev().addClass('bounceOutUp').removeClass('bounceInDown');
      setTimeout(function(){
        _.parent().parent().parent().find('.pop-list').addClass('hidden');
        _.parent().parent().parent().find('.pop-list').prev().addClass('hidden');
        _.parent().parent().parent().find('.pop-list').prev().parent()
          .addClass('sub-btn-item').removeClass('sub-btn-item2').removeClass('sub-btn-item-active');
      },600)
    },
    hidePopAnimation ( _ ) {
      _.parent().removeClass('sub-btn-item2').removeClass('sub-btn-item-active');
      _.addClass('bounceOutUp').removeClass('bounceInDown');
      _.next().addClass('bounceOutUp').removeClass('bounceInDown');
      setTimeout(function(){
        _.addClass('hidden');
      },600)
    },
    showPopAnimation ( _ , doc) {
      doc.eq(0).removeClass('bounceOutUp').addClass('bounceInDown');
      doc.eq(1).removeClass('bounceOutUp').addClass('bounceInDown').removeClass('hidden');
      setTimeout(function(){
        _.addClass('sub-btn-item2').addClass('sub-btn-item-active');
        doc.eq(0).removeClass('hidden')
      },600)
    },
    showSY (mark,obj) {
      let _ = obj;
      if(mark != undefined){
        let m = this.ms;
        switch (m) {
          case 0: //箭头向下
            this.ms = 1;
            setTimeout(function(){
              _.addClass('sub-btn-item3').addClass('sub-btn-item-active');
            },200)
            break;
          case 1: //箭头向上
            this.ms = 2;
            setTimeout(function(){
              _.removeClass('sub-btn-item3').addClass('sub-btn-item4');
            },200)
            break;
          default: //不显示箭头
            this.ms = 0;
            setTimeout(function(){
              _.removeClass('sub-btn-item4').addClass('sub-btn-item5').removeClass('sub-btn-item-active');
            },200)
        }
      }
      return false;
    },
    showPop (e,mark) {
      let _ = $(e.target), doc = _.find('div'), change = this.changeIcon;
      if(mark != undefined){
        this.changeIcon = 1, change = 1;
      }
      switch (change) {
        case 0:
          this.changeIcon = 1;
          this.showPopAnimation( _ , doc);
          break;
        case 1:
          this.changeIcon = 0;
          this.showSY(mark, _ );
          break;
      }
    },
    closePop (e) {
      let _ = $(e.target);
      this.changeIcon = 0;
      this.hidePopAnimation( _ );
    }
  }
}
</script>
<style scoped>
  .hidden{ display: none;}
  .pop-bg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0,0,0,.2);
  }
  .pop-list:before{
    content: "";
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid #fff;
    position: absolute;
    top: -10px;
    left: 50%;
  }
  .pop-list{
    background-color: #fff;
    width: 100%;
    position: absolute;
    top: 35px;
    left: 0;
    z-index: 888;
    -webkit-border-radius: 3.5px;
    -moz-border-radius: 3.5px;
    border-radius: 3.5px;
  }
  .pop-list li{
    border-bottom: 1px solid #e8e8e8;
  }
  .pop-list li:last-child{ border-bottom: 0;}
  .sub-btn-list{
    display: -webkit-flex; /* Safari */
    display: flex;
    margin-top: 12px;
    background-color: #fff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 15px;
    color: #999;
  }
  .sub-btn-item{
    -webkit-flex-grow: 1;
    flex-grow: 1;
    position: relative;
  }
  .sub-btn-list .sub-btn-item:last-child:before{
    content: "";
    background-image:url('');
  }
  .sub-btn-item-active{ background-color: #e8e8e8;}
  .sub-btn-item5:before{
    content: "";
    background-image:url('')!important;
  }
  .sub-btn-item4:before{
    content: "";
    background-image:url('../assets/images/investment/up.png')!important;
  }
  .sub-btn-item3:before{
    content: "";
    background-image:url('../assets/images/investment/down.png')!important;
  }
  .sub-btn-item2:before{
    content: "";
    background-image:url('../assets/images/investment/dian1.png')!important;
  }
  .sub-btn-item:before{
    content: "";
    background-image:url('../assets/images/investment/dian.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: block;
    width: 3.5px;
    height: 13px;
    position: absolute;
    top: 10px;
    right: 15px;
  }
  .sub-btn-item:after{
    content: "";
    display: block;
    width: 0;
    height: 15px;
    border-right: 1px solid #cdcdcd;
    position: absolute;
    top: 8px;
    right: 0;
  }
  .sub-btn-item:last-child:after{content: ""; border-right:0;}
</style>
