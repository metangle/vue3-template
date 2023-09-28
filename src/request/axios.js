import axios from 'axios'
import apiUrls from './api'
import { replaceApiUrlParams } from '@/util'
import { cloneDeep } from 'lodash'

const service = axios.create({
  baseURL: import.meta.env.VUE_APP_BASE_API,
  timeout: 10000
})

// Request
service.interceptors.request.use(
  async (config) => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    config.headers.token = sessionStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.error(error)
  }
)

// Response
service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response) //进行中
    } else {
      return Promise.reject(response) //失败
    }
  },
  // 服务器状态码不是200的情况
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          sessionStorage.clear()
          router.push('/login')
          break
        // 404请求不存在
        case 404:
          break
        // 其他错误，直接抛出错误提示
        default:
      }
      return Promise.reject(error.response)
    }
  }
)

// GET
function get(url, params = {}, headers = {}) {
  const attrs = cloneDeep(params)
  const { reqUrl, leftParams } = replaceApiUrlParams(url, attrs)
  // debugger
  return new Promise((resolve, reject) => {
    service({
      url: reqUrl,
      method: 'get',
      params: leftParams,
      headers
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// POST
function post(url, data = {}, headers = {}) {
  const attrs = cloneDeep(data)
  const { reqUrl, leftParams } = replaceApiUrlParams(url, data)
  return new Promise((resolve, reject) => {
    service({
      url: reqUrl,
      method: 'post',
      data: leftParams,
      headers
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// PUT
function put(url, data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'put',
      data,
      headers
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// DELETE
function del(url, data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'delete',
      data,
      headers
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  install: (app) => {
    app.config.globalProperties['$get'] = get
    app.config.globalProperties['$post'] = post
    app.config.globalProperties['$put'] = put
    app.config.globalProperties['$delete'] = del
    app.config.globalProperties['$api'] = apiUrls
    // debugger
  }
}
