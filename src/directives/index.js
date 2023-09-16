import focus from './focus'

const directives = {
  focus
}
export default {
  install(app) {
    for (let key of Object.keys(directives)) {
      app.directive(key, directives[key])
    }
  }
}
