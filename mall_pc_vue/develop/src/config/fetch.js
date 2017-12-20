import axios from 'axios'
import { Base64 } from 'js-base64'
import { Spin } from 'iview'

export default (url = '', data = {}, type = 'GET', method = 'fetch',noResponseCode = true) =>{
  type = type.toUpperCase();

  //处理参数
  let formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key,data[key])
  })

  var obj = [];


  return new Promise((resolve, reject) => {
    if (type == 'GET') {
      Spin.show();
      axios.get(url,{params: data}).then(response => {
        let res = JSON.parse(Base64.decode(response.data));
        Spin.hide();
        if(noResponseCode){
        if(res.response_code == 1){
          let obj =  res
          resolve(obj)
        }else{
          reject(res)
        }}
        //无需responseCode的情况
        else{
          obj =  res
          resolve(obj)
        }

      }).catch(response => {
        reject(response)
      })
    }
    else if (type == 'POST') {
      Spin.show();
      axios.post(url,formData).then(response => {
          let res = JSON.parse(Base64.decode(response.data));
          Spin.hide();
          //需要responseCode == 1的情况
          if(noResponseCode){
            if(res.response_code == 1){
              obj =  res
              resolve(obj)
            }else{
              reject(res)
            }
          }
          //无需responseCode的情况
          else{
            obj =  res
            resolve(obj)
          }

        })
        .catch(response => {
          reject(response)
        })
    }
  })














}
