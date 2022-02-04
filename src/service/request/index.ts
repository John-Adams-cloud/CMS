import axios from 'axios'
import { AxiosInstance } from 'axios'
import { JNRequestConfig, JNRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'

const DEFAULT_LOADING = true
//定义创建axios实例的类
class JNRequest {
  //保存创建出的实例
  instance: AxiosInstance
  loading?: any
  showLoading?: boolean
  //保存创建实例时候自定义传入的拦截器
  interceptors?: JNRequestInterceptors
  constructor(config: JNRequestConfig) {
    //创建实例
    this.instance = axios.create(config)
    //此变量可手动控制loading的显示
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
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
    //注册所有实例（全局)都会有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading === true) {
          this.loading = ElLoading.service({
            lock: true,
            text: '客官请稍等~',
            background: 'rgba(0,0,0,0.1)'
          })
        }

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
        this.loading?.close()
        console.log('所有实例都有的拦截器，响应成功')
        return config.data
      },
      (err) => {
        this.loading?.close()
        console.log('所有实例都有的拦截器，响应失败')
        return err
      }
    )
  }

  //request方法
  request<T>(config: JNRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors?.requestInterceptors(config)
      }
      if (config.showLoading == false) {
        this.showLoading = false
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            // res = config.interceptors?.responseInterceptors(res)
          }
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }
  get<T>(config: JNRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config: JNRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T>(config: JNRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T>(config: JNRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}
//导出可以创建axios的类
export default JNRequest
