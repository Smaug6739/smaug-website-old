import { createRouter, createWebHistory } from 'vue-router'
//import store from '@/store/index.js'

import Home from '../views/Home.vue';

import publicRoutes from './public'
import privateRoutes from './private'

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
]
  .concat(publicRoutes)
  .concat(privateRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  const authenticated = getCookie('user_auth')
  const isPublic = to.matched.some(record => record.meta.public)
  if (!isPublic && !authenticated) {
    return next({
      path: '/smaug/login',
      query: { redirect: to.fullPath }
    })
  }
  if (authenticated && !isPublic) {
    return next()
  }
  next()
})

export default router
