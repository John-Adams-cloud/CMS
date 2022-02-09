import JNRequest from './request/index'
import { BASE_URL, TIME_OUT } from './request/config'

const jnRequest = new JNRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      return config
    },
    requestInterceptorsCatch: (err) => {
      return err
    },
    responseInterceptors: (config) => {
      return config
    },
    responseInterceptorsCatch: (err) => {
      return err
    }
  }
})
export default jnRequest
