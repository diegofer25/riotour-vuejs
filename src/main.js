// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'
import VueSession from 'vue-session'
import VueFire from 'vuefire'
import './firebase'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueFire)
Vue.use(VueResource)
Vue.use(VueSession)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
