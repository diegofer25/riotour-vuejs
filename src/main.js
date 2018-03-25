import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueSession from 'vue-session'
import VueFire from 'vuefire'
import './firebase'
import '../node_modules/materialize-css/dist/css/materialize.min.css'
import '../node_modules/materialize-css/dist/js/materialize.min.js'

Vue.use(VueFire)
Vue.use(VueResource)
Vue.use(VueSession)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
