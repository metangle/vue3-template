import { defineStore } from 'pinia'
import { Names } from '../namespace'

const useUserStore = defineStore(Names.user, {
  state: () => ({
    userInfo: {
      name: 'Allen Jrue',
      age: 28
    }
  }),
  getters: {},
  actions: {
    setUserInfo(data) {
      this.userInfo = Object.assign(this.userInfo, data)
    }
  }
})
export default useUserStore
