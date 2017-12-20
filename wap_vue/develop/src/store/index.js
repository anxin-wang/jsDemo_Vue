/**
 * Created by Jacob on 2017/7/19.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*状态*/
const state = {
    infoLoading: true, //加载变量,true为隐藏,false为显示
    baseUrl: 'http://develop.jianguolicai.cn',
    loginName:1,
}
/*事件*/
const mutations = {
    showLoading (state) { //控制显示隐藏加载动画
        state.infoLoading ? state.infoLoading = false : state.infoLoading = true;
    },
    add(state,n){
        state.loginName += n
    },
    reduce(state){
        state.loginName -= 1
    }
}
/*过滤*/
const getters = {

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
})
