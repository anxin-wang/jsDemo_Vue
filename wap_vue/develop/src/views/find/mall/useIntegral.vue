<template>
    <div class="ActivityLidt">
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <yd-list theme="1"  slot="list">
                <div v-for="item, key in list" :key="key">
                    <router-link to="#" class="clear">
                        <div class="fl ListInfo">
                            <div class="clear Integral">
                                <div class="fl">积分</div>
                                <div class="fl f14" v-if="tabVal == 0">+{{item.score}}</div>
                                <div class="fl f14" v-if="tabVal == 1">{{item.score}}</div>
                            </div>
                            <div class="mt5 clear ListTime">
                                <p class="fl">{{item.type_name}}</p>
                                <p class="fr">{{item.create_time}}</p>
                                <p v-if="tabVal == 1" class="fr f14">{{item.create_time_ymd}}</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </yd-list>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">没有数据啦~~</span>
            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading12.svg"/>
        </yd-infinitescroll>
    </div>
</template>
<script>
import Vue from 'vue';
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
import {InfiniteScroll} from 'vue-ydui/dist/lib.rem/infinitescroll';
 import { Indicator } from 'mint-ui'
/* 使用px：import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell'; */
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
Vue.component(InfiniteScroll.name, InfiniteScroll);
Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
};
import { scoreLogs } from '../../../service/getData'
export default {
    props:["recordInfo"],
    data () {
        return{
            list:[],
            page:1,
            pages:"",
            total:'',
            tabVal:0
        }
    },
    watch:{
        recordInfo(val){
            this.list = []
            this.page = 1
            this.tabVal = val
            this.info(1,val)
            /*滚动加载     重新初始化*/
            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
        },
    },
    mounted () {

    },
    methods: {
        loadList() {
            let _this = this
            _this.page++
            _this.info(_this.page,_this.tabVal)
        },
        callBackInfo(obj){
            let _this = this
            console.log("callBack")
            _this.list = [..._this.list, ...obj]
            if (_this.pages > _this.total) {
                /* 所有数据加载完毕 */
                _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                return;
            }
            /* 单次请求数据完毕 */
            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
        },
        info(num,status){
            let _this = this;
            scoreLogs(num,status).then(res => {
                _this.total = res.total_page
                _this.pages = res.page
                let obj = res.list
                _this.callBackInfo(obj)
            })
        }
    }
}
</script>
<style scoped lang="less">
    @import "../../../assets/css/common.less";
    .ActivityLidt{
        padding:0px 15px;
        a{
            padding:7px 0px;
            border-bottom:1px solid #e5e5e5;
            display:block;
            .ListInfo{
                width:100%;
                h1{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                }
            }
        }
    }
</style>