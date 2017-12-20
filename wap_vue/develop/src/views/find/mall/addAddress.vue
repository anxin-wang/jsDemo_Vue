<template>
    <div class="addAddress mt10">
        <div class="close" @click.stop="closePop"><Icon size="20" type="close-round"></Icon></div>
        <div class="clear">
            <label class="fl">联系人</label>
            <input class="fl" v-model="Name" type="text" placeholder="收货人姓名">
            <div class="clear ml60">
                <div class="fl">
                    <input v-model="Gender" type="radio" name="Gender" value="1" class="hide" id="Gender3">
                    <label for="Gender3">先生</label>
                </div>
                <div class="fl">
                    <input v-model="Gender" type="radio" name="Gender" value="2" class="hide" id="Gender4">
                    <label for="Gender4">女士</label>
                </div>
            </div>
        </div>
        <div class="clear">
            <label class="fl">电话</label>
            <input class="fl" v-model="mobile" type="number" placeholder="收货人电话号码">
        </div>
        <div class="clear">
            <label class="fl">地址</label>
            <yd-cell-group>
                <yd-cell-item arrow>
                    <input class="AddressName" slot="right" type="text" @click.stop="isShow = true" v-model="addressName" readonly placeholder="所在地区">
                </yd-cell-item>
            </yd-cell-group>
            <yd-cityselect v-model="isShow" :callback="result1" :items="district"></yd-cityselect>
            <textarea v-model="address" name="address" id="address_where" cols="30" rows="10" placeholder="详细地址"></textarea>
        </div>
        <div class="clear">
            <label class="fl">设为默认地址</label>
            <div class="clear fr mt5">
                <yd-switch v-model="switch1"></yd-switch>
            </div>
        </div>
        <div class="But" @click.stop="Add">
            <router-link to="#">确定</router-link>
        </div>

    </div>
</template>
<script>
    import District from 'ydui-district/dist/jd_province_city_area_id';
    import Vue from 'vue';
    import {CitySelect} from 'vue-ydui/dist/lib.rem/cityselect';
    import {Switch} from 'vue-ydui/dist/lib.rem/switch';
    Vue.component(CitySelect.name, CitySelect);
    Vue.component(Switch.name, Switch);
    import { addAddress } from '../../../service/getData'
    export default {
        props:{
            showAdd:''
        },
        data () {
            return{
                isShow: false,
                district: District,
                Name:'',        //姓名
                Gender:'',      //性别
                mobile:'',      //手机号
                addressName: '',// 省市区 名称
                addressVal: '', // 省市区 值
                address: '',   // 详细地址
                Tag: '',        // 标签
                switch1: false, //设为默认地址
                closePopup:""
            }
        },
        watch:{
            showAdd(val){
                this.closePopup = val
            }
        },
        mounted () {
        },
        methods: {
            Add(){
                let _that = this;
                if(_that.switch1 == true){
                    var isDefault = 1
                }else{
                    var isDefault = 0
                }
                if(_that.$route.params.goodsId != undefined){
                    var goods_id = _that.$route.params.goodsId
                }else{
                    var goods_id = '0'
                }
                if(_that.$route.params.num != undefined){
                    var nums = _that.$route.params.num
                }else{
                    var nums = '0'
                }
                let id = ""
                let name = _that.Name
                let Gender = _that.Gender
                let mobile = _that.mobile
                let address = _that.address
                let addressName = _that.addressName
                let addressVal = _that.addressVal
                let zipcode = 0
                addAddress(id,name,Gender,mobile,address,addressName,addressVal,zipcode,isDefault).then(res => {
                    _that.$messagebox.alert(res.show_err).then(action => {
                        _that.Name = ""
                        _that.Gender = ""
                        _that.Gender = ""
                        _that.mobile = ""
                        _that.address = ""
                        _that.addressName = ""
                        _that.addressVal = ""
                        _that.zipcode = 0
                        if(res.response_code != 0){
                            this.$emit('closePopup', false)
                        }
                    });
                })
            },
            closePop(){
                this.$emit('closePopup', false)
            },
            result1(ret) {
                this.addressName = ret.itemName1 + ',' + ret.itemName2 + ',' + ret.itemName3;
                this.addresVal = ret.itemValue1 + ',' + ret.itemValue2 + ',' + ret.itemValue3;
            }
        }
    }
</script>
<style scoped lang="less">
    @import "../../../assets/css/common.less";
    @ColorE5:#e5e5e5;
    .addAddress{
        padding:0px 15px;
        background:white;
        position:relative;
        >div.clear{
            border-bottom:1px solid @ColorE5;
            padding:10px 0px;
            >label{
                margin-right:10px;
                line-height:40px;
            }
            >input{
                width:80%;
                height:40px;
                border-top:none;
                border-left:none;
                border-right:none;
                border-bottom:1px solid @ColorE5;
            }
            >div.clear{
                >div{
                    >label{
                        width:60px;
                        height:30px;
                        display:block;
                        line-height:30px;
                        text-align:center;
                        border:1px solid #666;
                        color:#666;
                        border-radius:8px;
                        margin-right:10px;
                        margin-top:10px;
                    }
                    >input[type='radio']:checked + label{
                        border:1px solid @maincolor;
                        color:@maincolor;
                    }
                }
            }
        }
        .close{
            width:30px;
            height:30px;
            position:absolute;
            right:15px;
            top:0px;
        }
    }
    .AddressName{
        width:80%;
        height:35px;
        border:none;
        border-bottom:1px solid @ColorE5;
    }
    #address_where{
        width:80%;
        height:35px;
        margin-top:10px;
        border:none;
        border-bottom:1px solid @ColorE5;
        line-height:35px;
    }
    .But{
        padding:50px 15px 10px 15px;
        a{
            width:100%;
            height:40px;
            line-height:40px;
            font-size:15px;
            color:white;
            text-align:center;
            background:@maincolor;
            border-radius:40px;
            display:block;
        }
    }
</style>