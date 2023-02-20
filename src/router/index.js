import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/shop"
    },
    {
      path: "/shop",
      component: () => import("@/views/shop/shop.vue")
    },
    {
      path: "/order",
      component: () => import("@/views/order/order.vue")
    },
    {
      path: "/profile",
      component: () => import("@/views/profile/profile.vue")
    },
    {
      path: "/login",
      component: () => import("@/views/login/login.vue")
    },
    {
      path: "/login",
      component: () => import("@/views/login/login.vue")
    }
  ]
})

export default router
