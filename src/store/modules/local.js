import { defineStore } from 'pinia'
import { Names } from '../namespace'
import { zhCN, enUS, dateZhCN, dateEnUS } from 'naive-ui'
import i18n from '@/locales'

const { locale, t } = i18n.global

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
            lang: 'en',
            label: t('local.zh'),
            locale: enUS,
            dateLocal: dateEnUS
          }
        : {
            lang: 'zh',
            label: t('local.en'),
            locale: zhCN,
            dateLocal: dateZhCN
          }
    }
  },
  actions: {
    setLocal(value) {
      this.local = value
    },
    setRouteName(value) {
      this.currentRouteName = value
    },
    setPageTitle(value) {
      document.title = value
    },
    changeLanguage() {
      try {
        console.log('test-t-title.Home===', t('title.home'))
        locale.value = locale.value === 'en' ? 'zh' : 'en'

        this.setPageTitle(t(`title.${this.currentRouteName}`))
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
