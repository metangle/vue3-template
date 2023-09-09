import { defineStore } from 'pinia'
import { Names } from '../namespace'

const useUserStore = defineStore(Names.user, {
  state: () => ({
    userInfo: {
      name: 'John Doe',
      age: 25
    },
    isLogged: true
  }),
  getters: {},
  actions: {
    setUserInfo(data) {
      this.userInfo = Object.assign(this.userInfo, data)
    },
    setLoginStatus(isLogged) {
      this.isLogged = isLogged
    }
  }
})
export default useUserStore
