/**
 * body wrapper scroll to distance
 * @param {*} distance
 */
export const scrollPage = (distance) => {
  const wrapper = document.querySelector('.n-scrollbar-container')
  wrapper && (wrapper.scrollTop = distance)
}

/**
 * watch document scroll
 * @param {*} handler
 * @param {*} once
 * @param {*} baseVal // TODO: 参数名称？
 */
export const watchDocumentScroll = (handler, once, baseVal = 20) => {
  function scrollDirect(fn) {
    const dom = document.querySelector('.n-scrollbar-container')
    let beforeScrollTop = dom.scrollTop

    let delta = 0
    dom.addEventListener(
      'scroll',
      function () {
        let afterScrollTop = dom.scrollTop
        delta = afterScrollTop - beforeScrollTop
        beforeScrollTop = afterScrollTop
        fn && fn(delta > 0 ? 'down' : 'up')
      },
      false
    )
  }

  let upFlag = true
  let downFlag = true
  scrollDirect((direction) => {
    if (!once) return handler(direction)

    if (direction == 'up') {
      if (once && upFlag) {
        upFlag = false
        downFlag = true
        handler(direction)
      }
    } else {
      if (once && downFlag) {
        upFlag = true
        downFlag = false
        handler(direction)
      }
    }
  })
}
