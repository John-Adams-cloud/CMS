import axios from 'axios'
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { JNRequestConfig, JNRequestInterceptors } from './type'

//定义创建axios实例的类
class JNRequest {
  //保存创建出的实例
  instance: AxiosInstance
  //保存创建实例时候自定义传入的拦截器
  interceptors?: JNRequestInterceptors
  constructor(config: JNRequestConfig) {
    //创建实例
    this.instance = axios.create(config)
    //保存创建实例传入的拦截器
    this.interceptors = config.interceptors
    //注册创建实例导入的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )
    //所有实例（全局)都会有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有的拦截器，请求成功')
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器，请求失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        console.log('所有实例都有的拦截器，响应成功')
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器，响应失败')
        return err
      }
    )
  }

  //request方法
  request(config: JNRequestConfig): void {
    if (config.interceptors?.requestInterceptors) {
      config = config.interceptors?.requestInterceptors(config)
    }
    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptors) {
        res = config.interceptors?.responseInterceptors(res)
      }
      console.log(res)
    })
  }
}
//导出可以创建axios的类
export default JNRequest
