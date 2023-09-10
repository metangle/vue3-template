import { defineStore } from 'pinia'
import { Names } from '../namespace'
import { zhCN, enUS, dateZhCN, dateEnUS } from 'naive-ui'
import i18n from '@/locales'

const { locale, t } = i18n.global

console.log('locale', locale.value)

export default defineStore(Names.local, {
  state: () => {
    return {
      local: 'zh'
    }
  },
  getters: {
    currentLang() {
      return this.local === 'en'
        ? {
            locale: enUS,
            dateLocal: dateEnUS,
            lang: 'en',
            label: t('local.zh')
          }
        : {
            locale: zhCN,
            dateLocal: dateZhCN,
            lang: 'zh',
            label: t('local.en')
          }
    }
  },
  actions: {
    setLocal(value) {
      this.local = value
    },
    changeLanguage() {
      try {
        console.log('test-t-nav.Home===', t('nav.Home'))
        locale.value = locale.value === 'en' ? 'zh' : 'en'
        this.setLocal(locale.value)
      } catch (e) {
        console.error('[changeLanguage error]: ', e)
      }
    }
  },
  persist: {
    storage: localStorage,
    paths: ['local'],
    afterRestore: (ctx) => {
      try {
        locale.value = ctx.store.local
      } catch (e) {
        console.error('[language beforeRestore error]: ', e)
      }
    }
  }
})
