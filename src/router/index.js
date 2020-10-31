import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
const Login = () =>
  import(/* webpackChunkName: "user" */ '../views/user/Login.vue')
const Register = () =>
  import(/* webpackChunkName: "user" */ '../views/user/Register.vue')
const User = () =>
  import(/* webpackChunkName: "user" */ '../views/user/User.vue')
const UserEdit = () =>
  import(/* webpackChunkName: "user" */ '../views/user/UserEdit.vue')
const MyFollow = () =>
  import(/* webpackChunkName: "user" */ '../views/user/MyFollow.vue')
const UserMoment = () =>
  import(/* webpackChunkName: "user" */ '../views/user/UserMoment.vue')
const UserStar = () =>
  import(/* webpackChunkName: "user" */ '../views/user/UserStar.vue')
const Index = () =>
  import(/* webpackChunkName: "news" */ '../views/news/index.vue')
const Manage = () =>
  import(/* webpackChunkName: "news" */ '../views/news/manage.vue')
const PostDetail = () =>
  import(/* webpackChunkName: "news" */ '../views/news/postDetail.vue')
const Search = () =>
  import(/* webpackChunkName: "news" */ '../views/news/Search.vue')
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/useredit', component: UserEdit, name: 'user_update' },
  { path: '/myfollow', component: MyFollow, name: 'myfollow' },
  { path: '/usermoment', component: UserMoment, name: 'usermoment' },
  { path: '/userstar', component: UserStar, name: 'userstar' },
  { path: '/', component: Index, name: 'index' },
  { path: '/manage', component: Manage, name: 'manage' },
  { path: '/postdetail/:id', component: PostDetail, name: 'postdetail' },
  { path: '/search', component: Search, name: 'search' }
]

const router = new VueRouter({
  routes
})
const authUrls = ['/user', '/useredit', '/usermoment', '/myfollow', '/userstar']
router.beforeEach(function(to, from, next) {
  if (to.name === 'index') {
    store.commit('addcache', 'index')
  }
  if (to.name === 'manage') {
    store.commit('delcache', 'index')
  }
  const token = localStorage.getItem('token')
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login')
  }
})
export default router
