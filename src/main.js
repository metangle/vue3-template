import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import i18n from './locales'
import directives from './directives'

const pinia = createPinia()
const app = createApp(App)

app.use(i18n)
pinia.use(piniaPluginPersistedState)
app.use(pinia)
app.use(router)

for (let key of Object.keys(directives)) {
  app.directive(key, directives[key])
}

app.mount('#app')
