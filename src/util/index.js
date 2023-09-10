/**
 * body wrapper scroll to distance
 * @param {*} distance
 */
export const scrollPage = (distance) => {
  const wrapper = document.querySelector('.n-scrollbar-container')
  wrapper && (wrapper.scrollTop = distance)
}
