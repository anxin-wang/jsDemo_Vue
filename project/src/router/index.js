const index = r => require.ensure([], () => r(require('../page/index/index')), 'index')
const test = r => require.ensure([], () => r(require('../page/test/test')), 'test')
const test2 = r => require.ensure([], () => r(require('../page/test/test2')), 'test')

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
  },]

