import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import VueProgressBar from 'vue-progressbar'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/books',
    name: 'books',
    component: () => import('../views/Books.vue')
  },
  {
    path: '/category/:slug',
    name: 'category',
    component: () => import('../views/Category.vue')
  },
  {
    path: '/book/:slug',
    name: 'book',
    component: () => import('../views/Book.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/Checkout.vue'),
    meta: {
      auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  router.app.$Progress.start()
  if (to.matched.some(record => record.meta.auth)) {
    if (store.getters['Auth/guest']) {
      store.dispatch('Alert/set', {
        status: true,
        text: 'Login first',
        color: 'error',
      })
      store.dispatch('setPrevUrl',to.path)
      store.dispatch('Dialog/setComponent', 'login')
    } else {
      next(true)
    }
  } else {
    next(true)
  }
})

router.afterEach((to, from) => {
  router.app.$Progress.finish()
})
export default router