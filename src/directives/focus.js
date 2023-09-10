export default {
  mounted(el) {
    const target = el.tagName === 'INPUT' ? el : el.querySelector('input')
    target.focus()
  }
}
