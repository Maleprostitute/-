import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
import './styles/iconfont.css'
import './styles/base.css'
import 'amfe-flexible'
import './utils/filters'
import './utils//global'
import './utils//request'
import './utils/vant'

Vue.use(VueLazyload, {
  preLoad: 1,
  error: require('./assets/avatar.jpg'),
  loading: require('./assets/avatar.jpg')
})
Vue.config.productionTip = false
const bus = new Vue()
Vue.prototype.$bus = bus

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
