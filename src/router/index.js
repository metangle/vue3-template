import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createDiscreteApi } from 'naive-ui'
import i18n from '@/locales'
import { useLocalStore } from '@/store'
// import { scrollPage } from '@/util'

const { t } = i18n.global

const { loadingBar } = createDiscreteApi(['loadingBar'])

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/index.vue'),
      meta: {},
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/Home.vue'),
          meta: {
            keepAlive: false,
            transition: ''
          },
          children: [
            {
              path: 'todo',
              name: 'todo',
              component: () => import('../views/Todo.vue'),
              meta: {
                keepAlive: true,
                transition: 'router_animate'
              }
            }
          ]
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/About.vue'),
          meta: {
            keepAlive: true,
            transition: ''
          }
        },
        {
          path: 'socket',
          name: 'socket',
          component: () => import('../views/Socket.vue'),
          meta: {
            keepAlive: true,
            transition: ''
          }
        }
      ]
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
        // if (el) el.scrollIntoView()
      })
    } else if (!to?.meta?.keepAlive) {
      nextTick(() => {
        // scrollPage(0)
      })
    }

    nextTick(() => {
      // if (to.name !== 'home') {
      // } else {
      //   // defined in index.html
      //   // window.deriveTitleFromLocale(useLocaleName().value)
      // }
    })
  } else if (!to?.meta?.keepAlive) {
    nextTick(() => {
      // scrollPage(0) // FIXME: 首页刷新后滚动条在最底部
    })
  }
})

export default router
