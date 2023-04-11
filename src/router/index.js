import { createRouter, createWebHistory } from 'vue-router'

import Layout from "@/layout/index.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: "/index",
      children: [
        {
          path: "/index",
          component: () => import("@/views/index/index.vue")
        },
        {
          path: "/car",
          component: () => import("@/views/shopcar/index.vue")
        },
        {
          path: "/order",
          component: () => import("@/views/order/index.vue")
        },
        {
          path: "/detail",
          component: () => import("@/views/order/detail.vue")
        },
        {
          path: "/login",
          component: () => import("@/views/login/index.vue")
        }
      ]
    }

  ]
})
const whiteList = ['/login', "/index"]
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    const token = localStorage.getItem("token")
    !token ? next() : next('/index')
  } else {
    const token = localStorage.getItem("token")
    if (token) {
      next()
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next({
          path: '/login',
          query: to.query || {}
        })
      }
    }
  }

})

router.afterEach((to, from) => {
  // console.log(to, from);
})

export default router
