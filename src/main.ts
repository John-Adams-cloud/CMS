import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import { registerApp } from './global'
import 'element-plus/dist/index.css'

import jnRequest from './service'

const app = createApp(App)

app.use(router)
app.use(store)
registerApp(app)

jnRequest.request({
  url: '/get',
  method: 'GET',
  interceptors: {
    requestInterceptors: (config) => {
      console.log('单次请求的拦截')
      return config
    },
    responseInterceptors: (res) => {
      console.log('单次响应成功的拦截')
      return res
    }
  }
})
app.mount('#app')
