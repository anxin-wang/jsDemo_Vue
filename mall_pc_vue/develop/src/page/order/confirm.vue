<template>
  <div class="confirm">

    <div class="basic-line">
      <Breadcrumb class="bread-box">
        <BreadcrumbItem href="/">积分商城</BreadcrumbItem>
        <BreadcrumbItem>
          <router-link :to="{name:'details',params: {id: list.id,score: list.score}}">商品详情</router-link>
        </BreadcrumbItem>
        <BreadcrumbItem class="default-none">订单确认</BreadcrumbItem>
      </Breadcrumb>

      <div class="confirm-order-box">

        <!--第一次显示-->
        <div class="address-container" v-if="addressListObj.items == '' || addressListObj.items == null ">
          <p class="address-container-title">选择收货地址</p>
          <dl>
            <dt><label>*</label>所在地区</dt>
            <dd>
              <Cascader class="select-w168" @on-change="addressFtn" v-model="value2" change-on-select :data="Provincial" ></Cascader>
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
          <span @click="subMethods()" class="sub-btn">保存收货人信息</span>
        </div>
        <!--/. 第一次显示 -->

         <div class="address-box">
           <p class="address-header" v-if="isEmpty(addressListObj.items) != true">填写并核对订单信息</p>
           <div class="addres-sub-header" v-if="isEmpty(addressListObj.items) != true">
              <span class="sub-left">收货人信息</span>
              <span class="sub-right" @click="openAddress(null)">新增收货地址</span>
           </div>

           <ul class="clear-ul address-box-list" id="addresListBox">
             <li class="address-box-position"
                 v-for="(item,index) in addressListInfo"
                 v-if="index <= defaultItem "
                 :key="item.id"
                 :class="{'active-bars': index == 0 && item.is_default != 1}"
                 :data-default="item.is_default">
               <input @click="selectedAddress($event,item.id,item.is_default)" class="address-box-radio" name="address" type="radio"/>
               <span class="address-name"
                     v-text="item.name"
                     :class="{'active-address-name': index == 0 && item.is_default != 1}">坚小果</span>
               <span class="address-sub-name" v-text="item.name">坚小果</span>
               <span class="active-address">{{ item.provinces_cities }}{{ item.address | filterAddress }}</span>
               <span id="defaultAddr" class="default-address" v-if="item.is_default == 1">默认地址</span>
               <div class="operation"
                    :class="{'block-box': index == 0 && item.is_default != 1}">
                 <span class="set-address" @click="settDefault(item.id,$event)">设为默认地址</span>
                 <span class="cursors" @click="openAddress(item)">编辑</span>
                 <span class="cursors" @click="openDelete(item.id)">删除</span>
               </div>
             </li>
           </ul>
           <input id="hidId" type="hidden" value="0"/>
           <p v-if="isEmpty(addressListObj.items) != true">
             <a @click="moreAddressList()" class="more-address" href="javascript:void(0);"><span class="line-bar">更多地址</span><img class="line-bar" src="../../assets/images/more_address.png"></a>
           </p>

           <div class="commodity-details-box">
              <p class="commodity-details-header">送货清单</p>
              <ul class="clear-ul commodity-details-list">
                <li>
                  <div class="details-left">
                    <div class="delivery-type">
                      <p class="delivery">配送方式</p>
                      <span class="address-name active-address-name">快递</span>
                      <p class="free">免运费0元</p>
                    </div>
                  </div>
                  <div class="details-right">
                    <div class="commodity-container">
                      <p class="commodity-container-header">商品详情</p>
                      <ul class="clear-ul commodity-container-list">
                        <li class="commodity-pic-box">

                          <!-- 默认图片 -->
                          <img v-if="list.img == '' || list.img == null " src="../../assets/images/image_err.gif"/>
                          <!--/. 默认图片 -->

                          <img :src="list.img | filterUrl">

                        </li>
                        <li class="commodity-name-box">
                          <p class="commodity-name" v-text="list.name">京东E卡经典卡300面值(实体卡)</p>
                          <p class="commodity-mark">*实物礼品非质量问题不退不换</p>
                        </li>
                        <li>
                          <p class="commodity-score">
                            {{ list.discount_core == 0 || list.discount_core == null ? list.score : list.discount_core }}
                            积分
                          </p>
                        </li>
                        <li><p class="commodity-num">x {{ num }}</p></li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>

             <div class="confirm-box">
               <p class="label-info-1">应付金额:<span class="label-info-2">{{ list.unPay }}</span><span class="label-info-3">积分</span></p>
               <p><span class="label-info-4"><label class="line-bar">运</label><label class="line-bar label-left">费</label>:</span><span class="label-info-5">0.00元</span></p>
               <a @click="order()" class="sub-btn" href="javascript:void(0);">提交订单</a>
             </div>

           </div>

         </div>
      </div>



      <!-- 新增修改地址 -->
      <Modal
        v-model="modal10"
        width="771px"
        class="modal-box"
        class-name="vertical-center-modal"
        :closable="false"
        :mask-closable="false">
        <div class="close-container" slot="header">
          {{ msgTile }}
          <i @click="cloaseModal10()" class="close-i-box"></i>
        </div>
        <div class="address-container">
          <p class="address-container-title">选择收货地址</p>
          <dl>
            <dt><label>*</label>所在地区</dt>
            <dd>
              <Cascader class="select-w168" @on-change="addressFtn" v-model="value2" change-on-select :data="Provincial" ></Cascader>
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
          <span @click="subMethods()" class="sub-btn">保存收货人信息</span>
        </div>


      </Modal>
      <!--/. 新增修改地址 -->

      <!-- UI提示框 -->
      <Modal
        v-model="modal2"
        width="500px"
        class="modal-box-mall"
        class-name="vertical-center-modal"
        :closable="false"
        :mask-closable="false">
        <div class="close-container" slot="header">
          {{ messageTile }}
          <i @click="closeModal2()" class="close-i-box"></i>
        </div>
        <div class="message-info-box">
          <p class="message-info-title" v-html="messageInfo"></p>
          <span @click="closeModal2()" v-if="showBtn == 2 " class="cancel-box line-bar">取消</span>
          <span @click="deleAddress()" v-if="showBtn == 2 " class="sure-box line-bar">确定</span>
          <span @click="closeModal2() " v-if="showBtn == 1 || showBtn == 3 " class="cancel-box line-bar">关闭</span>
          <span @click="continueGo()" v-if="showBtn == 3 " class="sure-box line-bar">继续兑换</span>
          <span @click="closeModal2()" v-if="showBtn == 4 " class="sure-box line-bar">确定</span>
          <span @click="continueGo()" v-if="showBtn == 5 " class="sure-box line-bar">继续兑换</span>
        </div>

      </Modal>
      <!--/. UI提示框 -->

      <router-link id="goHome" to="/"></router-link>

    </div>

  </div>
