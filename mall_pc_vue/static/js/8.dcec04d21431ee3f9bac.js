webpackJsonp([8],{"6Ehs":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{name:"details"}},[o("div",{staticClass:"basic-line"},[o("Breadcrumb",{staticClass:"bread-box"},[o("BreadcrumbItem",{attrs:{href:"/"}},[e._v("积分商城")]),e._v(" "),o("BreadcrumbItem",{staticClass:"default-none"},[e._v("商品详情")])],1),e._v(" "),o("div",{staticClass:"commodity-box"},[o("div",{staticClass:"commodity-left line-bar-top"},[""==e.list.img||null==e.list.img?o("img",{attrs:{src:n("Cj77")}}):e._e(),e._v(" "),o("img",{attrs:{src:e._f("filterUrl")(e.list.img)}})]),e._v(" "),o("div",{staticClass:"commodity-right line-bar-top"},[o("p",{staticClass:"commodity-right-header",domProps:{textContent:e._s(e.list.name)}},[e._v("通用1.0%理财加息卷")]),e._v(" "),o("p",{staticClass:"commodity-right-info"},[e._v("重要提示:产品如有质量问题或使用问题")]),e._v(" "),o("p",{staticClass:"commodity-right-info service-info"},[e._v("请拨打客服热线:"+e._s(e.serviceData.shop_tel)+"( "+e._s(e.serviceData.online_time)+" )")]),e._v(" "),o("p",[o("span",{staticClass:"price"},[e._v("现价:")]),e._v(" "),o("span",{staticClass:"big-score"},[e._v(e._s(e.list.scoreNum)),o("label",{staticStyle:{"font-size":"12px"}},[e._v("积分")])])]),e._v(" "),o("p",{staticClass:"line-throughs"},[e._v("市场价:"+e._s(e.list.market_price)+"元")]),e._v(" "),o("div",{staticClass:"exchange-box"},[o("div",{staticClass:"line-bar num-box"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.value1,expression:"value1"}],staticClass:"left",attrs:{type:"text",readonly:""},domProps:{value:e.value1},on:{input:function(t){t.target.composing||(e.value1=t.target.value)}}}),e._v(" "),o("div",{staticClass:"right"},[o("span",{staticClass:"plus",on:{click:function(t){e.plus()}}},[e._v("+")]),e._v(" "),o("span",{staticClass:"reduce",class:{"none-cursor":1==e.value1},on:{click:function(t){e.reduce()}}},[e._v("-")])])]),e._v(" "),o("a",{staticClass:"exchange--btn",attrs:{href:"javascript:void(0);"},on:{click:function(t){e.exchange()}}},[e._v("立即兑换")])])])]),e._v(" "),o("div",{staticClass:"commodity-info"},[o("div",{staticClass:"commodity-info-header"},[e._v("商品详情")]),e._v(" "),o("div",{staticClass:"commodity-list-info",domProps:{innerHTML:e._s(e.list.description)}})]),e._v(" "),o("Modal",{staticClass:"modal-box-mall",attrs:{width:"500px","class-name":"vertical-center-modal",closable:!1,"mask-closable":!1},model:{value:e.modal1,callback:function(t){e.modal1=t},expression:"modal1"}},[o("div",{staticClass:"close-container",attrs:{slot:"header"},slot:"header"},[e._v("\n         温馨提示\n         "),o("i",{staticClass:"close-i-box",on:{click:function(t){e.closeModal1()}}})]),e._v(" "),o("div",{staticClass:"message-info-box"},[o("p",{staticClass:"message-info-title"},[e._v(e._s(e.messageInfo))]),e._v(" "),2==e.btnShow?o("a",{staticClass:"cancel-box line-bar",attrs:{href:"javascript:void(0);"},on:{click:function(t){e.earnPoints()}}},[e._v("赚积分")]):e._e(),e._v(" "),2==e.btnShow?o("router-link",{staticClass:"sure-box line-bar",attrs:{to:e.defaultPorts+""}},[e._v("继续兑换")]):e._e(),e._v(" "),1==e.btnShow?o("span",{staticClass:"sure-box line-bar",on:{click:function(t){e.closeModal1()}}},[e._v("确认")]):e._e()],1)])],1)])},a=[],i={render:o,staticRenderFns:a};t.a=i},"7ywP":function(e,t,n){var o=n("AUmQ");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n("rjj0")("6380ef03",o,!0)},AUmQ:function(e,t,n){t=e.exports=n("FZ+f")(!0),t.push([e.i,".vertical-center-modal{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.vertical-center-modal .ivu-modal{top:0}.ivu-modal,.modal-box-mall .ivu-modal,.modal-box-mall .ivu-modal-body,.modal-box-mall .ivu-modal-content{height:267px}.ivu-modal{width:771px;background:#fff;border-radius:4px!important}.ivu-modal-body,.ivu-modal-content{height:267px}.ivu-modal-footer{display:none}.ivu-modal-header-inner,.ivu-modal-header p{font-size:18px;color:#333}.ivu-modal-header{background:#f3f3f3;border-radius:4px}img{max-width:100%;max-height:100%;width:auto;height:auto}","",{version:3,sources:["D:/workspace/jglcweb/mall_pc_vue/develop/src/page/commodity/details.vue"],names:[],mappings:"AACA,uBAAwB,oBAAqB,AAAC,oBAAqB,AAAC,aAAc,AAAC,yBAA0B,AAAC,sBAAuB,AAAC,mBAAoB,wBAAyB,qBAAsB,sBAAwB,CAChO,AACD,kCAAmC,KAAO,CACzC,AAKD,yGAF4B,YAAc,CAOzC,AALD,WACE,YAAY,AAEZ,gBAAoB,AACpB,2BAA6B,CAC9B,AAGD,mCAAiB,YAAc,CAC9B,AACD,kBAAmB,YAAc,CAChC,AACD,4CACE,eAAgB,AAChB,UAAe,CAChB,AACD,kBACE,mBAAoB,AACpB,iBAAmB,CACpB,AACD,IACE,eAAgB,AAChB,gBAAiB,AACjB,WAAY,AACZ,WAAa,CACd",file:"details.vue",sourcesContent:["\n.vertical-center-modal{ display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-align: center; -ms-flex-align: center; align-items: center;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;\n}\n.vertical-center-modal .ivu-modal{ top: 0;\n}\n.modal-box-mall .ivu-modal-content,\n.modal-box-mall .ivu-modal-body,\n.modal-box-mall .ivu-modal{ height: 267px;\n}\n.ivu-modal{\n  width:771px;\n  height: 267px;\n  background: #FFFFFF;\n  border-radius: 4px!important;\n}\n.ivu-modal-content{ height: 267px;\n}\n.ivu-modal-body{ height: 267px;\n}\n.ivu-modal-footer{ display: none;\n}\n.ivu-modal-header p, .ivu-modal-header-inner{\n  font-size: 18px;\n  color: #333333;\n}\n.ivu-modal-header{\n  background: #F3F3F3;\n  border-radius: 4px;\n}\nimg{\n  max-width: 100%;\n  max-height: 100%;\n  width: auto;\n  height: auto;\n}\n"],sourceRoot:""}])},CY8Y:function(e,t,n){var o=n("fgZJ");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n("rjj0")("a44de6ea",o,!0)},Cj77:function(e,t,n){e.exports=n.p+"static/img/image_err.d0cd979.gif"},"SO+5":function(e,t,n){"use strict";var o=n("Q1DV");t.a={name:"details",data:function(){return{value1:1,modal1:!1,isLogin:0,list:{name:"",score:0,market_price:0,discount_core:"",description:"",img:"",bigImg:"",scoreNum:0,user_can_buy_number:0},serviceData:{},messageInfo:"",btnShow:2,defaultPorts:"",usable_scor:0}},beforeCreate:function(){this.$nextTick(function(){this.handleSpinCustom()})},mounted:function(){this.$nextTick(function(){this.integrals(),this.commodityInfo(),this.servicePhone(),o.a.iframeResize(),parent.document.documentElement.scrollTop=0,document.documentElement.scrollTop=0,document.body.scrollTop=0})},methods:{closeMarks:function(){parent.document.getElementById("ScrollTopLogoNav").style="z-index: normal;",parent.document.getElementById("mask")&&(parent.document.getElementById("mask").style.display="none")},handleSpinCustom:function(){parent.document.getElementById("mask")&&(parent.document.getElementById("mask").style.display="block"),parent.document.getElementById("ScrollTopLogoNav").style="z-index: 890!important;position: absolute;",this.$Spin.show({render:function(e){return e("div",[e("Icon",{class:"demo-spin-icon-load",props:{type:"load-c",size:18}}),e("div","Loading")])}})},setScrollTop:function(){var e=parent.document.getElementById("iframe");e.contentWindow.window.scrollTo(0,0),e.contentWindow.document.documentElement.scrollTop=0,e.contentWindow.document.body.scrollTop=0},earnPoints:function(){parent.location.href="/index.php?ctl=deals"},closeModal1:function(){var e=this;e.setScrollTop(),e.modal1=!1,parent.document.getElementById("ScrollTopLogoNav").style="z-index: normal;",parent.document.getElementById("mask")&&(parent.document.getElementById("mask").style.display="none")},integrals:function(){var e=this,t=new FormData;t.append("act","uc_score"),t.append("r_type","1"),this.$http.post("/mapi2/index.php",t).then(function(t){var n=t.data;e.isLogin=n.response_code,e.usable_scor=t.data.usable_score}).catch(function(t){e.$Notice.open({title:"温馨提示",desc:t})})},defaultPortsUrl:function(){this.defaultPorts=o.a.baseProts()},servicePhone:function(){var e=this;this.$http.get("/mapi2/index.php?&act=app_company_information&r_type=1").then(function(t){console.log(t.data.data),1==t.data.response_code&&(e.serviceData=t.data.data)})},exchange:function(){var e=this,t=e.usable_scor,n=0,o=Number(e.list.scoreNum)*Number(e.value1);if(0==e.isLogin)return parent.location.href="/index.php?ctl=user&act=login",!1;n=0==e.list.discount_core||null==e.list.discount_core?e.list.score:e.list.discount_core,parseInt(t)<parseInt(n)?(parent.document.getElementById("mask")&&(parent.document.getElementById("mask").style.display="block"),e.setScrollTop(),e.messageInfo="积分不足,请兑换其它商品或赚取更多积分?",e.modal1=!0,e.btnShow=2,parent.document.documentElement.scrollTop=0,parent.document.getElementById("ScrollTopLogoNav").style="z-index: 890!important;position: absolute;"):e.list.user_can_buy_number<=0?(parent.document.getElementById("mask")&&(parent.document.getElementById("mask").style.display="block"),e.setScrollTop(),e.messageInfo="此商品已售罄，请选购其他商品!",e.modal1=!0,e.btnShow=2,parent.document.documentElement.scrollTop=0,parent.document.getElementById("ScrollTopLogoNav").style="z-index: 890!important;position: absolute;"):e.value1>e.list.user_can_buy_number?(parent.document.getElementById("mask")&&(parent.document.getElementById("mask").style.display="block"),e.setScrollTop(),e.messageInfo="超出你所能兑换的数量",e.modal1=!0,e.btnShow=1,parent.document.documentElement.scrollTop=0,parent.document.getElementById("ScrollTopLogoNav").style="z-index: 890!important;position: absolute;"):Number(o)>Number(t)?(parent.document.getElementById("mask")&&(parent.document.getElementById("mask").style.display="block"),e.setScrollTop(),e.messageInfo="当前兑换商品数量已超出现有可用积分!",e.modal1=!0,e.btnShow=1,parent.document.documentElement.scrollTop=0,parent.document.getElementById("ScrollTopLogoNav").style="z-index: 890!important;position: absolute;"):e.$router.push({name:"confirm",params:{id:e.$route.params.id,num:e.value1,score:e.usable_scor,adr:0}})},commodityInfo:function(){var e=this.$route.params.id,t=this,n=new FormData;n.append("act","goodslists"),n.append("act_2","detail"),n.append("id",e),n.append("r_type","1"),this.$http.post("/mapi2/index.php",n).then(function(e){var n=e.data;t.list.name=n.goods.name,t.list.score=n.goods.score,t.list.market_price=n.goods.market_price,t.list.discount_core=n.goods.discount_core,t.list.description=n.goods.description,t.list.img=n.goods.img,t.list.bigImg=n.goods.bigimg,t.list.user_can_buy_number=n.goods.user_can_buy_number,0==n.goods.discount_core||null==n.goods.discount_core?t.list.scoreNum=n.goods.score:t.list.scoreNum=n.goods.discount_core,t.closeMarks(),t.$Spin.hide()})},reduce:function(){var e=this;1==e.value1?e.value1=1:e.value1--},plus:function(){this.value1++}},filters:{filterUrl:function(e){if(e.indexOf("./")>-1){var t=e.substr(1,e.length),n=o.a.baseProts();return n.indexOf(":8080")>-1?n="https://www.jianguolicai.cn"+t:n+t}return e}}}},fgZJ:function(e,t,n){t=e.exports=n("FZ+f")(!0),t.push([e.i,"div[name=details][data-v-54ae70eb]{width:100%}.cursors[data-v-54ae70eb]{cursor:pointer}.sure-box[data-v-54ae70eb]{background:#fdb75a;color:#fff}.cancel-box[data-v-54ae70eb],.sure-box[data-v-54ae70eb]{width:120px;height:36px;line-height:36px;text-align:center;font-weight:600;font-size:14px;border-radius:2px;margin-top:38px;cursor:pointer}.cancel-box[data-v-54ae70eb]{background:#e5e5e5;color:#666;margin-right:10px}.message-info-box[data-v-54ae70eb]{margin-top:40px;text-align:center}.message-info-title[data-v-54ae70eb]{font-family:PingFangSC-Regular;font-size:18px;color:#333}.commodity-list-info img[data-v-54ae70eb]{max-width:100%;max-height:100%;width:auto;height:auto}.commodity-list-info[data-v-54ae70eb]{padding:10px}.commodity-info-header[data-v-54ae70eb]{height:50px;line-height:50px;font-size:16px;color:#666;letter-spacing:0;padding-left:10px;border-bottom:1px solid #eaebed}.commodity-info[data-v-54ae70eb]{min-height:635px;height:auto;margin-top:21px;background-color:#fff;border-radius:2px}.none-cursor[data-v-54ae70eb]{cursor:not-allowed!important}.reduce[data-v-54ae70eb]{width:22px}.plus[data-v-54ae70eb],.reduce[data-v-54ae70eb]{display:block;height:21px;line-height:21px;text-align:center;cursor:pointer;background-color:#fafafa;border-left:1px solid #ccc}.plus[data-v-54ae70eb]{border-bottom:1px solid #ccc}.num-box input[data-v-54ae70eb]{width:50%;height:40px;outline:none;border:0;text-align:center;padding-left:10px}.num-box[data-v-54ae70eb]{width:70px;height:44px;border:1px solid #ccc}.exchange--btn[data-v-54ae70eb]:hover{color:#fff!important}.exchange--btn[data-v-54ae70eb]{display:inline-block;width:142px;height:44px;line-height:44px;text-align:center;background:#f25f5c;font-weight:600;font-size:18px;color:#fff;letter-spacing:0;cursor:pointer;border-radius:2px}.exchange-box[data-v-54ae70eb]{margin-top:80px;overflow:hidden}.service-info[data-v-54ae70eb]{margin-bottom:24px}.line-throughs[data-v-54ae70eb]{text-decoration:line-through;opacity:.99;font-family:PingFangSC-Light;font-size:12px;color:#999;letter-spacing:0}.score-small[data-v-54ae70eb]{color:#f25f5c!important}.big-score[data-v-54ae70eb]{font-size:24px;color:#f25f5c;letter-spacing:0}.price[data-v-54ae70eb]{font-size:12px;color:#999;letter-spacing:0}.commodity-right-info[data-v-54ae70eb]{font-size:12px;color:#f25f5c;letter-spacing:0}.commodity-right-header[data-v-54ae70eb]{width:720px;font-size:16px;color:#666;letter-spacing:0;font-weight:600;margin-bottom:15px}.commodity-right[data-v-54ae70eb]{margin-top:33px}.commodity-left img[data-v-54ae70eb]{max-width:100%;max-height:100%;width:auto;height:auto}.commodity-left[data-v-54ae70eb]{width:355px;height:355px;text-align:center;padding:100px;border:1px solid #eee;margin-top:33px;margin-left:42px;margin-right:54px}.commodity-box[data-v-54ae70eb]{height:438px;background-color:#fff;overflow:hidden}","",{version:3,sources:["D:/workspace/jglcweb/mall_pc_vue/develop/src/page/commodity/details.vue"],names:[],mappings:"AACA,mCAAsC,UAAY,CACjD,AACD,0BAA2B,cAAe,CACzC,AACD,2BAKI,mBAAoB,AAGpB,UAAe,CAIlB,AACD,wDAZI,YAAa,AACb,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AAEnB,gBAAiB,AACjB,eAAgB,AAEhB,kBAAmB,AACnB,gBAAiB,AACjB,cAAgB,CAenB,AAbD,6BAKI,mBAAoB,AAGpB,WAAe,AAIf,iBAAmB,CACtB,AACD,mCACI,gBAAiB,AACjB,iBAAmB,CACtB,AACD,qCACI,+BAAgC,AAChC,eAAgB,AAChB,UAAe,CAClB,AACD,0CACE,eAAgB,AAChB,gBAAiB,AACjB,WAAY,AACZ,WAAa,CACd,AACD,sCACE,YAAc,CACf,AACD,wCACE,YAAa,AACb,iBAAkB,AAClB,eAAgB,AAChB,WAAe,AACf,iBAAkB,AAClB,kBAAmB,AACnB,+BAAiC,CAClC,AACD,iCACE,iBAAkB,AAClB,YAAa,AACb,gBAAiB,AACjB,sBAAuB,AACvB,iBAAmB,CACpB,AACD,8BACE,4BAA8B,CAC/B,AACD,yBAEE,UAAY,CAOb,AACD,gDATE,cAAe,AAEf,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,eAAgB,AAChB,yBAA0B,AAC1B,0BAA+B,CAWhC,AATD,uBAQG,4BAAiC,CACnC,AACD,gCACE,UAAW,AACX,YAAa,AACb,aAAc,AACd,SAAU,AACV,kBAAmB,AACnB,iBAAmB,CACpB,AACD,0BACE,WAAY,AACZ,YAAa,AACb,qBAA0B,CAC3B,AACD,sCAAuC,oBAAsB,CAC5D,AACD,gCACE,qBAAsB,AACtB,YAAa,AACb,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,mBAAoB,AACpB,gBAAiB,AACjB,eAAgB,AAChB,WAAe,AACf,iBAAkB,AAClB,eAAgB,AAChB,iBAAmB,CACpB,AACD,+BACE,gBAAiB,AACjB,eAAiB,CAClB,AACD,+BAAgC,kBAAoB,CACnD,AACD,gCACE,6BAA8B,AAC9B,YAAc,AACd,6BAA8B,AAC9B,eAAgB,AAChB,WAAe,AACf,gBAAkB,CACnB,AACD,8BAA+B,uBAAyB,CACvD,AACD,4BACE,eAAgB,AAChB,cAAe,AACf,gBAAkB,CACnB,AACD,wBACE,eAAgB,AAChB,WAAe,AACf,gBAAkB,CACnB,AACD,uCACE,eAAgB,AAChB,cAAe,AACf,gBAAkB,CACnB,AACD,yCACE,YAAa,AACb,eAAgB,AAChB,WAAe,AACf,iBAAkB,AAClB,gBAAiB,AACjB,kBAAoB,CACrB,AACD,kCACE,eAAiB,CAClB,AACD,qCACE,eAAgB,AAChB,gBAAiB,AACjB,WAAY,AACZ,WAAa,CACd,AACD,iCACE,YAAa,AACb,aAAc,AACd,kBAAmB,AACnB,cAAe,AACf,sBAA0B,AAC1B,gBAAiB,AACjB,iBAAkB,AAClB,iBAAmB,CACpB,AACD,gCACE,aAAc,AACd,sBAAuB,AACvB,eAAiB,CAClB",file:"details.vue",sourcesContent:["\ndiv[name='details'][data-v-54ae70eb]{ width: 100%;\n}\n.cursors[data-v-54ae70eb]{ cursor: pointer\n}\n.sure-box[data-v-54ae70eb]{\n    width: 120px;\n    height: 36px;\n    line-height: 36px;\n    text-align: center;\n    background: #FDB75A;\n    font-weight: 600;\n    font-size: 14px;\n    color: #FFFFFF;\n    border-radius: 2px;\n    margin-top: 38px;\n    cursor: pointer;\n}\n.cancel-box[data-v-54ae70eb]{\n    width: 120px;\n    height: 36px;\n    line-height: 36px;\n    text-align: center;\n    background: #E5E5E5;\n    font-weight: 600;\n    font-size: 14px;\n    color: #666666;\n    cursor: pointer;\n    border-radius: 2px;\n    margin-top: 38px;\n    margin-right: 10px;\n}\n.message-info-box[data-v-54ae70eb]{\n    margin-top: 40px;\n    text-align: center;\n}\n.message-info-title[data-v-54ae70eb]{\n    font-family: PingFangSC-Regular;\n    font-size: 18px;\n    color: #333333;\n}\n.commodity-list-info img[data-v-54ae70eb]{\n  max-width: 100%;\n  max-height: 100%;\n  width: auto;\n  height: auto;\n}\n.commodity-list-info[data-v-54ae70eb]{\n  padding: 10px;\n}\n.commodity-info-header[data-v-54ae70eb]{\n  height: 50px;\n  line-height: 50px;\n  font-size: 16px;\n  color: #666666;\n  letter-spacing: 0;\n  padding-left: 10px;\n  border-bottom: 1px solid #EAEBED;\n}\n.commodity-info[data-v-54ae70eb]{\n  min-height: 635px;\n  height: auto;\n  margin-top: 21px;\n  background-color: #fff;\n  border-radius: 2px;\n}\n.none-cursor[data-v-54ae70eb]{\n  cursor: not-allowed!important;\n}\n.reduce[data-v-54ae70eb]{\n  display: block;\n  width: 22px;\n  height: 21px;\n  line-height: 21px;\n  text-align: center;\n  cursor: pointer;\n  background-color: #fafafa;\n  border-left: 1px solid #cccccc;\n}\n.plus[data-v-54ae70eb]{\n   display: block;\n   text-align: center;\n   height: 21px;\n   line-height: 21px;\n   cursor: pointer;\n   background-color: #fafafa;\n   border-left: 1px solid #cccccc;\n   border-bottom: 1px solid #cccccc;\n}\n.num-box input[data-v-54ae70eb]{\n  width: 50%;\n  height: 40px;\n  outline: none;\n  border: 0;\n  text-align: center;\n  padding-left: 10px;\n}\n.num-box[data-v-54ae70eb]{\n  width: 70px;\n  height: 44px;\n  border: 1px solid #CCCCCC;\n}\n.exchange--btn[data-v-54ae70eb]:hover{ color: #fff!important;\n}\n.exchange--btn[data-v-54ae70eb]{\n  display: inline-block;\n  width: 142px;\n  height: 44px;\n  line-height: 44px;\n  text-align: center;\n  background: #F25F5C;\n  font-weight: 600;\n  font-size: 18px;\n  color: #FFFFFF;\n  letter-spacing: 0;\n  cursor: pointer;\n  border-radius: 2px;\n}\n.exchange-box[data-v-54ae70eb]{\n  margin-top: 80px;\n  overflow: hidden;\n}\n.service-info[data-v-54ae70eb]{ margin-bottom: 24px;\n}\n.line-throughs[data-v-54ae70eb]{\n  text-decoration: line-through;\n  opacity: 0.99;\n  font-family: PingFangSC-Light;\n  font-size: 12px;\n  color: #999999;\n  letter-spacing: 0;\n}\n.score-small[data-v-54ae70eb]{ color: #F25F5C!important;\n}\n.big-score[data-v-54ae70eb]{\n  font-size: 24px;\n  color: #F25F5C;\n  letter-spacing: 0;\n}\n.price[data-v-54ae70eb]{\n  font-size: 12px;\n  color: #999999;\n  letter-spacing: 0;\n}\n.commodity-right-info[data-v-54ae70eb]{\n  font-size: 12px;\n  color: #F25F5C;\n  letter-spacing: 0;\n}\n.commodity-right-header[data-v-54ae70eb]{\n  width: 720px;\n  font-size: 16px;\n  color: #666666;\n  letter-spacing: 0;\n  font-weight: 600;\n  margin-bottom: 15px;\n}\n.commodity-right[data-v-54ae70eb]{\n  margin-top: 33px;\n}\n.commodity-left img[data-v-54ae70eb]{\n  max-width: 100%;\n  max-height: 100%;\n  width: auto;\n  height: auto;\n}\n.commodity-left[data-v-54ae70eb]{\n  width: 355px;\n  height: 355px;\n  text-align: center;\n  padding: 100px;\n  border: 1px solid #EEEEEE;\n  margin-top: 33px;\n  margin-left: 42px;\n  margin-right: 54px;\n}\n.commodity-box[data-v-54ae70eb]{\n  height: 438px;\n  background-color: #fff;\n  overflow: hidden;\n}\n"],sourceRoot:""}])},gusq:function(e,t,n){"use strict";function o(e){n("7ywP"),n("CY8Y")}Object.defineProperty(t,"__esModule",{value:!0});var a=n("SO+5"),i=n("6Ehs"),A=n("VU/8"),s=o,r=A(a.a,i.a,!1,s,"data-v-54ae70eb",null);t.default=r.exports}});
//# sourceMappingURL=8.dcec04d21431ee3f9bac.js.map