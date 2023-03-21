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
      component: () => import("@/views/shop/shop.vue"),
    },
    {
      path: "/shop-budget-p1",
      component: () => import("@/views/shop/shop-budget-p1/shop-budget-p1.vue"),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: "/shop-budget-p2",
      component: () => import("@/views/shop/shop-budget-p2/shop-budget-p2.vue"),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: "/shop-budget-p3",
      component: () => import("@/views/shop/shop-budget-p3/shop-budget-p3.vue"),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: "/shop-budget-p4",
      component: () => import("@/views/shop/shop-budget-p4/shop-budget-p4.vue"),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: "/shop-custom-p1",
      component: () => import("@/views/shop/shop-custom-p1/shop-custom-p1.vue"),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: "/shop-custom-p2",
      component: () => import("@/views/shop/shop-custom-p2/shop-custom-p2.vue"),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: "/shop-custom-p3",
      component: () => import("@/views/shop/shop-custom-p3/shop-custom-p3.vue"),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: "/order",
      component: () => import("@/views/order/order.vue")
    },
    {
      path: "/order-pay",
      component: () => import("@/views/order/order-pay/order-pay.vue"),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: "/order-add-detail",
      component: () => import("@/views/order/order-pay/order-add-detail/order-add-detail.vue"),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: "/order-edit-detail",
      component: () => import("@/views/order/order-pay/order-edit-detail/order-edit-detail.vue"),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: "/order-edit-address",
      component: () => import("@/views/order/order-pay/order-edit-address/order-edit-address.vue"),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: "/profile",
      component: () => import("@/views/profile/profile.vue")
    },
    {
      path: "/login",
      component: () => import("@/views/login/login.vue"),
      meta: {
        hideTabBar: true
      }
    }
  ]
})

export default router
