<template>
  <div class="mallPreferred mt10 clear">
    <div class="fl mallPreferredNav">
      <ul>
        <li @click.stop="checkTab(1)" v-bind:class="{active:1==qwerqwre}">全部</li>
      </ul>
      <ul>
        <li @click.stop="checkTab(index+2,item.id)" v-for="(item,index) in typeList.items" v-bind:class="{active:index+2==qwerqwre}">{{item.name}}</li>
      </ul>
    </div>
    <div class="fl mallPreferredContent">
      <div class="MallListScreen">
        <ul class="clear">
          <li @click.stop="sort('score')" v-bind:class="screen1">积分</li>
          <li @click.stop="sort('price')" v-bind:class="screen2">价格</li>
          <li @click.stop="sort('time')" v-bind:class="screen3">时间</li>
        </ul>
      </div>
      <div class="MallListContent">
        <div class="MallListWhole">
          <yd-infinitescroll  :callback="loadList" ref="infinitescrollDemo">
            <yd-list theme="1" slot="list">
              <div v-for="item, key in list" >
                <router-link :to="'/infoGoods/'+item.id" class="clear">
                  <img class="userCanBuyNumber" v-if="item.user_can_buy_number <= 0" src="../../../assets/images/mall/ysq.png" alt="">
                  <div class="fl MallListImg">
                    <img :src="item.img | bannerimgurl" alt="">
                  </div>
                  <div class="fl MallListText ml10">
                    <h1>{{item.name}}</h1>
                    <p>{{item.score}}<span>积分</span></p>
                    <span>¥{{item.market_price}}</span>
                    <div class="clear">
                      <div class="fl">{{item.buy_number}}人兑换</div>
                      <router-link class="fr" :to="'/infoGoods/'+item.id">兑换</router-link>
                    </div>
                  </div>
                </router-link>
              </div>
            </yd-list>
            <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading12.svg"/>
          </yd-infinitescroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Indicator } from 'mint-ui'
