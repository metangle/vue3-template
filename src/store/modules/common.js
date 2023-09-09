import { defineStore } from 'pinia'
import { Names } from '../namespace'

const useCommonStore = defineStore(Names.common, {
  state: () => {
    return {
      lang: 'en',
      year: 2023,
      month: 5,
      day: 12
    }
  },
  actions: {
    setLocal(value) {
      this.lang = value
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
      paths: ['lang'],
      key: () => ['local'],
      storage: localStorage
    },
    {
      paths: ['year'],
      key: () => ['demo-year'],
      storage: localStorage
    }
  ]
})
export default useCommonStore
