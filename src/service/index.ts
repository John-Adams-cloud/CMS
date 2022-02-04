import JNRequest from './request/index'
import { BASE_URL, TIME_OUT } from './request/config'

const jnRequest = new JNRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorsCatch: (err) => {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptors: (config) => {
      console.log('响应成功的拦截')
      return config
    },
    responseInterceptorsCatch: (err) => {
      console.log('响应失败的拦截')
      return err
    }
  }
})
export default jnRequest
