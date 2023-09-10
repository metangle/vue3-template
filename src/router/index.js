import { createRouter, createWebHistory } from 'vue-router'
import { createDiscreteApi } from 'naive-ui'
import i18n from '@/locales'
import { useLocalStore } from '@/store'

const { t } = i18n.global

const { loadingBar } = createDiscreteApi(['loadingBar'])

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

let localStore
router.beforeEach(function (to, from, next) {
  loadingBar.start()
  if (!localStore) {
    localStore = useLocalStore()
  }
  const { setRouteName, setPageTitle } = localStore
  setPageTitle(t(`title.${to.name}`))
  setRouteName(to.name)

  next()
})

router.afterEach(function (to, from) {
  loadingBar.finish()
  if (!from || to.path !== from.path) {
    if (to.hash && to.hash !== from.hash) {
      nextTick(() => {
        const el = document.querySelector(to.hash)
        if (el) el.scrollIntoView()
      })
    }

    nextTick(() => {
      // if (to.name !== 'home') {
      //   debugger
      // } else {
      //   // defined in index.html
      //   // window.deriveTitleFromLocale(useLocaleName().value)
      // }
    })
  }
})

export default router
