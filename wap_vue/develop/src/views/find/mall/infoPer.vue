<template>
    <div class="InfoPerBox">
        <ul>
            <li class="clear">
                <div class="fl">学历</div>
                <div class="fr">
                    <Icon size="25" type="ios-arrow-right"></Icon>
                </div>
                <div class="fr ml15" @click.stop="show2 = true">
                    <input readonly="readonly" v-model="gra" type="text" value="" placeholder="选择学历">
                </div>
                <yd-actionsheet :items="graLabel" v-model="show2"></yd-actionsheet>
            </li>
            <li class="clear">
                <div class="fl">出生日期</div>
                <div class="fr">
                    <Icon size="25" type="ios-arrow-right"></Icon>
                </div>
                <div class="fr mr15">
                    <yd-datetime start-date="1970-01-01"  :year-format="yearFormat" :month-format="monthFormat" :day-format="dayFormat" type="date" v-model="datetime" slot="right"></yd-datetime>
                </div>
            </li>
            <li class="clear">
                <div class="fl">婚姻状况</div>
                <div class="fr">
                    <Icon size="25" type="ios-arrow-right"></Icon>
                </div>
                <div class="fr ml15" @click.stop="show3 = true">
                    <input readonly="readonly" v-model="marriage" type="text" value="" placeholder="选择婚姻状况">
                </div>
                <yd-actionsheet :items="marriageLabel" v-model="show3"></yd-actionsheet>
            </li>
            <li class="clear">
                <div class="fl">专业</div>
                <div class="fr">
                    <Icon size="25" type="ios-arrow-right"></Icon>
                </div>
                <div class="fr ml15"><input v-model="special" type="text" value="" placeholder="选择填写您的专业"></div>
            </li>
            <li class="clear">
                <div class="fl">毕业学校</div>
                <div class="fr">
                    <Icon size="25" type="ios-arrow-right"></Icon>
                </div>
                <div class="fr ml15"><input v-model="university" type="text" value="" placeholder="选择填写您的毕业学校"></div>
            </li>
        </ul>
        <p>居住地址</p>
        <ul>
            <li class="clear">
                <div class="fl">省市区</div>
                <div class="fr">
                    <Icon size="25" type="ios-arrow-right"></Icon>
                </div>
                <div class="fr ml15"><input readonly="readonly" @click.stop="show4 = true" v-model="province_city" type="text" value="" placeholder="选择省市区"></div>
                <yd-cityselect v-model="show4" :callback="result1" :items="district"></yd-cityselect>
            </li>
            <li class="clear">
                <div class="fl">详细地址</div>
                <div class="fr">
                    <Icon size="25" type="ios-arrow-right"></Icon>
                </div>
                <div class="fr ml15"><input v-model="address"  type="text" value="" placeholder="选择填写您的详细地址"></div>
            </li>
        </ul>
        <div class="pl15 pr15">
            <yd-button size="large" color="white" bgcolor="#F4AC31" @click.native="handleClick" type="primary" shape="circle">提交</yd-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
import {ActionSheet} from 'vue-ydui/dist/lib.rem/actionsheet';
import {DateTime} from 'vue-ydui/dist/lib.rem/datetime';
import {CitySelect} from 'vue-ydui/dist/lib.rem/cityselect';
 import { Indicator } from 'mint-ui'
