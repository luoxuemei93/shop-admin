// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios'
// 配置请求的跟路径
const baseIPPortUrl = "http://127.0.0.1:3000"
axios.defaults.baseURL = baseIPPortUrl+'/api/'
axios.defaults.baseImgURL = baseIPPortUrl+'/images/'
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
// 在 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
export default axios