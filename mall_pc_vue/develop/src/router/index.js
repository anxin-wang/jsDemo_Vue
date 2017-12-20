import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    scrollBehavior (to, from, savedPosition) {
      return {x: 0, y: 0}
   },
  routes: [
    {
      path: '/orderDetails/:id', //订单详情
      name: 'orderDetails',
      component: (resolve) => require(['@/page/order/order-details'], resolve)
    },
    {
      path: '/record', //兑换记录
      name: 'record',
      component: (resolve) => require(['@/page/mine/record'], resolve)
    },
    {
      path: '/integralDetails/:name/:status', //积分明细
      name: 'integralDetails',
      component: (resolve) => require(['@/page/mine/integral-details'], resolve)
    },
    {
      path: '/rule', //积分规则
      name: 'rule',
      component: (resolve) => require(['@/page/mine/rule'], resolve)
    },
    {
      path: '/confirm/:id/:num/:score/:adr', //订单确认
      name: 'confirm',
      component: (resolve) => require(['@/page/order/confirm'], resolve)
    },
    {
      path: '/details/:id', //商品详情
      name: 'details',
      component: (resolve) => require(['@/page/commodity/details'], resolve)
    },
    {
        path: '/perfectData',//完善个人资料
        name: 'perfectData',
        component: (resolve) => require(['@/page/mine/perfect-data'], resolve)
    },
    {
        path: '/mine',//我的
        name: 'mine',
        component: (resolve) => require(['@/page/mine/mine'], resolve)
    },
    {
        path: '/luckDraw',//抽奖
        name: 'luckDraw',
        component: (resolve) => require(['@/page/activity/luckDraw/luckDraw'], resolve)
    },
    {
      path: '/test',//
      component: (resolve) => require(['@/page/activity/luckDraw/test'], resolve)
    },
    {
      path: '/',//积分商城首页(PC端)
      name: 'home',
      component: (resolve) => require(['@/page/index'], resolve)
    }
  ]
})
