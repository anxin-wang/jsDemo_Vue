<template>
  <div class="integral mt10 pl15 pr15">
    <yd-flexbox>
      <yd-flexbox-item v-for="item,key in lsit" :key="key">
        <router-link :to="item.url">
          <i><img :src="item.img" alt=""></i>
          <p>{{item.name}}<span v-if="item.text != '' ">{{item.text}}</span></p>
        </router-link>
      </yd-flexbox-item>
    </yd-flexbox>
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
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
.integral{
  background:white;
  text-align: center;
  position:relative;
}
.integral a{
  display:block;
  padding:8px 0;
}
.integral a p{
  margin-top:5px;
  font-size:14px;
}
.integral a p span{
  color:#fba22c;
  font-size:15px;
}
.integral a img{
  width:50%;
}
</style>
