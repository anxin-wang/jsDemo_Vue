import fetch from '../config/fetch'

/**
 * 获取公告列表
 */

export const scoreLottery = (act,email,pwd) => fetch('/mapi2/index.php', {act: act,email:email,pwd: pwd}, 'POST', 'fetch' ,false);
export const uc_lottery = (act,id,email,pwd) => fetch('/mapi2/index.php', {act: act,id:id,email:email,pwd: pwd}, 'GET','fecth',false);
export const uc_center = (act) => fetch('/mapi2/index.php', {act: act}, 'POST','fecth',false);