import { notImgShow } from '../../../service/toastInfo'
import { commodityList } from '../../../service/getData'
import { goodsCate } from '../../../service/getData'
export default {
    props:{
        lsit:Array
    },
    data () {
        return {
            /*选择导航时添加class*/
            defaultImg:require('../../../assets/images/wxbanner_bg.jpg'),
            qwerqwre:'1',
            screen1:'',
            screen2:'',
            screen3:'',
            typeId:'',        //分类ID
            mark:false,
            recommendList:[], //推荐商品
            page: 1,
            total: '',
            typeList:[],
            list:[],
        }
    },
    mounted () {
        this.commodityInfo(null,null, 1, null, null, null)
        this.typeInfo()
    },
    methods:{
        /*排序*/
        sort(mark){
            const asa = false
            let TypeId = this.typeId
            let mark_s = this.mark
            if(mark_s){
                if(mark == 'score'){
                    this.commodityInfo(TypeId,null, 1, 'asc', null, null)
                    this.screen1 = 'active_b'
                    this.screen2 = ''
                    this.screen3 = ''
                }else if(mark == 'price'){
                    this.commodityInfo(TypeId,null, 1,  null,'asc', null)
                    this.screen2 = 'active_b'
                    this.screen1 = ''
                    this.screen3 = ''
                }else if(mark == 'time'){
                    this.commodityInfo(TypeId,null, 1, null, null, 'asc')
                    this.screen3 = 'active_b'
                    this.screen2 = ''
                    this.screen1 = ''
                }
                this.mark = false
            }else{
                if(mark == 'score'){
                    this.commodityInfo(TypeId,null, 1, 'desc', null, null)
                    this.screen1 = 'active_a'
                    this.screen2 = ''
                    this.screen3 = ''
                }else if(mark == 'price'){
                    this.commodityInfo(TypeId,null, 1, null,'desc', null)
                    this.screen2 = 'active_a'
                    this.screen1 = ''
                    this.screen3 = ''
                }else if(mark == 'time'){
                    this.commodityInfo(TypeId,null, 1, null, null, 'desc')
                    this.screen3 = 'active_a'
                    this.screen2 = ''
                    this.screen1 = ''
                }
                this.mark = true
            }
        },
        /*滚动加载*/
        loadList() {
            let _self = this;
            _self.page++;
            this.commodityInfo (null,null,_self.page,null,null,null)
        },
        callBackInfo(obj){
            this.list = [...this.list, ...obj]
            if (obj.length < this.total || this.page == 3) {
                /* 所有数据加载完毕 */
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                return;
            }
            /* 单次请求数据完毕 */
            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
        },
        /*获取商品列表 接口*/
        commodityInfo (cateId,mark,pageCode,scoreCode,priceCode,timeCode) {
            let _self = this;
            commodityList(cateId,mark,pageCode,scoreCode,priceCode,timeCode).then(res => {
                _self.total = res.total
                if(pageCode <= 1){
                    _self.list = res.items
                }else{
                    _self.callBackInfo(res.items)
                }
            })
        },
        /*获取商品分类列表*/
        typeInfo () {
            let _self = this
            goodsCate().then(res => {
                _self.typeList = res;
            })
        },
        /*选择分类*/
        checkTab(num, id){
            this.qwerqwre = num
            this.typeId = id
            this.commodityInfo(id,null, 1, null, null, null)
        }
    },
    filters:{
        bannerimgurl (url){
            return notImgShow(url)
        }
    }
}
</script>
<style lang="less" scoped>
  .mallPreferred{
    width:100%;
    height:450px;
    background:white;
    position:relative;
  }
  /*导航*/
  .mallPreferredNav{
    width:20%;
    height:100%;
    text-align: center;
    border-right:1px solid #e5e5e5;
  }
  .mallPreferredNav > ul > li{
    line-height:40px;
    font-size:14px;
  }
  .mallPreferredNav > ul > li.active{
    color:#f49d45;
    border-left:3px solid #f49d45;
  }
  /*内容*/
  .mallPreferredContent{
    width:80%;
    padding-top:60px;
    position:relative;
  }
  .MallListContent{
    width:100%;
    height:380px;
    overflow-x: auto;
    >ul{
      >li{
        border-bottom:1px solid #e5e5e5;
        padding:6px 10px;
      }
    }
  }


  /*筛选*/
  .MallListScreen{
    width:80%;
    background:#f5f5f5;
    position:absolute;
    right:10px;
    top:10px;
    z-index: 1;
    padding:0px 10px;
  }
  .MallListScreen ul li{
    float:left;
    width:33.33333%;
    text-align: center;
    line-height:38px;
    position:relative;
    cursor: pointer;
  }
  .MallListScreen ul li:after,
  .MallListScreen ul li:before{
    width: 0;
    height: 0;
    position:absolute;
    right:5px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
  .MallListScreen ul li:before{
    content:'';
    top:13px;
    border-bottom: 5px solid #a8a7a7;
  }
  .MallListScreen ul li:after{
    content:'';
    top:20px;
    border-top: 5px solid #a8a7a7;
  }
  .MallListScreen ul li.active_b:before{
    border-bottom: 5px solid #f49d45;
  }
  .MallListScreen ul li.active_a:after{
    border-top: 5px solid #f49d45;
  }

  .MallListWhole a.clear{
    display:block;
    border-bottom:1px solid #e5e5e5;
    padding:10px 8px;
  }
  /* 商品图片 样式*/
  .MallListWhole a.clear{
    position:relative;
  }
  .MallListWhole a.clear .MallListImg{
    width:35%;
    height:110px;
    background:#f5f5f5;
    position:relative;
    overflow: hidden;
  }
  .userCanBuyNumber{
    width:120px;
    height:120px;
    position:absolute;
    left:25%;
    top:50%;
    z-index: 9;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
  .MallListWhole a.clear .MallListImg > img{
    width:100%;
    position:absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
  /*商品信息介绍*/
  .MallListText{
    width:55%;
    height:110px;
    position:relative;
  }
  .MallListText h1{
    font-size:17px;
    margin-top:8px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .MallListText > p{
    color:#ec2a2b;
    font-size:15px;
  }
  .MallListText > p > span{
    color:#ccc;
    font-size:13px;
    margin-left:6px;
  }
  .MallListText > span{
    text-decoration:line-through;
    color:#ccc;
  }
  .MallListText > div.clear{
    width:100%;
    position:absolute;
    left:0px;
    bottom:0px;
  }
  .MallListText > div.clear > div{
    margin-top:15px;
  }
  .MallListText > div.clear > a{
    width:70px;
    border:1px solid #f49d45;
    text-align: center;
    line-height:30px;
    color:#f49d45;
    border-radius:5px;
  }
</style>
