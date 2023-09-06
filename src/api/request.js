import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VUE_APP_BASE_API,
  timeout: 10000
})

// Request
service.interceptors.request.use(
  (config) => {
    // 设置请求头
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // handle error
    console.log('[request error]: ' + error) // TODO: handle error
    return Promise.reject(error)
  }
)

// GET
export function get(url, params = {}, headers = {}) {
  return service({
    url: url,
    method: 'get',
    params,
    headers
  })
}

// POST
export function post(url, data = {}, headers = {}) {
  return service({
    url: url,
    method: 'post',
    data,
    headers
  })
}

// PUT
export function put(url, data = {}, headers = {}) {
  return service({
    url: url,
    method: 'put',
    data,
    headers
  })
}

// DELETE
export function del(url, data = {}, headers = {}) {
  return service({
    url: url,
    method: 'delete',
    data,
    headers
  })
}
