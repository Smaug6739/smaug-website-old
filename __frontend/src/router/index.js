import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index.js'

import Home from '../views/Home.vue';

import publicRoutes from './public'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      public: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404 not found',
    component: () => import('../views/NotFound.vue'),
    meta: {
      public: true
    }
  },
].concat(publicRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  const authenticated = store.state.user.authenticated
  const isPublic = to.matched.some(record => record.meta.public)
  if (!isPublic && !authenticated) {
    return next({
      path: '/smaug/login',
      query: { redirect: to.fullPath }
    })
  }
  if (authenticated && !isPublic) {
    return next('/')
  }
  next()
})

export default router
