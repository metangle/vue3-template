import { defineStore } from 'pinia'
import { Names } from '../namespace'
import { darkTheme, lightTheme } from 'naive-ui'
import i18n from '@/locales'

const { t } = i18n.global

export default defineStore(Names.theme, {
  state: () => {
    return {
      theme: 'light'
    }
  },
  getters: {
    currentTheme() {
      return this.theme === 'dark'
        ? {
            label: t('theme.dark'),
            data: darkTheme
          }
        : {
            label: t('theme.light'),
            data: lightTheme
          }
    }
  },
  actions: {
    setTheme(value) {
      this.theme = value
    },
    changeTheme() {
      try {
        this.setTheme(this.theme === 'dark' ? 'light' : 'dark')
      } catch (e) {
        console.error('[changeTheme error]: ', e)
      }
    }
  },
  persist: {
    storage: localStorage,
    paths: ['theme']
  }
})