</template>
<script>
  import myUtil from '../../util/prots'
  import AddressBar from '@/components/address'
  import district from '../../util/district'

  export default {
    name: 'confirm',
    components: { AddressBar},
    data () {
      return {
        modal10: false,
        modal1: false,
        modal2: false,
        commodity: {
          id: 0,
          score: 0
        },
        list: {
          id: 0,
          name: '',
          score: 0,
          market_price: 0.00,
          discount_core: '',
          description: '',
          img: '',
          unPay: 0
        },
        num: 0,
        goods_data:[],
        user_address: "",
        messageTile: '',
        messageInfo: '',
        showBtn: 2,
        addressListObj: [],//收获地址列表
        defaultItem: 2,//默认显示三条地址 数字为下标
        msgTile: '',

        address: {
          user_provinces_cities:"",    /*省市区*/
          user_provinces_cities_id:"",    /*省市区*/
          user_address:'', /*地址*/
          user_name:'',          /*收件人*/
          user_phone:'',         /*手机号码*/
          user_sex: '', /*性别*/
        },
        Provincial:[],     /*省市区 数据*/
        value2: [],
        isLogin: 0, //0未登录
        checkId: null,
        bools: true,
        isCheckVal: false
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        this.handleSpinCustom();
      })
    },
    mounted () {
      this.$nextTick(function () {
        this.integrals();
        this.getCommodity();
        this.getDistrict();
        myUtil.iframeResize();//调整父页面iframe的高度
        parent.document.body.scrollTop = 0;
        parent.document.documentElement.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      })
    },
    computed: {
      addressListInfo () { //处理地址
        let _self = this;
        let addressObj = [];
        if(_self.addressListObj.items != null){
          for (let i = 0; i< _self.addressListObj.items.length;i++) {
            if(_self.addressListObj.items[i].is_default != '1'){
              addressObj.push(_self.addressListObj.items[i]);
            }else{
              addressObj.unshift(_self.addressListObj.items[i]);//方法可向数组的开头添加一个或更多元素
            }
          }
        }
        return addressObj;
      }
    },
    methods: {
      isEmpty(value) {//是否为数组
        return (Array.isArray(value) && value.length === 0) || (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0);
      },
      selectedAddress (el,id,showCode) {
       let _self = this;
       let obj = el.target;
       let temp  = document.getElementById("addresListBox");
       let liItem = temp.getElementsByTagName("li");
       let def = document.getElementById("defaultAddr");
        _self.checkId = id;
       _self.isCheckVal = true;

        if(showCode == 1){
          def.classList.add("hide-box");
        }else{
           if(def != null && def != ''){
             def.classList.remove("hide-box");
           }
        }
       if(liItem.length > 0){
         for(let i = 0; i < liItem.length; i++){ //移除所有选中样式 active-address-name
           liItem[i].classList.remove( 'active-bars');
           liItem[i].classList.remove( 'active-bars');
           liItem[i].lastChild.style = "";
           liItem[i].lastChild.classList.remove("block-box");
           liItem[i].firstChild.nextElementSibling.classList.remove("active-address-name");
         }
         //添加选中样式
         obj.parentNode.classList.add('active-bars');
         obj.parentNode.lastChild.style = "display:block";
         obj.parentNode.lastChild.classList.remove("hide-box");
         obj.nextElementSibling.classList.add("active-address-name");
       }
      },
      closeMarks () {
        parent.document.getElementById("ScrollTopLogoNav").style = "z-index: normal;" ;
        if(parent.document.getElementById('mask')){
          parent.document.getElementById('mask').style.display="none";
        }
      },
      handleSpinCustom  (){ //loading效果
        if(parent.document.getElementById('mask')){
          parent.document.getElementById('mask').style.display="block";
        }
        parent.document.getElementById("ScrollTopLogoNav").style = "z-index: 890!important;position: absolute;" ;
        this.$Spin.show({
          render: (h) => {
            return h('div', [
              h('Icon', {
                'class': 'demo-spin-icon-load',
                props: {
                  type: 'load-c',
                  size: 18
                }
              }),
              h('div', 'Loading')
            ])
          }
        });
      },
      setScrollTop () {
        var iframe = parent.document.getElementById("iframe");
        iframe.contentWindow.window.scrollTo(0,0);
        iframe.contentWindow.document.documentElement.scrollTop = 0;
        iframe.contentWindow.document.body.scrollTop = 0;
      },
      closeModal2 () {
        let _self = this;
        _self.setScrollTop();
        _self.modal2 = false;
        parent.document.getElementById("ScrollTopLogoNav").style = "z-index: normal;" ;
        if(parent.document.getElementById('mask')){
          parent.document.getElementById('mask').style.display="none";
        }
      },
      cloaseModal10 () {
        let _self = this;
        _self.modal10 = false;
        parent.document.getElementById("ScrollTopLogoNav").style = "z-index: normal;" ;
        _self.setScrollTop();
        if(parent.document.getElementById('mask')){
          parent.document.getElementById('mask').style.display="none";
        }
      },
      integrals () { //可用积分
        let _self = this;

        let Url = '/mapi2/index.php'
        let formData = new FormData();
        formData.append("act", "uc_score");
        /*formData.append("email", '13641728490');
        formData.append("pwd", 's123456');*/
        formData.append("r_type", "1");

        this.$http.post(Url, formData)
          .then(function (response) {
            let obj = response.data;
            _self.isLogin = obj.response_code;
            _self.addressList();
            _self.commodityInfo();
            console.log(response,'可用积分')
          }).catch(function (error) {
          _self.$Notice.open({title: '温馨提示',desc: error });
        });
      },
      settDefault (id,el) {//设置为默认地址
        let _self = this;
        let obj = el.target;
        obj.parentNode.style.display = "none";
        _self.address =  { id: '',user_provinces_cities:"", user_provinces_cities_id:"",user_address:'', user_name:'', user_phone:'', user_sex: '',is_default: ''}

        if(_self.isLogin == 0){
          parent.location.href = '/index.php?ctl=user&act=login'
        }else{
         if(_self.bools){
           _self.bools = false;
           let url = '/mapi2/index.php';
           this.$http.get(url,{params:{
             act: 'uc_user_address',
             act_2: 'defaultAddress',
             id: id,
             is_default: 1,//是否默认（1:是 0:否）
             /*email: '13641728490',
             pwd: 's123456',*/
             r_type: '1'
           }})
             .then(function(response){
               let res = response.data;
               console.log(response,'新增修改')
               _self.addressList();
               _self.$Notice.open({title: '温馨提示',desc: res.show_err });
               setTimeout(function () {
                 _self.bools = true;
               },3000)
             });
         }

        }
      },
      subMethods () { //新增or删除
        let _self = this;

        if(_self.isLogin == 0){
          parent.location.href = '/index.php?ctl=user&act=login'
          return false;
        }

        if(_self.addressListObj.items != null && _self.addressListObj.items != ''){
          if(_self.addressListObj.items.length >= 5){
            _self.$Notice.open({title: '温馨提示',desc: '地址添加已上限!请删除原来的地址,才能保存新的地址!' });
            return false;
          }
        }

        if(_self.address.user_provinces_cities_id == null || _self.address.user_provinces_cities_id == ""){//所在地区
          _self.$Notice.open({ title: '温馨提示', desc: '所在地区有误！' });
          return false;
        }else if(_self.address.user_address == null || _self.address.user_address == ""){ //详细地址
          _self.$Notice.open({ title: '温馨提示', desc: '详细地址有误！' });
          return false;
        }else if(_self.address.user_name == null || _self.address.user_name == ""){//收件人
          _self.$Notice.open({ title: '温馨提示', desc: '收货人姓名有误！' });
          return false;
        }else if(_self.address.user_phone == null || _self.address.user_phone == ""){//收件人电话
          _self.$Notice.open({ title: '温馨提示', desc: '手机号码有误！' });
          return false;
        }else if(_self.address.user_sex == null || _self.address.user_sex == ""){//性别
          _self.$Notice.open({ title: '温馨提示', desc: '性别有误！' });
          return false;
        }


        let temp  = document.getElementById("addresListBox");
        let liItem = temp.getElementsByTagName("li");

        if(liItem.length > 0){
          for(let i = 0; i < liItem.length; i++){ //移除所有选中样式 active-address-name
            liItem[i].lastChild.style = "";
          }
        }


        let url = '/mapi2/index.php';
        this.$http.get(url,{params:{
          act: 'uc_user_address',
          act_2: 'save',
          id: _self.address.id,
          user_name: _self.address.user_name,
          user_phone: _self.address.user_phone,
          user_address: _self.address.user_address,
          user_provinces_cities: _self.address.user_provinces_cities,
          user_provinces_cities_id: _self.address.user_provinces_cities_id ,
          user_sex: _self.address.user_sex,
          /*email: '13641728490',
          pwd: 's123456',*/
          r_type: '1'
        }})
          .then(function(response){
             let res = response.data;
             console.log(response,'新增修改')
            _self.addressList();
            _self.address =  { id: '',user_provinces_cities:"", user_provinces_cities_id:"",user_address:'', user_name:'', user_phone:'', user_sex: '',is_default: ''}
            _self.$Notice.open({title: '温馨提示',desc: res.show_err });
          });
        _self.cloaseModal10();
      },
      openAddress (obj) { //打开更新新增地址框
        console.log(obj,'1---------------------------')

        let _self = this;
        if(obj != null && obj != ""){
          _self.msgTile = '修改收货人信息';
          _self.address.id = obj.id;
          _self.address.user_name = obj.name;
          _self.address.user_phone = obj.phone;
          _self.address.user_sex = obj.sex;
          _self.address.user_address = obj.address;
          _self.address.user_provinces_cities = obj.provinces_cities;
          _self.address.user_provinces_cities_id = obj.provinces_cities_id;
          _self.value2 = obj.provinces_cities_id.split(",");
        }else{

          if(_self.addressListObj.items != null && _self.addressListObj.items != ''){
            if(_self.addressListObj.items.length >= 5){
              _self.$Notice.open({title: '温馨提示',desc: '地址添加已上限!请删除原来的地址,才能保存新的地址!' });
              return false;
            }
          }

          _self.msgTile = '新增收货人信息';
          _self.value2 = [];
          _self.address =  { id: '',user_provinces_cities:"", user_provinces_cities_id:"",user_address:'', user_name:'', user_phone:'', user_sex: '',is_default: ''}
          _self.address.is_default = 0;//是否默认（1:是 0:否）
        }

        _self.setScrollTop();
        _self.modal10 = true;
        parent.document.body.scrollTop = 0;
        parent.document.documentElement.scrollTop = 0;
        parent.document.getElementById("ScrollTopLogoNav").style = "z-index: 0!important;position: sticky;" ;
        parent.document.getElementById('mask').style.display="block";




        //parent.document.getElementById("ScrollTopLogoNav").style = "z-index: 890!important;position: absolute;" ;
      },
      checkPhone () { //手机号码验证
        let _self = this;
        let regex = "^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$";
        let reg = new RegExp(regex);
        if(reg.test(_self.address.user_phone)){
          return false;
        }else{
          this.$Notice.open({ title: '温馨提示', desc: '手机号有误！' });
          return false;
        }
      },
      addressFtn (value, selectedData){ //省市区取值
        let _self = this;
        _self.address.user_provinces_cities = selectedData.map(function(o){
          return o.label
        }).join(',');
        _self.address.user_provinces_cities_id = selectedData.map(function(o){
          return o.value
        }).join(',');
      },
      getDistrict (){ //获取省市区县
        let _self = this;
        _self.Provincial = district.baseDistrict();
      },
      openDelete (id) { //打开删除框
         let _self = this;
        if(parent.document.getElementById('mask')){
          parent.document.getElementById('mask').style.display="block";
        }
        _self.setScrollTop();
         _self.modal2 = true;
        parent.document.body.scrollTop = 0;
        parent.document.documentElement.scrollTop = 0;
        parent.document.getElementById("ScrollTopLogoNav").style = "z-index: 0!important;position: sticky;" ;
        parent.document.getElementById('mask').style.display="block";

         _self.showBtn = 2; //删除
        _self.messageTile = "温馨提示";
        _self.messageInfo = "您确认删除此条地址吗?"
        _self.address.id = id;
      },
      deleAddress () { //删除
        let _self = this;
        let Url = '/mapi2/index.php?'
        _self.closeModal2();
        if(_self.isLogin == 0){
          parent.location.href = '/index.php?ctl=user&act=login'
          return false;
        }

        if(_self.address.id != null && _self.address.id != ''){

          _self.$http.get(Url,{params:{
            act: 'uc_user_address',
            act_2: 'del',
            id: _self.address.id,
            /*email: '13641728490',
            pwd: 's123456',*/
            r_type: '1'
          }}).then(function(response){
            console.log(response,'删除接口')
            _self.addressList();
            _self.modal2 = false;
            parent.document.getElementById("ScrollTopLogoNav").style = "z-index: normal;" ;
            _self.setScrollTop();
            _self.address.id = "";
            _self.$Notice.open({ title: '温馨提示', desc: response.data.show_err });
          });

        }
      },
      moreAddressList () { //更多收获地址
          let _self = this;
          _self.defaultItem == 2 ? _self.defaultItem = 4 : _self.defaultItem = 2;
      },
      addressList () { //收获地址列表
        let _self = this;
        let Url = '/mapi2/index.php?'
        let goodsId = _self.$route.params.id;
        let num = _self.$route.params.num;

        _self.$http.get(Url,{params:{
          act: 'uc_user_address',
          page:0,
          goods_id:goodsId,
          number:num,
         /* email: '13641728490',
          pwd: 's123456',*/
          r_type: '1'
        }}).then(function(response){
            console.log(response,'收获地址列表')
          _self.addressListObj = response.data;
            if(response.data.items != null && response.data.items != ''){
              document.querySelector("#hidId").value = 1;//表示有地址
            }
        });
      },
      continueGo () { //继续兑换
        let _self = this;
        document.getElementById("goHome").click();
        parent.location.href = '/index.php?ctl=integralmall';
        _self.closeModal2();
      },
      order () { //提交订单
        let _self = this;
        let hidId = document.querySelector("#hidId").value;//表示有地址
        if(hidId == 0){
          parent.document.body.scrollTop = 0;
          parent.document.documentElement.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          _self.$Notice.open({ title: '温馨提示', desc: '请添加收货地址再保存!'});
          return false;
        }

        let isDef = false;
        let isDid = null;
        for(let i = 0; i< _self.addressListInfo.length; i++){
          if(_self.addressListInfo[i].is_default == 1){
            let id = _self.addressListInfo[i].id;
            isDid = id; //提交订单时,如果有默认地址就取默认地址
            isDef = true;
            break;
          }
        }


        if(isDef == false && _self.isCheckVal == false){
          _self.checkId = _self.addressListInfo[0].id;
        }else if((isDid != null && isDid != '') &&  _self.isCheckVal == true){

        }else if(isDid != null && isDid != ''){
            _self.checkId = isDid;
        }

        if(_self.checkId != null && _self.checkId != ""){
          _self.address.id = _self.checkId;
        }else{
          _self.address.id = hidId
        }
        if(_self.user_address.id == null || _self.user_address.id == ''){
          if(parent.document.getElementById('mask')){
            parent.document.getElementById('mask').style.display="block";
          }
          _self.setScrollTop();
          _self.modal2 = true;
          parent.document.body.scrollTop = 0;
          parent.document.documentElement.scrollTop = 0;
          parent.document.getElementById("ScrollTopLogoNav").style = "z-index: 0!important;position: sticky;" ;
          parent.document.getElementById('mask').style.display="block";
          _self.showBtn = 1;
          _self.messageTile = "温馨提示";
          _self.messageInfo = "请选择收货地址";
        }

        let commodityId = _self.$route.params.id;
        _self.num = _self.$route.params.num;
        let Url = '/mapi2/index.php';

        let formData = new FormData();
        formData.append("act", "uc_goods_order");
        formData.append("act_2", "order_submit");
        formData.append("address_id", _self.address.id);
        formData.append("goods_id", commodityId);
        formData.append("number", _self.num);
       /* formData.append("email", '13641728490');
        formData.append("pwd", 's123456');*/
        formData.append("r_type", "1");

        this.$http.post(Url,formData)
          .then(function(response){
            var res = response.data;

            if(res.response_code == 1){
              if(parent.document.getElementById('mask')){
                parent.document.getElementById('mask').style.display="block";
              }
              parent.document.getElementById("ScrollTopLogoNav").style = "z-index: 0!important;position: sticky;" ;
              _self.setScrollTop();
              _self.modal2 = true;
              _self.showBtn = 5;
              parent.document.body.scrollTop = 0;
              parent.document.documentElement.scrollTop = 0;
              _self.messageTile = "温馨提示";
              _self.messageInfo = "尊敬的用户,您的兑换的商品已兑换成功<br/>我们会按您填写的地址尽快发货";

            }else{
              if(parent.document.getElementById('mask')){
                parent.document.getElementById('mask').style.display="block";
              }
              parent.document.getElementById("ScrollTopLogoNav").style = "z-index: 0!important;position: sticky;" ;
              _self.setScrollTop();
              _self.modal2 = true;
              _self.showBtn = 4;
              parent.document.body.scrollTop = 0;
             parent.document.documentElement.scrollTop = 0;
              _self.messageTile = "温馨提示";
              _self.messageInfo = res.show_err;
            }
            setTimeout(function () {
              _self.showClose = true;
            },300)
          });

      },
      commodityInfo () { //商品信息
        let _self = this;

        let id = _self.$route.params.id;
        _self.num = _self.$route.params.num;
        let url = '/mapi2/index.php'

        let users = localStorage.getItem('user');
        users = JSON.parse(users);

        let formData = new FormData();
        formData.append("act", "uc_goods_order");
        formData.append("act_2", 'exchange');
        formData.append("goods_id", id);
        formData.append("number", _self.num);
        /*formData.append("email", '13641728490');
        formData.append("pwd", 's123456');*/
        formData.append("r_type", "1");

        if(_self.$route.params.adr != 0){
          formData.append("goods_id", _self.$route.params.adr);
        }

        this.$http.post(url,formData)
          .then(function(response){
              console.log(response,'还没提交订单')
          var res = response.data;
          if(res.goods != null && res.goods != ""){
            _self.goods_data = res;
            _self.list.id = res.goods.id;
            _self.list.name = res.goods.name;
            _self.list.score = res.goods.score
            _self.list.market_price = res.goods.market_price;
            _self.list.discount_core = res.goods.discount_core;
            _self.list.description = res.goods.description;
            _self.list.img = res.goods.img;
            _self.user_address= res.user_address;
            var nums = 0;
            if(res.goods.discount_core == 0 || res.goods.discount_core == null){
              nums = res.goods.score;
            }else{
              nums = res.goods.discount_core;
            }
            _self.list.unPay = _self.num * nums;
          }
        })
      },
      getCommodity () { //获取传来的参数
        let _self = this;
        _self.commodity.id = _self.$route.params.id;
        _self.commodity.score = _self.$route.params.score;
        _self.closeMarks();
        _self.$Spin.hide();
      }
    },
    filters: {
      filterUrl (url) { //过略图片路径
        if(url.indexOf("./") > -1){
          var newUrl = url.substr(1, url.length);
          let str = myUtil.baseProts();
          if(str.indexOf(':8080') > -1){
            str = "https://www.jianguolicai.cn" + newUrl;
            return str;
          }
          return str + newUrl;
        }else{
          return url;
        }
      },
      filterAddress (str) {
        if(str != null && str != ""){
          if(str.toString().length > 25){
            return str.toString().slice(0,25) + '...';
          }else{
            return str.toString().slice(0,25);
          }
        }
      }
    }
  }
