<template>
    <div class="AddressList">
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <yd-list theme="1"  slot="list">
                <div class="List clear" v-for="item, key in list" :key="key">
                    <router-link :to="'/orderSubmit/'+goodsId+'/'+nums+'/'+item.id" class="fl">
                        <i v-if="item.is_default ==1" class="isDefault">默认地址</i>
                        <div v-if="item.is_default ==1" style="height:5px;"></div>
                        <div class="clear">
                            <div class="fl" style="width:80%;margin-top: 5px;">
                                <h3>{{item.provinces_cities}}{{item.address}}</h3>
                                <p class="mt10">{{item.name}}
                                    <template v-if="item.sex == 1">(先生)</template>
                                    <template v-if="item.sex == 2">(女士)</template>
                                    <span class="ml15">{{item.phone}}</span></p>
                            </div>
                        </div>
                    </router-link>
                    <div class="fr EditAddress" @click.stop="editaddres(item.id)">
                        <router-link to="#">
                            <img src="../../../assets/images/mall/index/edit.png" alt="">
                        </router-link>
                    </div>
                </div>
            </yd-list>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading12.svg"/>
        </yd-infinitescroll>
        <div class="AddressAdd" @click.stop="addAddressStop()">
            <router-link to="#">
                <Icon type="plus-round" size="30"></Icon>
            </router-link>
            <p>新增收货地址</p>
        </div>
        <!--编辑地址-->
        <div class="addressPopup" :style="'top:'+popupHei+'px'" v-show="editShow">
            <edit-Address :editVal="editinfo" v-on:editclosePopup="editclosePopup"></edit-Address>
        </div>
        <!--添加地址-->
        <div class="addressPopup" :style="'top:'+popupHei+'px'" v-show="addShow">
            <add-Address :showAdd="isAddShow" v-on:closePopup="closePopup"></add-Address>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
import {InfiniteScroll} from 'vue-ydui/dist/lib.rem/infinitescroll';
Vue.component(InfiniteScroll.name, InfiniteScroll);
Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
};
import { addressList } from '../../../service/getData'
export default {
    components:{
        editAddress:require('./editAddress.vue'),
        addAddress:require('./addAddress.vue'),
    },
    data () {
        return{
            list:[],
            goodsId:"",
            nums: "",
            page: 1,
            total:'',
            editinfo:'',
            editShow:false,
            addShow:false,
            isAddShow:"",
            popupHei:''
        }
    },
    mounted () {
        this.info(1);
        if(this.$route.params.goodsId != undefined){
            this.goodsId = this.$route.params.goodsId
        }else{
            this.goodsId = ' '
        }
        if(this.$route.params.num != undefined){
            this.nums = this.$route.params.num
        }else{
            this.nums = ' '
        }
        /*修改返回连接*/
        this.$route.meta.RtuenUrl = '/orderSubmit/'+this.goodsId+'/'+this.nums
        let ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            this.popupHei = 55
        } else {
            this.popupHei = 0
        }
    },
    methods: {
        loadList() {
            this.page++
            this.info(this.page)
        },
        callBackInfo(obj){
            this.list = [...this.list, ...obj]
            if (obj.length < this.total) {
                /* 所有数据加载完毕 */
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                return;
            }
            /* 单次请求数据完毕 */
            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
        },
        info(page) {
            let _that = this;
            addressList(page,_that.goodsId,_that.nums).then(res => {
                console.log(res)
                _that.total = res.page.page_total
                _that.callBackInfo(res.items)
            })
        },
        addAddressStop(){
            this.addShow = true
            this.isAddShow = this.addShow
        },
        closePopup(val){
            this.list = []
            this.info(1)
            this.addShow = val
        },
        editaddres(val){
            this.editShow = true
            this.editinfo = val
        },
        editclosePopup(val){
            this.list = []
            this.info(1)
            this.editShow = val
        }
    }
}
</script>
<style scoped lang="less">
@import "../../../assets/css/common.less";
.AddressList{
    width:100%;
    height:100%;
    background:#f5f5f5;
    padding-bottom:60px;
    .List{
        padding:10px 15px;
        background:white;
        margin-top:10px;
        position:relative;
        i.isDefault{
            width:60px;
            height:20px;
            line-height:20px;
            background:url("../../../assets/images/mall/index/text_bg_red.jpg");
            display:block;
            position:absolute;
            left:0px;
            top:0px;
            text-align:center;
            color:white;
            font-size:12px!important;
        }
        >a{
            display:block;
            width:80%;
            p{color:#999;}
        }
        >div.EditAddress{
            width:18%;
            height:auto;
            a{
                width:100%;
                height:auto;
                position:relative;
                display: block;
                img{
                    width:35%;
                    position:absolute;
                    right:10px;
                    top:10px;
                }

            }
        }
    }
}
.AddressAdd{
    width:100%;
    height:50px;
    background:white;
    position:fixed;
    left:0px;
    bottom:0px;
    a{
        display:block;
        width:40px;
        height:40px;
        background:@maincolor;
        color:white;
        line-height:55px;
        border-radius:50%;
        text-align:center;
        position:absolute;
        left:50%;
        top:0%;
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }
    p{
        line-height:75px;
        color:@maincolor;
        font-size:15px;
        text-align:center;

    }
}
.addressPopup{
    width:100%;
    height:100%;
    position:fixed;
    left:0px;
    background:white;
}
</style>
