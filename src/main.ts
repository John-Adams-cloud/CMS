import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import { registerApp } from './global'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(store)

registerApp(app)

app.mount('#app')
