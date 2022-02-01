import { createApp } from 'vue'
import App from './App.vue'
// import { registerApp } from './global'

import '@/service/axio_demo'

import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)

// registerApp(app)

app.mount('#app')
