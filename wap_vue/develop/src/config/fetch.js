import axios from 'axios'
import { Base64 } from 'js-base64'
import { Indicator } from 'mint-ui'

export default (url = '', data = {}, type = 'GET', method = 'fetch') =>{
  type = type.toUpperCase();

  //处理参数
  let formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key,data[key])
  })

  var obj = [];

  return new Promise((resolve, reject) => {
    if (type == 'GET') {
      Indicator.open({ spinnerType: 'fading-circle' })
      axios.get(url,{params: data}).then(response => {
        if(typeof (response.data) == 'string'){
            var res = JSON.parse(Base64.decode(response.data))
        }else{
            var res = response.data
        }
        Indicator.close()
        resolve(res)
      }).catch(response => {
        reject(response)
      })
    }
    else if (type == 'POST') {
      Indicator.open({ spinnerType: 'fading-circle' })
      axios.post(url,formData).then(response => {
          let res = JSON.parse(Base64.decode(response.data));
          Indicator.close()
          resolve(res)
        })
        .catch(response => {
          reject(response)
        })
    }
  })
}
