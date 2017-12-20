<template>
  <div name="addressBar">
      <div class="address-container">
        <p class="address-container-title">选择收货地址</p>
        <dl>
          <dt><label>*</label>所在地区</dt>
          <dd>
            <Cascader class="select-w168" @on-change="addressFtn" change-on-select :data="Provincial" ></Cascader>
          </dd>
        </dl>
        <dl>
          <dt><label>*</label>详细地址</dt>
          <dd><Input v-model="address.user_address" type="textarea" class="textarea-w480" placeholder="请输入..."></Input></dd>
        </dl>
        <dl>
          <dt><label>*</label>收货人姓名</dt>
          <dd><Input v-model="address.user_name" class="input-w480" placeholder="请输入..."></Input></dd>
        </dl>
        <dl>
          <dt><label>*</label>手机号码</dt>
          <dd><Input v-model="address.user_phone" @change.native="checkPhone" class="input-w480" placeholder="请输入..."></Input></dd>
        </dl>
        <dl>
          <dt><label>*</label>性别</dt>
          <dd>
            <span class="sex-label">

              <input class="sex-radio" type="radio" name="sex" value="1" v-model="address.user_sex">
              <span>先生</span>
            </span>
            <span class="sex-label">
              <input class="sex-radio" type="radio" name="sex" value="2" v-model="address.user_sex">
              <span>女士</span>
            </span>
          </dd>
        </dl>
        <span @click="subMethods" class="sub-btn">保存收货人信息</span>
      </div>
  </div>
</template>
<script>
  import myUtil from '../util/prots'
  import district from '../util/district'

  export default {
    name: 'addressBar',
    props: ['list','container'],
    data () {
      return {
        address: {
          user_provinces_cities:"",    /*省市区*/
          user_provinces_cities_id:"",    /*省市区*/
          user_address:'', /*地址*/
          user_name:'',          /*收件人*/
          user_phone:'',         /*手机号码*/
          user_sex: '', /*性别*/
        },
        Provincial:[]     /*省市区 数据*/
      }
    },
    mounted:function (){
      this.$nextTick(function () {
        this.getDistrict();//获取省市区县
        this.settInfo();
        console.log(this.list,'打印了什么')
      })
    },
    methods: {
      settInfo () {
         let _self = this;
         if(_self.list != null && _self.list != ''){
            _self.address.user_name = _self.list.name;
            _self.address.user_phone = _self.list.phone;
            _self.address.user_sex = _self.list.sex;
            _self.address.user_address = _self.list.address;
            _self.address.user_provinces_cities = _self.list.provinces_cities;
            _self.address.user_provinces_cities_id = _self.list.user_provinces_cities_id;
         }

      },
      checkPhone () {
        let regex = "^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$";
        let reg = new RegExp(regex);
        if(reg.test(reg)){
          return false;
        }else{
          this.$Notice.open({ title: '温馨提示', desc: '手机号有误！' });
          return false;
        }
      },
      subMethods () {
        let _self = this;
        _self.$emit('back','false');
        //_self.container = false;
        /*if(_self.address.user_provinces_cities_id == null || _self.address.user_provinces_cities_id == ""){//所在地区
          this.$Notice.open({ title: '温馨提示', desc: '所在地区有误！' });
          return false;
        }else if(_self.address.user_address == null || _self.address.user_address == ""){ //详细地址
          this.$Notice.open({ title: '温馨提示', desc: '详细地址有误！' });
          return false;
        }else if(_self.address.user_name == null || _self.address.user_name == ""){//收件人
          this.$Notice.open({ title: '温馨提示', desc: '收货人姓名有误！' });
          return false;
        }else if(_self.address.user_phone == null || _self.address.user_phone == ""){//收件人电话
          this.$Notice.open({ title: '温馨提示', desc: '手机号码有误！' });
          return false;
        }else if(_self.address.user_sex == null || _self.address.user_sex == ""){//性别
          this.$Notice.open({ title: '温馨提示', desc: '性别有误！' });
          return false;
        }*/

        console.log("省:" +  _self.address.user_provinces_cities + '-code:' + _self.address.user_provinces_cities_id + '-----------性别:' + _self.address.user_sex)
      },
      addressFtn (value, selectedData){
        let _self = this;
        _self.address.user_provinces_cities = selectedData.map(function(o){
          return o.label
        }).join(',');
        _self.address.user_provinces_cities_id = selectedData.map(function(o){
          return o.value
        }).join(',');
      },
      getDistrict (){ //获取省市区县
        this.Provincial = district.baseDistrict()
        console.log(district.baseDistrict(),'显示了------------')
      }
    }
  }
</script>
<style>
  .ivu-cascader-menu .ivu-cascader-menu-item-active{
    background-color: #fff;
    color: #666666;
  }
</style>
<style scoped>
.sex-label input:checked + span{
  display: inline-block;
  width: 100%;
  height: 100%;
  color: #fff;
  background-color: #FFC156;
}
.sex-radio{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.sex-label{
  display: inline-block;
  vertical-align: middle;
  width: 90px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #cccccc;
  color: #a5a5a5;
  cursor: pointer;
  position: relative;
}
.address-container-title{
  font-weight: 600;
  font-size: 18px;
  color: #333333;
  margin-top: 33px;
  margin-left: 45px;
  margin-bottom: 35px;
}
.sub-btn{
  display: block;
  width: 168px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  color: #FFFFFF;
  background: #FFC156;
  border-radius: 2px;
  margin-left: 180px;
  margin-top: 30px;
}
.textarea-w480 textarea.ivu-input{
  height: 72px;
}
.textarea-w480{
  width: 480px;
}
.input-w480{
  width: 480px;
  height: 36px;
}
.select-w168{
  width: 168px;
  height: 36px;
}
.address-container dl{ margin-bottom: 20px;margin-left: 24px;}
.address-container dt label{ color: #F74E3B;}
.address-container dt{
  width: 150px;
  text-align: right;
  padding-right: 30px;
  font-size: 14px;
  color: #2A2A2A;
  line-height: 20px;
}
.address-container dt, .address-container dd{
  display: inline-block;
  vertical-align: middle;
}
.address-container{ overflow: hidden;}
</style>
