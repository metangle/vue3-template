import lottie from './lottie/index.vue'

const components = {
  lottie
}
export default {
  install(app) {
    for (let key of Object.keys(components)) {
      app.component(`u-${key}`, components[key])
    }
  }
}
