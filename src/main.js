import Vue from 'vue'
import Router from 'vue-router'
import Iota from '@cmiot/iota-ui'
import '@cmiot/iota-ui/lib/style/index.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(Router)
Vue.use(Iota)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
