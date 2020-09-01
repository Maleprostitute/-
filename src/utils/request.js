import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
axios.interceptors.response.use(response => {
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    router.push('/login')
    Toast.fail('登入信息失效')
  }
  return response
})
