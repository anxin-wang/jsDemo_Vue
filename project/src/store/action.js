import {getUser, getAddressList} from '../service/getData'
import {GET_USERINFO, SAVE_ADDRESS} from './mutation-types.js'

export default {
  async getUserInfo({commit}){
    let res=await getUser();
    console.log('------------')
    console.log(res)
    commit("GET_USERINFO",res);
  }
}
