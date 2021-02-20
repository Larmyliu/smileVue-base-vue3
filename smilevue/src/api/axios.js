import axios from 'axios'
// import store from '../store/index';
// 创建axios实例
const instance = axios.create({
  baseURL:"http://localhost:3000", // api的base_url
  timeout: 20000,                 // 请求超时时间
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

// 拦截请求
instance.interceptors.request.use(config => {
  //  去除空
  const params = config.data
  for (const key in params) {
    if (params[key] === undefined || params[key] === '' || params[key] === null) {
      delete params[key]
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 拦截响应
instance.interceptors.response.use(res => {
  const {code, msg} = res.data
  if(code === 500){
    console.log(msg)
  }
  return res
}, error => {
  console.log(error)
  return Promise.reject(error)
})
export default instance