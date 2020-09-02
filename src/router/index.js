import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit.vue'
import MyFollow from '../views/MyFollow.vue'
import UserMoment from '../views/UserMoment.vue'
import UserStar from '../views/UserStar.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/useredit', component: UserEdit, name: 'user_update' },
  { path: '/myfollow', component: MyFollow, name: 'myfollow' },
  { path: '/usermoment', component: UserMoment, name: 'usermoment' },
  { path: '/userstar', component: UserStar, name: 'userstar' }
]

const router = new VueRouter({
  routes
})
const authUrls = ['/user', '/useredit', '/usermoment', '/myfollow', '/userstar']
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login')
  }
})
export default router
