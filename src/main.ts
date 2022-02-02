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
  url: 'https://httpbin.org/get',
  method: 'GET'
})
app.mount('#app')
