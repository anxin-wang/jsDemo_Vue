import fetch from '../config/fetch'
import { Toast } from 'mint-ui'
/*积分商城 账号密码*/
const name = window.storeWithExpiration.get('MallUserName')
const pws = window.storeWithExpiration.get('MallUserPwd')

/*wap 账号密码*/
const wapName = window.storeWithExpiration.get('user_name')
const wapPwd = window.storeWithExpiration.get('user_pwd')

var user_name = name
var user_pwd = pws
var mapiUrl = '/mapi2/index.php?'

/**
 * wxWap
 * 获取公告列表
 */
export const noticeItems = (num) => fetch(mapiUrl, {
    act:'article_list',
    act_2:'announcement',
    page: num
}, 'POST')
/**
 * wxWap
 * 获取个人信息
 */
export const ucEnter = (userName,userPwd) => fetch(mapiUrl, {
    email:userName,
    pwd:userPwd,
    act:'uc_center',
}, 'POST')
/**
 * wxWap
 * 获取个人信息的投资记录
 */
export const ucIpsinvest = (userName,userPwd,num,page) => fetch(mapiUrl, {
    email:userName,
    pwd:userPwd,
    act:'uc_invest',
    page:page,
    status:num,
}, 'POST')
/**
 * wxWap
 * 获取个人信息的投资记录详情
 */
export const ucDealMobile = (userName,userPwd,num) => fetch(mapiUrl, {
    email:userName,
    pwd:userPwd,
    act:'deal_mobile',
    id:num,
}, 'POST')
/**
 * wxWap
 * 获取个人信息的资金记录
 */
export const ucIpsCarry = (userName,userPwd,page) => fetch(mapiUrl, {
    email:userName,
    pwd:userPwd,
    act:'uc_funds_log',
    page:page,
}, 'POST')
/**
 * wxWap
 * 获取个人信息的银行卡
 */
export const ucBank = (userName,userPwd,page) => fetch(mapiUrl, {
    email:userName,
    pwd:userPwd,
    act:'uc_bank',
    page:page,
}, 'POST')
/**
 * wxWap
 * 获取更换银行卡
 */
export const ucThirdBankCartnumber = (userName,userPwd,page) => fetch(mapiUrl, {
    email:userName,
    pwd:userPwd,
    act:'uc_third_bank_cartnumber',
    page:page,
}, 'POST')
/**
 * wxWap
 * 获取更换手机号码
 */
export const ucThirdBank = (userName,userPwd,page) => fetch(mapiUrl, {
    email:userName,
    pwd:userPwd,
    act:'uc_third_bank',
    page:page,
}, 'POST')
/**
 * wxWap
 * 获取个人信息的加息券
 */
export const ucCoupon = (userName,userPwd,num,page) => fetch(mapiUrl, {
    email:userName,
    pwd:userPwd,
    act:'uc_coupon',
    page:page,
    coupon_user_status:num,
}, 'POST')
/**
 * wxWap
 * 投资页面获取个人信息的加息券
 */
export const ucCouponInvestment = (userName,userPwd,page,cate_id,repay_time,repay_time_type) => fetch(mapiUrl, {
  email:userName,
  pwd:userPwd,
  act:'uc_coupon',
  coupon_user_status:'0',
  cate_id:cate_id,
  repay_time:repay_time,
  repay_time_type:repay_time_type,
  page:page
}, 'POST')
/**
 * wxWap
 * 退出登录
 */
export const ucLoginOut = () => fetch(mapiUrl, {
    act:'loginout',
}, 'POST')
/**
 * wxWap
 * 登录
 */
export const ucLogin = () => fetch(mapiUrl, {
    act:'login',
}, 'POST')







/*==========积分商城 接口=========*/

/**
 * mall
 * 积分获得列表
 */
export const integraList = (num) => fetch(mapiUrl, {
    act:'uc_goods_order',
    email:user_name,
    pwd:user_pwd,
    page:num,
    mode:1,
    start_time: '0',
    end_time: '0',
}, 'GET')
/**
 * mall
 * 获取坚果好物商品列表
 */
export const preferred = (num) => fetch(mapiUrl, {
    act: 'goodslists',
    cate_id: null,
    is_recommend: 1,
    page: null,
    score: null,
    market_price: null,
    add_time: null
}, 'GET')
/**
 * mall
 * 获取商品列表
 */