</script>
<style>

  .vertical-center-modal{ display: flex; align-items: center;justify-content: center;}
  .vertical-center-modal .ivu-modal{ top: 0;}

.modal-box-mall .ivu-modal-content,
.modal-box-mall .ivu-modal-body,
.modal-box-mall .ivu-modal{ height: 267px!important;}
  .ivu-modal{
    width:771px;
    height: 543px;
    background: #FFFFFF;
    -webkit-border-radius: 4px!important;
    -moz-border-radius: 4px!important;
    border-radius: 4px!important;
  }
  .ivu-modal-content{ height: 573px;}
  .ivu-modal-body{ height: 573px;}
  .ivu-modal-footer{ display: none;}
  .ivu-modal-header p, .ivu-modal-header-inner{
    font-size: 18px;
    color: #333333;
  }
  .ivu-modal-header{
    background: #F3F3F3;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
</style>
<style scoped>
  .block-box{
    display: block!important;
  }
  .hide-box{
    display: none!important;
  }
  .active-bars{
    background-color: #fcf9f4;
  }
  .address-box-position{ position: relative;}
  .address-box-radio{
    position: absolute;
    top: 0;
    left: 0;
    width: 70%;
    height: 100%;
    opacity: 0;
  }
  div[name='confirm']{ width: 100%;}

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
    width: 168px!important;
    height: 36px!important;
    line-height: 36px!important;
    text-align: center!important;
    font-weight: 600!important;
    font-size: 14px!important;
    color: #FFFFFF!important;
    background: #FFC156!important;
    border-radius: 2px!important;
    margin-left: 180px!important;
    margin-top: 30px!important;
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











.address-box-list li:hover span.default-address{
  display: none;
}
.address-box-list li:hover div.operation span:first-child{
  font-size: 12px;
  color: #F25F5C!important;
  margin-right: 37px;
  font-weight: 600;
  background: none!important;
  cursor: pointer;
}
.address-box-list li:hover div.operation span:nth-child(3){
  font-size: 12px;
  color: #666666;
}
.address-box-list li:hover div.operation span:nth-child(2){
  margin-right: 10px;
  font-size: 12px;
  color: #666666;
}

.address-box-list li:hover div.operation{
  display: block!important;
}
.address-box-list li:hover span:first-child{
  font-weight: 600;
  color: #666666!important;
  border: 0!important;
  width: 160px!important;
  height: 38px!important;
  background: url("../../assets/images/select.png") no-repeat!important;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  background-color: #fff;
}
.address-box-list li:hover{
  background-color: #fcf9f4;
}
.cursors{ cursor: pointer}
.sure-box{
  width: 120px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #FDB75A;
  font-weight: 600;
  font-size: 14px;
  color: #FFFFFF;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  margin-top: 38px;
  cursor: pointer;
}
.cancel-box{
  width: 120px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #E5E5E5;
  font-weight: 600;
  font-size: 14px;
  color: #666666;
  cursor: pointer;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  margin-top: 38px;
  margin-right: 10px;
}
.message-info-box{
  margin-top: 40px;
  text-align: center;
}
.message-info-title{
  font-family: PingFangSC-Regular;
  font-size: 18px;
  color: #333333;
}
.sub-btn{
  display: inline-block;
  width: 150px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  margin-top: 34px;
  color: #FFFFFF;
  background: #F25F5C;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
.label-info-5{
  font-size: 14px;
  color: #999999;
}
.label-left{ margin-left: 30px}
.label-info-4{
  display: inline-block;
  font-size: 14px;
  width: 70px;
  text-align: center;
  color: #999999;
  margin-right: 142px;
}
.label-info-3{
  font-size: 14px;
  color: #F74E3B;
}
.label-info-2{
  font-size: 20px;
  color: #F74E3B;
  margin-left: 26px;
  margin-right: 10px;
}
.label-info-1{
  font-size: 14px;
  color: #999999;
  margin-bottom: 10px;
}
.confirm-box{
  text-align: right;
  padding-right: 35px;
  padding-top: 48px;
  padding-bottom: 50px;
}
.commodity-container-header{
  font-size: 12px;
  font-weight: 600;
  color: #666666;
  margin-bottom: 18px;
}
.commodity-pic-box img{
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}
.commodity-pic-box{
  background: #FFFFFF;
  border: 1px solid #CCCCCC;
  padding-top: 15px;
  padding-left: 10px;
  padding-right: 10px;
}
.commodity-name-box{ padding-left: 10px;}
.commodity-num{
  font-family: Monaco;
  font-size: 14px;
  color: #666666;
}
.commodity-score{
  font-size: 14px;
  color: #F74E3B;
}
.commodity-mark{
  font-family: PingFangSC-Light;
  font-size: 12px;
  color: #F25F5C;
}
.commodity-name{
  font-size: 12px;
  color: #666666;
}
.commodity-container-list li:last-child{ width: 50px;}
.commodity-container-list li:nth-child(3){
  width: 200px;
}
.commodity-container-list li:nth-child(2){
  width: 300px;
}
.commodity-container-list li:first-child{
  width: 100px;

}
.commodity-container-list li{ float: left;height: 100px!important;}
.commodity-container-list{
  overflow: hidden;
  height: 100px;
}
.delivery-type, .commodity-container{
  margin-left: 71px;
  margin-top: 34px;
}
.free{
  font-size: 12px;
  color: #999999;
  margin-top: 15px;
}
.delivery{
  font-size: 12px;
  font-weight: 600;
  color: #666666;
  margin-bottom: 16px;
}
.details-right{
  position: absolute;
  right: 0;
  top: 0;
  width: 723px;
  height: inherit;
  background-color: #f4fbfe;
}
.details-left{
  position: absolute;
  left: 0;
  top: 0;
  width: 398px;
  height: inherit;
  background-color: #f7f7f7;
}
.commodity-details-list{ width: 1120px;margin-left: 43px;}
.commodity-details-list li{
  height: 192px;
  position: relative;
}
.commodity-details-header{
  font-size: 14px;
  font-weight: 600;
  color: #333333;
  margin-top: 39px;
  margin-left: 43px;
  margin-bottom: 35px;
}
.commodity-details-box{ overflow: hidden;}
.more-address{
  padding-top: 70px;
  padding-left: 45px;
  font-size: 12px;
  color: #666666;
}
 .active-address{ color: #666666;}
  .operation span:nth-child(3){
    font-size: 12px;
    color: #666666;
  }
.operation span:nth-child(2){
  margin-right: 10px;
  font-size: 12px;
  color: #666666;
}
.set-address{
  font-size: 12px;
  color: #F25F5C;
  margin-right: 37px;
  font-weight: 600;
}
.operation{
  text-align: center;
  position: absolute;
  right: 110px;
  top: 8px;
  display: none;
}
.active-bar{
  background-color: #fcf9f4;
}
.active-address-name{
  font-weight: 600;
  color: #666666!important;
  border: 0!important;
  width: 160px!important;
  height: 38px!important;
  background: url("../../assets/images/select.png") no-repeat!important;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  background-color: #fff;
}
.address-sub-name{
  margin-left: 12px;
  margin-right: 27px;
}
.address-box-list li{
  height: 38px;
  font-size: 12px;
  color: #999999;
  position: relative;
  margin-bottom: 16px;
}
.address-box-list{
  width: 1052px;
  margin-top: 30px;
  margin-left: 111px;
}
.default-address{
  display: inline-block;
  width: 100px;
  height: 23px;
  line-height: 23px;
  font-size: 12px;
  color: #FFFFFF;
  cursor: pointer;
  text-align: center;
  background: #999999;
  position: absolute;
  right: 200px;
  top: 8px;
}
.address-name{
  display: inline-block;
  width: 160px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  font-size: 12px;
  color: #999999;
  background: #FFFFFF;
  border: 1px solid #CCCCCC;
}
.sub-right{
  position: absolute;
  right: 42px;
  font-size: 12px;
  color: #28A5E7;
  cursor: pointer;
}
.sub-left{
  font-size: 14px;
  color: #333333;
  font-weight: 600;
  margin-left: 44px;
}
.addres-sub-header{
  position: relative;
  height: 30px;
  margin-top: 39px;
}
.address-header{
  font-size: 16px;
  color: #666666;
  margin-top: 31px;
  margin-left: 47px;
}
.address-box{ overflow: hidden;}
.confirm-order-box{
  min-height: 862px;
  height: auto;
  background-color: #fff;
}
</style>
