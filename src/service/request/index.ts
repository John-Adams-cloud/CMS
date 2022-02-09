import axios from 'axios'
import { AxiosInstance } from 'axios'
import { JNRequestConfig, JNRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'

//常量表示loading默认显示
const DEFAULT_LOADING = true
//定义创建axios实例的类
class JNRequest {
  //保存创建出的实例
  instance: AxiosInstance
  //保存返回加载组件对象
  loading?: any
  //保存控制loading显示与否的变量
  showLoading?: boolean
  //保存创建实例时候自定义传入的拦截器
  interceptors?: JNRequestInterceptors

  constructor(config: JNRequestConfig) {
    //创建实例
    this.instance = axios.create(config)
    //此变量可手动控制loading的显示
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    //保存创建实例时候自定义传入的拦截器
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
    //注册所有实例（全局)都会有的请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading === true) {
          this.loading = ElLoading.service({
            lock: true,
            text: '客官请稍等~',
            background: 'rgba(0,0,0,0.1)'
          })
        }

        return config
      },
      (err) => {
        return err
      }
    )
    //注册所有实例（全局)都会有的响应拦截器
    this.instance.interceptors.response.use(
      (config) => {
        this.loading?.close()
        return config.data
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
  }

  //request方法，返回的promise对象给调用者，返回promise的类型由外界决定
  request<T>(config: JNRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单词请求调用的拦截器：内部自动执行传入的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors?.requestInterceptors(config)
      }
      // 全局注册了请求拦截器的loading默认显示，如果单次请求传入了showLoading = false
      // 将会改变实例的showloading，全局监听的拦截器便不会执行
      if (config.showLoading == false) {
        this.showLoading = false
      }
      //真正实现请求的代码，如果请求成功，内部调用resolve，请求失败，内部调用reject
      // 外面可以拿到结果
      this.instance
        //request返回的是一个promise对象，这个对象的类型决定res的类型
        // 因为我们前面在全局设置了拦截器，结果由res转换成res.data，类型由Axiosresponce
        // 变成t类型，因此要request要传入类型
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors?.responseInterceptors(res)
          }
          // 还原showloading的默认值
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          // 还原showloading的默认值
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }
  // get方法
  get<T>(config: JNRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  // post方法
  post<T>(config: JNRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
  // delete方法
  delete<T>(config: JNRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
  // patch方法
  patch<T>(config: JNRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}
//导出可以创建axios的类
export default JNRequest