export const commodityList = (cateId,mark,pageCode,scoreCode,priceCode,timeCode) => fetch(mapiUrl, {
    act: 'goodslists',
    cate_id: cateId,   //商品分类
    is_recommend: mark, //1：推荐商品
    page: pageCode,
    score: scoreCode,        //积分排序
    market_price: priceCode,  //价格
    add_time: timeCode      //时间
}, 'GET')
/**
 * mall
 * 获取商品分类列表
 */
export const goodsCate = () => fetch(mapiUrl, {
    act: 'goodslists',
    act_2: 'get_goods_cate',
}, 'GET')
/**
 * mall
 * 获取商品详情
 */
export const goodsOrder = (num,mode) => fetch(mapiUrl, {
    act: 'uc_goods_order',
    email:user_name,
    pwd:user_pwd,
    page: num,
    mode: mode,
    start_time: '0',
    end_time: '0',
}, 'GET')
/**
 * mall
 * 获取积分详情列表
 */
export const scoreLogs = (num,status) => fetch(mapiUrl, {
    email:user_name,
    pwd:user_pwd,
    act: 'uc_score_logs',
    status: status,
    page: num,
}, 'GET')
/**
 * mall
 * 获取我的积分信息
 */
export const ucScore = () => fetch(mapiUrl, {
    email:user_name,
    pwd:user_pwd,
    act: 'uc_score',
    r_type: '1',
}, 'GET')
/**
 * mall
 * 获取商品详情
 */
export const goodsDetails = (goodsId) => fetch(mapiUrl, {
    act: 'goodslists',
    act_2: 'detail',
    id:goodsId,
}, 'GET')
/**
 * mall
 * 客服电话
 */
export const servicePhone = () => fetch(mapiUrl, {
    act: 'app_company_information',
    r_type: 1,
}, 'GET')
/**
 * mall
 * 兑换商品信息
 */
export const goodsExchange = (goodsId,num,addressId) => fetch(mapiUrl, {
    email:user_name,
    pwd:user_pwd,
    act: 'uc_goods_order',
    act_2: 'exchange',
    goods_id: goodsId,
    number: num,
    address_id: addressId,
}, 'GET')
/**
 * mall
 * 提交订单
 */
export const orderSubmit = (goodsId,num,addressId) => fetch(mapiUrl, {
    email:user_name,
    pwd:user_pwd,
    act: 'uc_goods_order',
    act_2: 'order_submit',
    goods_id: goodsId,
    number: num,
    address_id: addressId,
}, 'GET')
/**
 * mall
 * 订单详情
 */
export const orderDetails = (id) => fetch(mapiUrl, {
    email:user_name,
    pwd:user_pwd,
    act: 'uc_goods_order',
    act_2: 'order_detail',
    id: id,
}, 'GET')
/**
 * mall
 * 添加收货地址
 */
export const addressList = (pageNum,goodsId,num) => fetch(mapiUrl, {
    email:user_name,
    pwd:user_pwd,
    act: 'uc_user_address',
    page: pageNum,
    goods_id:goodsId,/*商品ID*/
    number: num,/*兑换数量*/
}, 'GET')
/**
 * mall
 * 添加收货地址和编辑
 */
export const addAddress = (adsid,name,Gender,mobile,address,addressName,addressVal,zipcode,isDefault) => fetch(mapiUrl, {
    email:user_name,
    pwd:user_pwd,
    act: 'uc_user_address',
    act_2: 'save',
    id: adsid,
    user_name: name,/*姓名*/
    user_sex: Gender,/*性别*/
    user_phone: mobile,/*手机*/
    user_address: address,/*地址*/
    user_provinces_cities: addressName,/*省市区*/
    user_provinces_cities_id: addressVal,/*省市区 id*/
    user_zip_code: zipcode,/*用户邮编*/
    is_default: isDefault,/*是否默认*/
}, 'GET')
/**
 * mall
 * 收货地址信息
 */
export const AddressInfo = (id) => fetch(mapiUrl, {
    email:user_name,
    pwd:user_pwd,
    act: 'uc_user_address',
    act_2: 'detail',
    id: id
}, 'GET')
/**
 * mall
 * 删除收货地址信息
 */
export const delAddressInfo = (id) => fetch(mapiUrl, {
    email:user_name,
    pwd:user_pwd,
    act: 'uc_user_address',
    act_2: 'del',
    id: id
}, 'GET')
