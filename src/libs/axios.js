import axios from 'axios'
// import store from '@/store'
// import { Spin } from 'iview'
// const addErrorLog = errorInfo => {
//   const { statusText, status, request: { responseURL } } = errorInfo
//   let info = {
//     type: 'ajax',
//     code: status,
//     mes: statusText,
//     url: responseURL
//   }
//   if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
// }

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  // getInsideConfig () {
  //   const config = {
  //     baseURL: this.baseUrl,
  //     headers: {
  //       //
  //     }
  //   }
  //   return config
  // }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  // interceptors (instance, url) {
  //   // console.log(url)
  //   // 请求拦截
  //   instance.interceptors.request.use(config => {
  //     // 添加全局的loading...
  //     if (!Object.keys(this.queue).length) {
  //       // Spin.show() // 不建议开启，因为界面不友好
  //     }
  //     this.queue[url] = true
  //     return config
  //   }, error => {
  //     return Promise.reject(error)
  //   })
  //   // 响应拦截
  //   instance.interceptors.response.use(res => {
  //     this.destroy(url)
  //     const { data, status } = res
  //     return { data, status }
  //   }, error => {
  //     this.destroy(url)
  //     let errorInfo = error.response
  //     if (!errorInfo) {
  //       const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
  //       errorInfo = {
  //         statusText,
  //         status,
  //         request: { responseURL: config.url }
  //       }
  //     }
  //     addErrorLog(errorInfo)
  //     return Promise.reject(error)
  //   })
  // }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
    // 20007和20008是后台接口返回的错误码
      if (res.data.code === 20007 || res.data.code === 20008) {
        // 说明 token 验证失败
        // 可以直接跳转到登录页面，重新登录获取 token
        location.href = Url[0].path
      }
      this.destroy(url)
      return res.data
    }, error => {
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
