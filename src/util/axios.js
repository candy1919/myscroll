import axios from 'axios'
import Qs from 'qs'
// import { baseUrl } from '../config'
var baseUrl = 'http://xingrongjinfu.iask.in:8886/zndai/'
// axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'
function fetch (url, params) {
  return new Promise((resolve, reject) => {
    // params
    axios.post(baseUrl + url,Qs.stringify(params),{
       headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
       }
    }).then(function (response) {
      resolve(response.data)
    }).catch(function (error) {
      reject(error)
    })
  })
}
export const getUser = (params) => {
  return fetch('capital/login',{params})
}