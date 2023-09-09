import { defineStore } from 'pinia'
import { Names } from '../namespace'

const useCommonStore = defineStore(Names.common, {
  state: () => {
    return {
      year: 2023,
      month: 5,
      day: 12
    }
  },
  actions: {
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
      paths: ['year'],
      key: () => ['demo-year'],
      storage: localStorage
    }
  ]
})
export default useCommonStore
