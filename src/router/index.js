import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Register from '@/components/Register'
import Search from '@/components/search/Search'
import RouterError from '@/components/RouterError'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/*',
      name: 'RouterError',
      component: RouterError
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (sessionStorage.getItem('auth')) {
      next()
    } else {
      next('/')
    }
  } else if (sessionStorage.getItem('auth')) {
    next('/search')
  } else {
    next()
  }
})

export default router