Vue.component(CitySelect.name, CitySelect);
Vue.component(DateTime.name, DateTime);
Vue.component(ActionSheet.name, ActionSheet);
import {Button, ButtonGroup} from 'vue-ydui/dist/lib.rem/button';
/* 使用px：import {Button, ButtonGroup} from 'vue-ydui/dist/lib.px/button'; */
Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);
Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
};
import District from 'ydui-district/dist/jd_province_city_area_id';
export default {
    data() {
        return {
            show2: false,
            show3: false,
            show4: false,
            gra:'',                 //学历
            graLabel: [
                {
                    label: '初中',
                    callback: (label) => {
                        this.gra = label.label
                    },
                },
                {
                    label: '高中',
                    callback: (label) => {
                        this.gra = label.label
                    }
                },
                {
                    label: '大专',
                    callback: (label) => {
                        this.gra = label.label
                    }
                },
                {
                    label: '本科',
                    callback: (label) => {
                        this.gra = label.label
                    }
                },
                {
                    label: '硕士',
                    callback: (label) => {
                        this.gra = label.label
                    }
                },
                {
                    label: '博士',
                    callback: (label) => {
                        this.gra = label.label
                    }
                },
            ],        //选择学历
            datetime:'',            //年月日
            yearFormat: '{value}',  //年
            monthFormat: '{value}', //月
            dayFormat: '{value}',  //日
            marriage:'',                 //婚姻
            marriageLabel: [
                {
                    label: '已婚',
                    callback: (label) => {
                        this.marriage = label.label
                    },
                },
                {
                    label: '未婚',
                    callback: (label) => {
                        this.marriage = label.label
                    }
                },
            ],        //选择婚姻
            special:'',                 //专业
            university:'',              //学校
            address:'',              //学校
            show1: false,
            province_city: '新疆 乌鲁木齐市 天山区',       //省市区 name
            pro_city: '',       //省市区 val
            district: District,
        }
    },
    mounted(){
        this.info()
    },
    methods: {
        info(){
            let _self = this;
            let Base64 = require('js-base64').Base64
            let url = '/mapi2/index.php'
            Indicator.open({ spinnerType: 'fading-circle' })
            _self.$http.get(url, {
                params: {
                    act: 'uc_center_score',
                    id: _self.$route.params.userId,
                    /*email:_self.userName(),
                    pwd:_self.userPwd()*/
                }
            }).then(function (response) {
                let res = JSON.parse(Base64.decode(response.data));
                Indicator.close()
                let resp = res.user
                _self.university = resp.university //学校
                _self.gra = resp.graduation       //学历
                _self.marriage = resp.marriage    //婚姻
                _self.special = resp.u_special    //专业
                _self.address = resp.address    //详细地址
                _self.province_city = resp.province_city_county_name    //省市区
                _self.pro_city = resp.province_id+','+resp.city_id+','+resp.county_id    //省市区
                _self.datetime = resp.byear+'-'+resp.bmonth+'-'+resp.bday    //省市区
                console.log(resp)
            });
        },
        handleClick(){
            let _that = this;
            let Base64 = require('js-base64').Base64
            let url = '/mapi2/index.php'
            _that.$http.get(url, {
                params: {
                    act: 'uc_account_score',
                    graduation: _that.gra,/*学历*/
                    birth: _that.datetime,/*出生年月日*/
                    marriage: _that.marriage,/*婚姻状况*/
                    u_special: _that.special,/*专业*/
                    university: _that.address,/*毕业院校*/
                    province_city_county_name: _that.province_city,/*省市区 name*/
                    pro_city: _that.pro_city,/*省市区 val*/
                    address: _that.address,/*详细地址*/
                    email:_that.userName(),
                    pwd:_that.userPwd()
                }
            }).then(function (response) {
                let res = JSON.parse(Base64.decode(response.data));
                console.log(res)
                if(res.response_code == 1){
                    _that.$dialog.alert({
                        title:'提示！',
                        mes: res.show_err,
                        callback:() => {
                            window.history.back();
                        }
                    });
                }else{
                    _that.$dialog.alert({ mes: res.show_err});
                }
            });
        },
        result1(ret) {
            this.province_city = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
            this.pro_city = ret.itemValue1 + ' ' + ret.itemValue2 + ' ' + ret.itemValue3;
        },
        userName(){return window.storeWithExpiration.get('MallUserName')},
        userPwd(){return window.storeWithExpiration.get('MallUserPwd')}
    }
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/common.less";
.InfoPerBox{
    width:100%;
    min-height:100%;
    padding:55px 0px 0px 0px;
    background:#F5F5F5;
    position:fixed;
    left:0px;
    top:0px;
    p{
        line-height:40px;
        padding:0px 15px;
    }
    ul{

        li{
            border-bottom:1px solid #e5e5e5;
            background:white;
            padding:7px 15px;
            line-height:30px;
            input{
                height:30px;
                border:none;
                font-size:15px;
                text-align: right;
                margin-right:10px;
            }
            &:last-child{
                border-bottom:none;
            }
        }
    }
}
</style>