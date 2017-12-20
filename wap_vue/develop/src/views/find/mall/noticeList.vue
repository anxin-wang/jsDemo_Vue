<template>
    <div class="notice">
        <ul>
            <li v-for="item in list">
                <router-link :to="'/noticeInfo/'+item.content">{{item.title}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
import { Indicator } from 'mint-ui'
export default {
    data() {
        return {
            list: []
        }
    },
    mounted(){
        this.info(1)
    },
    methods: {
        info(num){
            let _self = this;
            let Base64 = require('js-base64').Base64
            let url = '/mapi2/index.php'
            Indicator.open({ spinnerType: 'fading-circle' })
            _self.$http.get(url, {
                params: {
                    act: 'notify_list',
                    act_2: 'announcement',
                    page: num,
                    email:_self.userName(),
                    pwd:_self.userPwd()
                }
            }).then(function (response) {
                let res = JSON.parse(Base64.decode(response.data));
                Indicator.close()
                _self.list = res.list
                console.log(res)
            });
        },
        userName(){return window.storeWithExpiration.get('MallUserName')},
        userPwd(){return window.storeWithExpiration.get('MallUserPwd')}
    }
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/common.less";
.notice{
    ul{
        li{
            background:white;
            margin:5px 0px;
            a{
                padding:10px 15px;
                display:block;
                width:100%;
            }
        }
    }
}
</style>