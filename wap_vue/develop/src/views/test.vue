<template>
  <div class="ActivityLidt">
    <yd-pullrefresh :callback="loadListPull" ref="pullrefreshDemo">
      <yd-infinitescroll :callback="loadListScroll" ref="infinitescrollDemo">
        <yd-list theme="1" slot="list">
          <div v-for="item, key in list" :key="key" v-if="list.length != 0">
            <router-link to="#" class="clear">
              <div class="fl ListImg">
                <img :src="item.img | ImgUrl" alt="">
              </div>
              <div class="fl ListInfo">
                <h1 class="mt5">{{item.goods_name}}</h1>
                <div class="clear Integral">
                  <div class="fl">积分</div>
                  <div class="fl f14">{{item.total_score}}</div>
                </div>
                <p class="mt15 f14">{{item.ex_time}}</p>
              </div>
              <div class="fr ListNum">x{{item.number}}</div>
            </router-link>
          </div>
          <div  v-if="list.length == 0" class="NotList">暂无信息</div>
        </yd-list>
        <!-- 数据全部加载完毕显示 -->
        <span slot="doneTip">没有数据啦~~</span>
        <!-- 加载中提示，不指定，将显示默认加载中图标 -->
        <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading12.svg"/>
      </yd-infinitescroll>
    </yd-pullrefresh>
  </div>
</template>

<script>
import Vue from 'vue';
import { Indicator } from 'mint-ui'
import {PullRefresh} from 'vue-ydui/dist/lib.rem/pullrefresh';
Vue.component(PullRefresh.name, PullRefresh);
import { toastInfo } from '../service/toastInfo'
import { notImgShow } from '../service/toastInfo'
import { integraList } from '../service/getData'
export default {
  data () {
    return {
        page: 2,
        page2: 4,
        list: []
    }
  },
  mounted(){
      this.info(this.page)
  },
  methods:{
      /*下拉刷新*/
      loadListPull(){
          let _this = this
          _this.page = 1
          _this.list = []
          _this.info(1)
          /*刷新完毕*/
          toastInfo('刷新完毕')
          _this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');

      },
      /*上拉加载*/
      loadListScroll() {
          let _this = this
          _this.page++
          _this.info(_this.page)
      },
      /*上拉加载追加数据*/
      callBackInfo(obj){
          let _this = this
          _this.list = [..._this.list, ...obj]
          if (_this.pages > _this.total) {
              /*滚动加载 所有数据加载完毕 */
              toastInfo('加载完毕')
              _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
              return
          }
          /*滚动加载 单次请求数据完毕 */
          toastInfo('已加载'+obj.length+'数据')
          _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
      },
      /*数据请求接口*/
      info(num){
          let _this = this;
          integraList(num).then(res => {
              console.log(res)
              _this.total = res.page.page_total
              _this.pages = res.page.page
              _this.callBackInfo(res.items)
          })
      },
      userName(){ return '15221355211'},
      userPwd(){return '123456'},
  },
  filters:{
      ImgUrl (url){
         return notImgShow(url)
      }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/css/common.less";
  .ActivityLidt{
    padding:0px 15px 0px 15px;
    a{
      display:block;
      padding:7px 0px;
      border-bottom:1px solid #e5e5e5;
      .ListImg{
        width:85px;
        height:85px;
        background:#e5e5e5;
        margin-right:10px;
        position:relative;
        overflow: hidden;
        img{
          width:85%;
          position:absolute;
          left:50%;
          top:50%;
          -webkit-transform: translate(-50%,-50%);
          -moz-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
        }

      }
      .ListInfo{
        width:60%;
        h1{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      }
      .ListNum{
        margin-top:64px;
      }
    }
  }
  .NotList{
    text-align: center;
    line-height:300px;
    font-size:20px;
    color:#999;
  }
</style>
