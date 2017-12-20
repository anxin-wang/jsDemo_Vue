<template>
  <div class="mallPreferred mt10 pl15 pr15 pt15">
    <div class="mallPreferredTitle clear">
      <span class="fl">坚果好物</span>
      <!--<router-link class="fr" to="#">更多优选好物&nbsp;&gt;</router-link>-->
    </div>
    <div class="mallPreferredList mt10">
      <div class="ul" :style="styleObj">
        <yd-flexbox>
          <yd-flexbox-item v-for="item,key in recommendList" :key="key">
            <router-link class="m_j" :data-type="item.cate_name" :to="'/infoGoods/'+item.id">
              <img class="userCanBuyNumber" v-if="item.user_can_buy_number <= 0" src="../../../assets/images/mall/ysq.png" alt="">
              <i><img :src="item.img | bannerimgurl" alt=""></i>
              <h3>{{item.name}}</h3>
              <p>{{item.score}}<span>积分</span></p>
            </router-link>
          </yd-flexbox-item>
        </yd-flexbox>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Indicator } from 'mint-ui'
import { notImgShow } from '../../../service/toastInfo'
import { preferred } from '../../../service/getData'
export default {
  props:{
      lsit:Array
  },
  data () {
      return {
          defaultImg:'',
          recommendList:[], //推荐商品
          styleObj:[]
      }
  },
  mounted () {
      this.commodityInfo()
  },
  methods:{
      commodityInfo () {
          let _self = this;
          preferred(1).then(res => {
              _self.recommendList = res.items.slice(0, 5);
              let lh = _self.recommendList.length
              if(lh <= 2){
                  _self.styleObj = {width:'100%'}
              }else if(lh == 3){
                  _self.styleObj = {width:'140%'}
              }else if(lh == 4){
                  _self.styleObj = {width:'180%'}
              }else if(lh == 5){
                  _self.styleObj = {width:'230%'}
              }
          })
      }
  },
  filters:{
      bannerimgurl (url){
          return notImgShow(url)
      },
      bannerUrl (url) {
          let winUrl = window.location.href;
          if(url != url){
              return url
          }else{
              return winUrl
          }
      }
  }
}
</script>

<style scoped>
.mallPreferred{
  background:white;
}
.mallPreferredTitle{
  width:100%;
  font-size:15px;
}
.mallPreferredTitle span{
  display:inline-block;
  font-weight:600;
  font-family: "苹方", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.mallPreferredTitle a{
  display:inline-block;
  font-size:12px;
}

.mallPreferredList{
  overflow-x: scroll;
  position:relative;
  padding-bottom: 20px;
}
.mallPreferredList:before{
  content:'';
  height:15px;
  background:white;
  position:absolute;
  left:0px;
  bottom:0px;
  z-index: 999;
}
.mallPreferredList .ul{
  width:230%;
}
.mallPreferredList .ul > div > div{
  margin-right:10px;
}
.mallPreferredList .ul > div > div > a{
  width:100%;
  height:100%;
  display:inline-block;
  background:white;
  padding:25px 0px 10px 0px;
  position:relative;
  box-shadow: 0px 2px 13px rgba(120,157,215,0.2);
}
.userCanBuyNumber{
  width:120px;
  height:120px;
  position:absolute;
  left:50%;
  top:50%;
  z-index: 9;
  -webkit-transform: translate(-50%,-50%);
  -moz-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
}
.mallPreferredList .ul > div > div > a.m_j:before,
.mallPreferredList .ul > div > div > a.m_k:before{
  content:attr(data-type);
  width:60px;
  height:25px;
  line-height:25px;
  color:white;
  display:inline-block;
  text-align: center;
  position:absolute;
  left:0px;
  top:0px;
  z-index: 9;
}
.mallPreferredList .ul > div > div > a.m_j:before{
  background: url("../../../assets/images/mall/index/text_bg_yellow.jpg");
}
.mallPreferredList .ul > div > div > a.m_k:before{
  background: url("../../../assets/images/mall/index/text_bg_red.jpg");
}

.mallPreferredList .ul > div > div > a > h3{
  font-weight:normal;
  font-size:15px;
  margin:0px 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  -moz-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
}
.mallPreferredList .ul > div > div > a > p{
  color:red;
  font-size:13px;
  padding:0px 10px;
}
.mallPreferredList .ul > div > div > a > p > span{
  color:#ccc;
  margin-left:4px;
}
.mallPreferredList .ul > div > div > a > i{
  display:block;
  width:100%;
  height:80px;
  overflow: hidden;
  position:relative;
}
.mallPreferredList .ul > div > div > a > i >img{
  width:100%;
  position:absolute;
  left:50%;
  top:50%;
  z-index: 1;
  -webkit-transform: translate(-50%,-50%);
  -moz-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
}

@media screen and (max-width: 320px) {
  /*.mallPreferredList .ul > div > div > a > i{
    height:53px;
  }
  .mallPreferredList{
    height:180px;
  }*/
}
@media screen and (min-width: 375px) and (max-width: 413px){

}
@media screen and (min-width: 414px){

}
</style>
