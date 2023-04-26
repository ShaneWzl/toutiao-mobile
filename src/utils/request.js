import axios from 'axios'
import store from '@/store/index.js'
axios.defaults.baseURL = 'http://toutiao.itheima.net'


axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = `Bearer ${store.state.user.token}`
    console.log(config)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  })

export default axios