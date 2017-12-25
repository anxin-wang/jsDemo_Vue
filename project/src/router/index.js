const index = r => require.ensure([], () => r(require('../page/index/index')), 'index')
const test = r => require.ensure([], () => r(require('../page/test/test')), 'test')
const test2 = r => require.ensure([], () => r(require('../page/test/test2')), 'test')
const test3 = r => require.ensure([], () => r(require('../page/test/test3')), 'test')

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')

export default [{
  path: '/',
  component: index
},
  //首页城市列表页
  {
    path: '/test',
    component: test
  },{
    path: '/test2',
    component: test2
  },{
    path: '/test3',
    component: test3
  },{
    path: '/home',
    component: home
  }]

