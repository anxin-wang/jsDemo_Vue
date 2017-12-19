import {
  RECORD_ADDRESS,
  ADD_CART,
  REDUCE_CART,
  INIT_BUYCART,
  CLEAR_CART,
  RECORD_SHOPDETAIL,
  RECORD_USERINFO,
  GET_USERINFO,
  CONFIRM_REMARK,
  CONFIRM_INVOICE,
  CHOOSE_SEARCH_ADDRESS,
  SAVE_GEOHASH,
  CONFIRM_ADDRESS,
  CHOOSE_ADDRESS,
  NEED_VALIDATION,
  SAVE_CART_ID_SIG,
  SAVE_ORDER_PARAM,
  CHANGE_ORDER_PARAM,
  ORDER_SUCCESS,
  SAVE_SHOPID,
  SAVE_ORDER,
  OUT_LOGIN,
  RESET_NAME,
  SAVE_AVANDER,
  SAVE_ADDRESS,
  SAVE_ADDDETAIL,
  SAVE_QUESTION,
  ADD_ADDRESS,
  BUY_CART,
} from './mutation-types.js'

import {setStore, getStore} from '../config/tils'

export default {
  [RECORD_ADDRESS](state,{latitude,longitude}){
    state.latitude=latitude;
    state.longitude=longitude;

  },
  [RECORD_SHOPDETAIL](state,detail){
    state.shopDetail=detail;
  },
  [ADD_CART](state,{shop_id,category_id,item_id,food_id,name,price,specs,packing_fee,sku_id,stock}){
    let cart=state.cartList;
    let shop=cart[shop_id]=(cart[shop_id] || {});
    let category=shop[category_id]=(shop[category_id] || {});
    let item = category[item_id] = (category[item_id] || {});
    if(item[food_id]){
      item[food_id]['num']++
    }else{
      item[food_id]={
        "num":1,
        "id":food_id,
        "name":name,
        "price":price,
        "specs":specs,
        "packing_fee":packing_fee,
        "sku_id":sku_id,
        "stock":stock
      };
    }
    state.cartList={...cart};
    setStore('buyCart',state.cartList);
  },
  //减少某个食品
  [REDUCE_CART](state,{shop_id,category_id,item_id,food_id,name,price,spces}){
    let cart=state.cartList;
    let shop=(cart[shop_id]|| {});
    let category=(shop[category_id] || {});
    let item=(category[item_id] || {});
    if(item && item[food_id]){
      if(item[food_id]['num']>0){
        //商品数量大于0，减少数量
        item[food_id]['num']--;
        state.cartList={...cart};
        setStore('buyCart',state.cartList);
      }else{
        //商品数量为0，则清空当前商品的信息
        item[food_id]=null;
      }
    }
  },
  [INIT_BUYCART](state){
    let initCart=getStore('buyCart');
    if(initCart){
      state.cartList=JSON.parse(initCart);
    }
  },
  [CLEAR_CART](state){
    state.cartList[shop_id]=null;
    state.cartList={...state.cartList};
    setStore('buyCart',state.cartList);
  },
  [RECORD_USERINFO](state,info){
    state.userInfo=info;
    state.login=true;
    setStore("user_id",info.user_id);
  },
  [GET_USERINFO](state,info){
    //userInfo已存在且与info.username不同，返回
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return;
    };
    //如未登录
    if (!state.login) {
      return
    }
    if(!info.message){
      //这里与action相结合，如果返回的info中没有message,即没有错误信息，则赋值
      state.userInfo={...info};
    }else{
      state.userInfo=null;
    }
  },
  //确认订单页添加新的的地址
  [CONFIRM_ADDRESS](state, newAddress) {
    state.newAddress.push(newAddress);
  },
  //增加地址
  [ADD_ADDRESS](state, obj) {
    state.removeAddress = [obj, ...state.removeAddress];
  },
  //修改下单参数
  [CHANGE_ORDER_PARAM](state, newParam) {
    state.orderParam = Object.assign({}, state.orderParam, newParam);
  },
  //修改用户名
  [RESET_NAME](state,username) {
    state.userInfo = Object.assign({}, state.userInfo,{username})
  }

}
