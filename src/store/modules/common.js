import { defineStore } from 'pinia'
import { Names } from '../namespace'

const useCommonStore = defineStore(Names.common, {
  state: () => {
    return {
      lang: 'en',
      theme: 'light',

      year: 2023,
      month: 5,
      day: 12
    }
  },
  actions: {
    setLocal(value) {
      this.lang = value
    },
    setTheme(value) {
      this.theme = value
    },
    setYear(value) {
      this.year = value
    },
    setMonth(value) {
      this.month = value
    },
    setDay(value) {
      this.day = value
    }
  },
  persist: [
    {
      paths: ['lang', 'theme'],
      key: () => ['local'],
      storage: localStorage
    },
    {
      paths: ['year', 'month', 'day'],
      key: () => ['testDate'],
      storage: localStorage
    }
  ]
})
export default useCommonStore
