import Vue from 'vue'
import Router from 'vue-router'
import '../assets/js/min/jquery-1.10.2.min'

Vue.use(Router)

/*

RtuenUrl:'/uc_center',
RtuenIcon:"ios-arrow-left",
RightText: 'ios-bell-outline',
RightShow: 1,
RightTextUrl: '/new',
Title: '个人中心',
ShowHead: 1,
Icon: 1,
ShowMenu: 1,
Rtuen: 1,
*/

let ua = navigator.userAgent.toLowerCase();
let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

if(ua.match(/MicroMessenger/i)=="micromessenger") {
    var WxShowHeader = 1

} else {
    var WxShowHeader = null
}

export default new Router({
    scrollBehavior (to, from, savedPosition) {
        return {x: 0, y: 0}
    },
    routes: [
        {
            path: '/',
            meta: {
                Title: '坚果理财', ShowMenu: 1,ShowHead: 1
            },
            component: (resolve) => require(['../views/index'], resolve)
        },
        {
            path: '/Invitation',
            meta: {
                Title: '邀请好友',ShowHead: 1,RtuenUrl:'/uc_center',RtuenIcon:"ios-arrow-left"
            },
            component: (resolve) => require(['../views/Invitation'], resolve)
        },
        {
          path: '/showPage/:title/:url',
          meta: {
            Title: 'showPage',Rtuen: 1,ShowHead: 1
          },
          component: (resolve) => require(['../views/home/show-page'], resolve)
        },
        {
            path: '/insurance',
            meta: {
                Title: '安全保障',Rtuen: 1,ShowHead: 1
            },
            component: (resolve) => require(['../views/insurance'], resolve)
        },
        {
            path: '/noticeItems',
            meta: {
                Title: '公告中心',Rtuen: 1,ShowHead: 1
            },
            component: (resolve) => require(['../views/notice-items'], resolve)
        },
        {
            path: '/noticeItemsInfo/:id',
            meta: {
                Title: '公告明细',Rtuen: 1,ShowHead: 1
            },
            component: (resolve) => require(['../views/notice-items-info'], resolve)
        },
        {
            path: '/activity',
            meta: {
                Title: '活动中心',Rtuen: 1,ShowHead: 1
            },
            component: (resolve) => require(['../views/activity'], resolve)
        },
        {
            path: '/disclaimer',
            meta: {
                Title: '免责声明',Rtuen: 1,ShowHead: 1
            },
            component: (resolve) => require(['../views/disclaimer'], resolve)
        },
        {
            path: '/activityInfo',
            meta: {
                Title: '活动详情',Rtuen: 1,ShowHead: 1
            },
            component: (resolve) => require(['../views/activity-info'], resolve)
        },
        {
            path: '/help',
            meta: {
                Title: '帮助中心',Rtuen: 1,ShowHead: WxShowHeader
            },
            component: (resolve) => require(['../views/help'], resolve)
        },
        {
            path: '/deals',
            component: (resolve) => require(['../ChildrenApp'], resolve),
            children: [
                {
                    path: '',
                    meta: {
                        Title: '投资', ShowMenu: 1,ShowHead: 1
                    },
                    component: (resolve) => require(['../views/deals'], resolve)
                },
                {
                    path: '/dealsItems/:title',
                    meta: {
                        Title: '项目详情',Rtuen: 1,ShowHead: 1, ShowMenu: 1
                    },
                    component: (resolve) => require(['../views/deals-item'], resolve)
                },
                {
                    path: '/dealsItemsInfo/:id',
                    meta: { Title: '投资详情',Rtuen: 1,ShowHead:1},
                    component: (resolve) => require(['../views/deals-item-info'], resolve)
                },
                {
                    path: '/proIntroduce',
                    meta: { Title: '项目介绍',Rtuen: 1,ShowHead:1},
                    component: (resolve) => require(['../views/pro-introduce'], resolve)
                },
                {
                    path: '/investors/:id',
                    meta: { Title: '投资人数',Rtuen: 1,ShowHead:1},
                    component: (resolve) => require(['../views/investors'], resolve)
                },
                {
                    path: '/contract/:id/:deal_sn',
                    meta: { Title: '电子合同',Rtuen: 1,ShowHead:1},
                    component: (resolve) => require(['../views/contract'], resolve)
                },
                {
                  path: '/disclaimer',
                  meta: { Title: '免责申明',Rtuen: 1,ShowHead:1},
                  component: (resolve) => require(['../views/home/disclaimer'], resolve)
                },
                {
                    path: '/investment/:id/:coupon_id?',
                    meta: { Title: '我要投资',Rtuen: 1,ShowHead:1,RightShow: 1,RightText: '充值',RightTextUrl: '/uc_recharge',RtuenUrl:'/deals',},
                    component: (resolve) => require(['../views/investment'], resolve)
                },
                {
                    path: '/useCoupon/:id/:cate_id/:repay_time/:repay_time_type',//
                    meta: { Title: '使用加息券',Rtuen: 1,ShowHead:1,RightShow: 1,RightText: '规则',RightTextUrl: '/couponRule'},
                    component: (resolve) => require(['../views/use_coupon'], resolve)
                },
                {
                    path: '/couponRule',
                    meta: { Title: '加息券规则',Rtuen: 1,ShowHead:1},
                    component: (resolve) => require(['../views/coupon-rule'], resolve)
                },
                {
                    path: '/investmentResult',
                    meta: { Title: '投资结果',Rtuen: 1,ShowHead:1},
                    component: (resolve) => require(['../views/investment-result'], resolve)
                },
                {
                    path: '*',
                    meta: {
                        Title: '投资', ShowMenu: 1,ShowHead: 1
                    },
                    component: (resolve) => require(['../views/deals'], resolve)
                },
            ]
        },
        {
            path: '/financial',
            component: (resolve) => require(['../ChildrenApp'], resolve),
            children:[
                {
                    path: '',
                    meta: {
                        Title: '理财师', ShowMenu: 1,ShowHead:1,RightShow: 1,RightText: '规则',RightTextUrl: '/fin_rule'
                    },
                    component: (resolve) => require(['../views/financial/index'], resolve)
                },
                {
                    path: '/user_info&name=:name&mobile=:mobile&subcount=:subcount&members=:members&individual=:individual',
                    meta: {
                        Title: '邀请人信息', ShowHead: 1, Rtuen: 1
                    },
                    component: (resolve) => require(['../views/financial/user_info'], resolve)
                },
                {
                    path: '/deal_total&name=:name&mobile=:mobile&subcount=:subcount&members=:members&individual=:individual',
                    meta: {
                        Title: '理财师', ShowHead: 1, Rtuen: 1
                    },
                    component: (resolve) => require(['../views/financial/deal_total'], resolve)
                },
                {
                    path: '/fin_rule',
                    meta: {
                        Title: '规则',
                    },
                    component: (resolve) => require(['../views/financial/fin_rule'], resolve)
                },
                {
                    path: '*',
                    meta: {
                        Title: '理财师', ShowMenu: 1,ShowHead:1,RightShow: 1,RightText: '规则',RightTextUrl: '/fin_rule'
                    },
                    component: (resolve) => require(['../views/financial/index'], resolve)
                }
            ]
        },
        {
            path: '/find',
            component: (resolve) => require(['../ChildrenApp'], resolve),
            children: [
                {
                    path: '',
                    meta: {
                        Title: '发现', ShowHead: 1, ShowMenu: 1
                    },
                    component: (resolve) => require(['../views/find.vue'], resolve)
                },
                {
                    path: '/about',
                    meta: {Title: '关于我们', ShowHead: 1, Rtuen: 1},
                    component: (resolve) => require(['../views/find/about.vue'], resolve)
                },
                {
                    path: '/financing_school',
                    meta: {Title: '理财学堂', ShowHead: 1, Rtuen: 1},
                    component: (resolve) => require(['../views/find/financing_school.vue'], resolve)
                },
                {
                    path: '/mall_index/:user_name?/:user_pwd?',
                    meta: {Title: '积分商城', ShowHead: WxShowHeader, RtuenUrl:'/find',RtuenIcon:"ios-arrow-left"},
                    component: (resolve) => require(['../views/find/mall_index.vue'], resolve)
                },
                {
                    path: '/sliderCont',
                    meta: {Title: '坚果理财', ShowHead: WxShowHeader, Rtuen: WxShowHeader},
                    component: (resolve) => require(['../components/mall/iframeUrl.vue'], resolve)
                },
                {
                    path: '/noticelist',
                    meta: {Title: '公告列表', ShowHead: WxShowHeader, Rtuen: WxShowHeader},
                    component: (resolve) => require(['../views/find/mall/noticeList.vue'], resolve)
                },
                {
                    path: '/noticeInfo/:info?',
                    meta: {Title: '公告信息', ShowHead: WxShowHeader, Rtuen: WxShowHeader},
                    component: (resolve) => require(['../views/find/mall/noticeInfo.vue'], resolve)
                },
                {
                    path: '/infoGoods/:goodsId?',
                    meta: {Title: '商品信息', ShowHead: WxShowHeader, RtuenUrl:'/mall_index',RtuenIcon:"ios-arrow-left"},
                    component: (resolve) => require(['../views/find/mall/infoGoods.vue'], resolve)
                },
                {
                    path: '/integralMe',
                    meta: {Title: '我的积分', ShowHead: WxShowHeader, Rtuen: 1},
                    component: (resolve) => require(['../views/find/mall/integralMe.vue'], resolve)
                },
                {
                    path: '/infoPer/:userId',
                    meta: {Title: '修改个人信息', ShowHead: WxShowHeader, Rtuen: WxShowHeader},
                    component: (resolve) => require(['../views/find/mall/infoPer.vue'], resolve)
                },
                {
                    path: '/detailsIntegral',
                    meta: {Title: '积分详情', ShowHead: WxShowHeader, Rtuen: WxShowHeader},
                    component: (resolve) => require(['../views/find/mall/detailsIntegral.vue'], resolve)
                },
                {
                    path: '/recordExchange/:code?',
                    meta: {Title: '兑换记录', ShowHead: WxShowHeader, RtuenUrl:'/mall_index',RtuenIcon:"ios-arrow-left"},
                    component: (resolve) => require(['../views/find/mall/recordExchange.vue'], resolve)
                },
                {
                    path: '/detailsOrder/:goodsId?',
                    meta: {Title: '订单详情', ShowHead: WxShowHeader, Rtuen: WxShowHeader},
                    component: (resolve) => require(['../views/find/mall/detailsOrder.vue'], resolve)
                },
                {
                    path: '/verifyCancelOrdre/:ordreId?/:CanceCode?',
                    meta: {Title: '图形验证', ShowHead: WxShowHeader, Rtuen: WxShowHeader},
                    component: (resolve) => require(['../views/find/mall/verifyCancelOrdre.vue'], resolve)
                },
                {
                    path: '/CancelOrdre/:ordreId?/:CanceCode?',
                    meta: {Title: '取消订单', ShowHead: WxShowHeader, Rtuen: WxShowHeader},
                    component: (resolve) => require(['../views/find/mall/CancelOrdre.vue'], resolve)
                },
                {
                    path: '/orderSubmit/:goodsId?/:num?/:adr?',
                    meta: {Title: '提交订单', ShowHead: WxShowHeader, RtuenUrl:'/infoGoods',RtuenIcon:"ios-arrow-left"},
                    component: (resolve) => require(['../views/find/mall/orderSubmit.vue'], resolve)
                },
                {
                    path: '/addressList/:goodsId?/:num?',
                    meta: {Title: '收货地址', ShowHead: WxShowHeader, RtuenUrl:'/orderSubmit',RtuenIcon:"ios-arrow-left"},
                    component: (resolve) => require(['../views/find/mall/addressList.vue'], resolve)
                },
                {
                    path: '/addAddress/:goodsId?/:num?',
                    meta: {Title: '新增收货地址', ShowHead: WxShowHeader, Rtuen: WxShowHeader},
                    component: (resolve) => require(['../views/find/mall/addAddress.vue'], resolve)
                },
                {
                    path: '/editAddress/:goodsId?/:num?/:id?/',
                    meta: {Title: '编辑收货地址', ShowHead: WxShowHeader, Rtuen: WxShowHeader},
                    component: (resolve) => require(['../views/find/mall/editAddress.vue'], resolve)
                },
                {
                    path: '/ruleIntegral',
                    meta: {Title: '积分规则', ShowHead: WxShowHeader, Rtuen: WxShowHeader},
                    component: (resolve) => require(['../views/find/mall/ruleIntegral.vue'], resolve)
                },
                {
                    path: '/luckActivity',
                    meta: {Title: '坚果抽奖活动', ShowHead: WxShowHeader, Rtuen: WxShowHeader},
                    component: (resolve) => require(['../views/find/draw/luckActivity.vue'], resolve)
                },
                {
                    path: '/draw_index',
                    meta: {Title: '活动抽奖', ShowHead: WxShowHeader, Rtuen: WxShowHeader},
                    component: (resolve) => require(['../views/find/draw/luckDraw.vue'], resolve)
                },
                {
                    path: '/turntable',
                    meta: {Title: '转盘', ShowHead: WxShowHeader, Rtuen: WxShowHeader},
                    component: (resolve) => require(['../views/find/draw/turntable.vue'], resolve)
                },
                {
                    path: '/turntable2',
                    meta: {Title: '转盘2', ShowHead: WxShowHeader, Rtuen: WxShowHeader},
                    component: (resolve) => require(['../views/find/draw/turntable2.vue'], resolve)
                },
                {
                    path: '/feedback',
                    meta: {Title: '反馈意见', ShowHead: 1, Rtuen: 1},
                    component: (resolve) => require(['../views/find/feedback.vue'], resolve)
                },
                {
                    path: '/school_content',
                    meta: {Title: '理财学堂', ShowHead: 1, Rtuen: 1},
                    component: (resolve) => require(['../views/find/school.vue'], resolve)
                },
                {
                    path: '*',
                    meta: {
                        Title: '发现', ShowHead: 1, ShowMenu: 1
                    },
                    component: (resolve) => require(['../views/find.vue'], resolve)
                }
            ]
        },
        {
            path: '/uc_center',
            component: (resolve) => require(['../ChildrenApp'], resolve),
            children: [
                {
                    path: '',
                    meta: {
                        Title: '我的', ShowMenu: 1
                    },
                    component: (resolve) => require(['../views/uc/uc_center'], resolve)
                },
                {
                    path: '/uc_recharge',
                    meta: { Title: '充值',Rtuen: 1,ShowHead:1},
                    component: (resolve) => require(['../views/uc/uc_recharge'], resolve)
                },
                {
                    path: '/uc_api_rechargesdk',
                    meta: { Title: '富友',Rtuen: 1,ShowHead:1},
                    component: (resolve) => require(['../views/uc/uc_api_rechargesdk'], resolve)
                },
                {
                    path: '/uc_money_carry',
                    meta: { Title: '提现',Rtuen: 1,ShowHead:1},
                    component: (resolve) => require(['../views/uc/uc_money_carry'], resolve)
                },
                {
                    path: '/red_packets',
                    meta: {
                        Title: '红包',ShowHead: 1, Rtuen: 1
                    },
                    component: (resolve) => require(['../views/uc/uc_red_packets'], resolve)
                },
                {
                    path: '/authentication',
                    meta: {
                        Title: '实名认证',ShowHead: 1, Rtuen: 1
                    },
                    component: (resolve) => require(['../views/uc/uc_authentication'], resolve)
                },
                {
                    path: '/uc_invest',
                    meta: {
                        Title: '投资记录',Rtuen: 1,ShowHead: 1,RtuenUrl:'/uc_center',RtuenIcon:"ios-arrow-left"
                    },
                    component: (resolve) => require(['../views/uc/uc_invest.vue'], resolve)
                },
                {
                    path: '/invest_details',
                    meta: {
                        Title: '投资详情',ShowHead: 1,Rtuen: 1,
                    },
                    component: (resolve) => require(['../views/uc/invest_details.vue'], resolve)
                },
                {
                    path: '/uc_ips_carry',
                    meta: {
                        Title: '资金记录', Rtuen: 1,ShowHead: 1,RtuenUrl:'/uc_center',RtuenIcon:"ios-arrow-left"
                    },
                    component: (resolve) => require(['../views/uc/uc_ips_carry.vue'], resolve)
                },
                {
                    path: '/uc_bank',
                    meta: {
                        Title: '银行卡',Rtuen: 1,ShowHead: 1, RtuenUrl:'/uc_center',RtuenIcon:"ios-arrow-left"
                    },
                    component: (resolve) => require(['../views/uc/uc_bank.vue'], resolve)
                },
                {
                    path: '/uc_getpassword',
                    meta: {
                        Title: '修改密码',ShowHead: 1, Rtuen: 1
                    },
                    component: (resolve) => require(['../views/uc/uc_getpassword.vue'], resolve)
                },
                {
                    path: '/uc_getInvitation',
                    meta: {
                        Title: '修改邀请码',ShowHead: 1, Rtuen: 1
                    },
                    component: (resolve) => require(['../views/uc/uc_getInvitation.vue'], resolve)
                },
                {
                    path: '/uc_account',
                    meta: {
                        Title: '账户设置',ShowHead: 1, Rtuen: 1
                    },
                    component: (resolve) => require(['../views/uc/uc_account.vue'], resolve)
                },
                {
                    path: '/uc_binding',
                    meta: {
                        Title: '绑定托管账户',ShowHead: 1, Rtuen: 1
                    },
                    component: (resolve) => require(['../views/uc/uc_binding.vue'], resolve)
                },
                {
                    path: '/uc_fuiou_passwd',
                    meta: {
                        Title: '设置密码',ShowHead: 1, Rtuen: 1
                    },
                    component: (resolve) => require(['../views/uc/uc_fuiou_passwd.vue'], resolve)
                },
                {
                    path: '/uc_coupon',
                    meta: {
                        Title: '我的卡券',Rtuen: 1,ShowHead: 1,RtuenUrl:'/uc_center',
                        RightText: '规则',
                        RightShow: 1,
                        RightTextUrl: '/couponRule',
                    },
                    component: (resolve) => require(['../views/uc/uc_coupon.vue'], resolve),
                },
                {
                    path: '*',
                    meta: {
                        Title: '我的', ShowMenu: 1
                    },
                    component: (resolve) => require(['../views/uc/uc_center.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            meta: {
                Title: '登录',Rtuen: 1,ShowHead: 1
            },
            component: (resolve) => require(['../views/user/user_login'], resolve)
        },
        {
            path: '/register',
            meta: {
                Title: '注册',Rtuen: 1,ShowHead: 1
            },
            component: (resolve) => require(['../views/user/user_register'], resolve)
        },
        {
            path: '/register_share/:code?/:mobile?',
            meta: {
                Title: '注册坚果理财'
            },
            component: (resolve) => require(['../views/user/uc_register_share.vue'], resolve)
        },
        {
            path: '/getpassword',
            meta: {
                Title: '忘记密码',Rtuen: 1,ShowHead: 1
            },
            component: (resolve) => require(['../views/user/user_getpassword'], resolve)
        },
        /*{
          path: '/finishpwd/:phone/:code',
          meta: {
            Title: '找回密码',Rtuen: 1,ShowHead: 1
          },
          component: (resolve) => require(['../views/user/user_finish_pwd.vue'], resolve)
        },*/
        {
            path: '/iframe_html',
            meta: {
            },
            component: (resolve) => require(['../components/IframeHtml'], resolve)
        }
    ]
})

