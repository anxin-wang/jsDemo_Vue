import axios from 'axios'
import { Base64 } from 'js-base64'
// import { Spin } from 'iview'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://cangdu.org:8001';
let baseUrl = 'http://cangdu.org:8001';

// export default (url = '', data = {}, type = 'GET') =>{
//   type = type.toUpperCase();
//   url=baseUrl+url;
//
//   //处理参数
//   let formData = new FormData();
//   Object.keys(data).forEach(key => {
//     formData.append(key,data[key])
//   })
//
//   var obj = [];
//
//
//   return new Promise((resolve, reject) => {
//     if (type == 'GET') {
//       // Spin.show();
//       axios.get(url,{params: data}).then(response => {
//         // let res = JSON.parse(Base64.decode(response.data));
//         let res = response.data;
//         // Spin.hide();
//         resolve(res)
//       }).catch(response => {
//         reject(response)
//       })
//     }
//     else if (type == 'POST') {
//       // Spin.show();
//       axios.post(url,formData).then(response => {
//           // let res = JSON.parse(Base64.decode(response.data));
//           let res = response.data;
//           // Spin.hide();
//           //需要responseCode == 1的情况
//           if(noResponseCode){
//             if(res.response_code == 1){
//               obj =  res
//               resolve(obj)
//             }else{
//               reject(res)
//             }
//           }
//           //无需responseCode的情况
//           else{
//             obj =  res
//             resolve(obj)
//           }
//
//         })
//         .catch(response => {
//           reject(response)
//         })
//     }
//   })
//
// }
//

function checkStatus(response,resolve,reject) {
  if (response) {
    // 如果状态正常，则直接返回数据
   // if(response.code === 1 ){
      resolve(response.data)
   // }
    // 异常状态下，把错误信息返回去
    // else {
    //   reject(response)
    // }
  }else{
    reject(response)
  }
}



export default (url = '', data = {}, type = 'GET') =>{
  type = type.toUpperCase();
  url=baseUrl+url;

  //处理参数
  let formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key,data[key])
  })

  var obj = [];


  return new Promise((resolve, reject) => {
    if (type == 'GET') {
      // Spin.show();
      axios.get(url,{params: data}).then(response => {
        checkStatus(response,resolve,reject)
      }).catch(response => {
        reject(response)
      })
    }
    else if (type == 'POST') {
      // Spin.show();
      axios.post(url,formData).then(response => {
        checkStatus(response,resolve,reject)
      }).catch(response => {
        reject(response)
      })
    }
  })

}
