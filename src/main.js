// import 'reset-css'
import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './locales'
import directives from './directives'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

for (let key of Object.keys(directives)) {
  app.directive(key, directives[key])
}

app.mount('#app')
