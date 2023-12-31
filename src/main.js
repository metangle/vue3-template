import 'animate.css'
import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import Axios from './request/axios'

// import SocketService from '@/util/socket.js'

import App from './App.vue'
import router from './router'
import i18n from './locales'
import directives from './directives'
import components from './components'

// SocketService.Instance.connect()

const pinia = createPinia()
const app = createApp(App)

app.use(i18n)
app.use(Axios)
app.use(directives)
app.use(components)
pinia.use(piniaPluginPersistedState)
app.use(pinia)
app.use(router)

for (let key of Object.keys(directives)) {
  app.directive(key, directives[key])
}

app.mount('#app')
