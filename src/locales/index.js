import { createI18n } from 'vue-i18n'
import zh from './zh.json' // Chinese
import en from './en.json' // English

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  // globalInjection: true,
  messages: {
    zh,
    en
  }
})

export default i18n
