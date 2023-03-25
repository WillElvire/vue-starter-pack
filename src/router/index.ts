import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'

import Dashboard from '@/views/Dashboard/Dashboard.vue'
import Assign from '@/views/Document/Assign.vue'
import Prepare from '@/views/Document/Prepare.vue'
import Sign from '@/views/Document/Sign.vue'
import Show from '@/views/Document/Show.vue'

export const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: { name: 'dashboard' } },
  {
    path: '/login',
    component: () => import('@/views/Auth/Login.vue'),
    name: 'login',
    meta: {
      layout: 'AuthLayout',
    },
  },
  {
    path: '/register',
    component: () => import('@/views/Auth/Register.vue'),
    name: 'register',
    meta: {
      layout: 'AuthLayout',
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  const userStore = useUserStore()
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)
  if (requiresAuth && !userStore.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
