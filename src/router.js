import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: { showNavbar: false },
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      meta: { showNavbar: false },
      component: () => import('./views/Login.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      meta: { showNavbar: false },
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/trip',
      name: 'Trip',
      component: () => import('./views/Trip.vue')
    }
  ]
})
