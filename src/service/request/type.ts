import type { AxiosRequestConfig, AxiosResponse } from 'axios'

//定义拦截器的接口
export interface JNRequestInterceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorsCatch?: (err: any) => any
}
//自定义接口，继承原有的axios requestconfig，扩展从而可以传入拦截器
export interface JNRequestConfig extends AxiosRequestConfig {
  interceptors?: JNRequestInterceptors
  showLoading?: boolean
}
