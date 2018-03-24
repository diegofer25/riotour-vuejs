import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Search from '@/components/search/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
