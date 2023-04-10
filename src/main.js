import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElemetPlus from "element-plus"
import "element-plus/dist/index.css"

import './assets/main.scss'

const app = createApp(App)
app.use(ElemetPlus)
app.use(router)
app.mount('#app')
